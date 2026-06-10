package com.flare.spark.backend.bundles;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BundleRepository extends JpaRepository<Bundle, UUID> {
    Slice<Bundle> findAllBy(Pageable pageable);

    List<Bundle> findByName(String name);
}