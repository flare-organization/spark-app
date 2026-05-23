package com.flare.spark.backend.packages;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {

    private final PackageRepository repository;

    public PackageService(PackageRepository repository) {
        this.repository = repository;
    }

    public List<Package> getAllPackages() {
        return repository.findAll();
    }
}
