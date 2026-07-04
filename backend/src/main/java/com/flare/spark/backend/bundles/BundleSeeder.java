package com.flare.spark.backend.bundles;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import net.datafaker.Faker;
import org.springframework.stereotype.Component;

@Profile({"dev", "demo"})
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
        if (!seedData || bundleRepository.count() > 0) {
            return;
        }

        List<Bundle> bundleList = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Bundle bundle = BundleBuilder.build();
            /*
             * The bundle name MUST be unique. Since randomly generated names are not
             * guaranteed to be unique, we check each generated bundle name before using it.
             */
            if (bundleRepository.existsByName(bundle.getName())) {
                return;
            }
            bundleList.add(bundle);
        }

        bundleRepository.saveAll(bundleList);
    }

    static class BundleBuilder {
        public static Bundle build() {
            Bundle bundle = new Bundle();
            Faker faker = new Faker();

            String bundleName = String.format(
                "%s-%s",
                faker.company().buzzword().toLowerCase(),
                faker.hacker().noun().toLowerCase()
            ).replaceAll("[^a-z0-9-]", "-");

            bundle.setName(bundleName);

            bundle.setDescription(
                faker.lorem().paragraph()
            );

            bundle.setVisibility(faker.options().option(
                BundleVisibility.PRIVATE,
                BundleVisibility.PUBLIC
            ));

            return bundle;
        }
    }
}