package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BundleService {

    private final BundleRepository repository;
    private final BundleMapper mapper;

    public BundleService(BundleRepository repository, BundleMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<BundleDto> getAllBundles() {
        return repository.findAll()
            .stream()
            .map(mapper::toDto)
            .collect(Collectors.toList());
    }

    public BundleDto createBundle(Bundle bundle) {
        Bundle createdBundle = repository.save(bundle);

        return mapper.toDto(createdBundle);
    }
}