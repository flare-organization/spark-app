package com.flare.spark.backend.bundles;

import com.flare.spark.backend.tags.Tag;
import com.flare.spark.backend.tags.TagRepository;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import net.datafaker.Faker;
import org.springframework.stereotype.Component;

@Profile({"dev", "demo"})
@Component
class BundleSeeder implements CommandLineRunner {
    private final BundleRepository bundleRepository;
    private final BundleVersionRepository versionRepository;
    private final TagRepository tagRepository;

    @Value("${spark-variables.seed-database}")
    private boolean seedData;

    BundleSeeder(
        BundleRepository bundleRepository,
        BundleVersionRepository versionRepository,
        TagRepository tagRepository
    ) {
        this.bundleRepository = bundleRepository;
        this.versionRepository = versionRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public void run(String... args) {
        if (!seedData || bundleRepository.count() > 20) {
            return;
        }

        Faker faker = new Faker();
        List<Tag> tags = tagRepository.saveAll(BundleBuilder.buildTags(faker));

        List<Bundle> bundleList = new ArrayList<>();
        Set<String> usedNames = new HashSet<>();

        int attempts = 0;
        while (bundleList.size() < 100 && attempts < 1000) {
            attempts++;
            Bundle bundle = BundleBuilder.build(faker, tags);
            if (usedNames.add(bundle.getName())
                && !bundleRepository.existsByName(bundle.getName())) {
                bundleList.add(bundle);
            }
        }

        bundleRepository.saveAll(bundleList);

        List<BundleVersion> versions = new ArrayList<>();
        for (Bundle bundle : bundleList) {
            versions.addAll(BundleBuilder.buildVersions(faker, bundle));
        }
        versionRepository.saveAll(versions);
    }

    static class BundleBuilder {
        static List<Tag> buildTags(Faker faker) {
            Set<String> names = new HashSet<>();
            while (names.size() < 15) {
                names.add(faker.programmingLanguage().name().toLowerCase());
            }
            return names.stream().map(Tag::new).toList();
        }

        static Bundle build(Faker faker, List<Tag> tagPool) {
            Bundle bundle = new Bundle();

            String bundleName = String.format(
                "%s-%s",
                faker.company().buzzword().toLowerCase(),
                faker.hacker().noun().toLowerCase()
            ).replaceAll("[^a-z0-9-]", "-");

            bundle.setName(bundleName);
            bundle.setDescription(faker.lorem().paragraph());
            bundle.setStatus(faker.options().option(
                BundleStatus.PRIVATE,
                BundleStatus.PUBLIC
            ));

            int tagCount = ThreadLocalRandom.current().nextInt(1, 4);
            for (int i = 0; i < tagCount; i++) {
                bundle.getTags().add(tagPool.get(
                    ThreadLocalRandom.current().nextInt(tagPool.size())
                ));
            }

            return bundle;
        }

        static List<BundleVersion> buildVersions(Faker faker, Bundle bundle) {
            int count = ThreadLocalRandom.current().nextInt(1, 4);
            List<BundleVersion> versions = new ArrayList<>();
            OffsetDateTime now = OffsetDateTime.now();

            for (int i = 0; i < count; i++) {
                String version = String.format("%d.%d.%d", 1, i, 0);
                BundleVersion bundleVersion = new BundleVersion(
                    bundle,
                    version,
                    readme(faker, bundle.getName(), version),
                    (long) faker.number().numberBetween(2_048, 5_242_880)
                );
  
                bundleVersion.setPublishedAt(now.minusDays(count - i));
                versions.add(bundleVersion);
            }

            return versions;
        }

        private static String readme(Faker faker, String name, String version) {
            return String.format(
                """
                # %s

                %s

                ## Installation

                ```bash
                flare install %s@%s
                ```

                ## Usage

                %s

                ## License

                MIT
                """,
                name,
                faker.lorem().sentence(),
                name,
                version,
                faker.lorem().paragraph()
            );
        }
    }
}
