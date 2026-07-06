package com.flare.spark.backend.bundles;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BundleVersionRepository extends JpaRepository<BundleVersion, UUID> {
    List<BundleVersion> findByBundleOrderByPublishedAtDesc(Bundle bundle);

    Optional<BundleVersion> findByBundleAndVersion(Bundle bundle, String version);
}
