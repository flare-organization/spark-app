package com.flare.spark.backend.bundleFiles;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BundleFileRepository extends JpaRepository<BundleFile, UUID> {
}
