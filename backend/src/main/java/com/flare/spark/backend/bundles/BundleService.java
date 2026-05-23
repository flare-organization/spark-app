package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BundleService {

    private final BundleRepository repository;
    private final BundleMapper mapper;

    public BundleService(BundleRepository repository, BundleMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<BundleDto> getAllBundles() {
        return Stream.of(
            new Bundle(
                UUID.randomUUID(),
                "bundle name",
                "bundle-slug"
            )
        ).map(mapper::toDto)
        .collect(Collectors.toList());
    }
}