package com.flare.spark.backend.bundles;

import com.flare.spark.backend.shared.text.Sluggifier;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import net.datafaker.Faker;
import org.springframework.stereotype.Component;

@Profile("dev")
@Component
class BundleSeeder implements CommandLineRunner {
    private final BundleRepository bundleRepository;

    @Value("${spark-variables.seed-database}")
    private boolean seedData;

    BundleSeeder(BundleRepository bundleRepository) {
        this.bundleRepository = bundleRepository;
    }

    @Override
    public void run(String... args) {
        if (!seedData || bundleRepository.count() > 20) {
            return;
        }

        List<Bundle> bundleList = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            bundleList.add(BundleBuilder.build());
        }

        bundleRepository.saveAll(bundleList);
    }

    class BundleBuilder {
        public static Bundle build() {
            Bundle bundle = new Bundle();
            Faker faker = new Faker();

            String bundleName = faker.name().name();

            bundle.setName(bundleName);
            bundle.setSlug(Sluggifier.toSlug(bundleName));
            bundle.setDescription(
                faker.options().option(
                    faker.chuckNorris().fact(),
                    faker.lorem().paragraph(),
                    faker.hitchhikersGuideToTheGalaxy().quote(),
                    faker.yoda().quote(),
                    faker.shakespeare().hamletQuote(),
                    faker.movie().quote(),
                    faker.friends().quote(),
                    faker.gameOfThrones().quote()
                )
            );

            bundle.setStatus(faker.options().option(
                BundleStatus.PRIVATE,
                BundleStatus.PUBLIC,
                BundleStatus.PUBLIC
            ));

            return bundle;
        }
    }
}