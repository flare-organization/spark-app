package com.flare.spark.backend.bundles;

import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BundleRepository extends JpaRepository<Bundle, UUID>, JpaSpecificationExecutor<Bundle> {

    Slice<Bundle> findAllBy(Specification<Bundle> and, Pageable pageRequest);
    boolean existsByName(String name);
}