package com.flare.spark.backend.bundles;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BundleRepository extends JpaRepository<Bundle, UUID> {
    Slice<Bundle> findAllBy(Pageable pageable);

    List<Bundle> findByName(String name);

    Optional<Bundle> findByNameAndDeletedAtIsNull(String name);

    boolean existsByName(String bundleName);

    @Query("""
            SELECT b FROM Bundle b
            WHERE b.visibility = com.flare.spark.backend.bundles.BundleVisibility.PUBLIC
              AND lower(b.name) LIKE lower(concat('%', :name, '%'))
            """)
    Slice<Bundle> findPublicByNameContainingIgnoreCase(
            @Param("name") String name,
            Pageable pageable
    );
}