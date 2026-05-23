package com.flare.spark.backend.packages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PackageRepository extends JpaRepository<Package, UUID> {
}
