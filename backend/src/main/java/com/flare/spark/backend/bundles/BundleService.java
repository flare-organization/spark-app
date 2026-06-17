package com.flare.spark.backend.bundles;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public class BundleService {

    private final BundleRepository repository;

    public BundleService(BundleRepository repository) {
        this.repository = repository;
    }

    public Slice<Bundle> getAllBundles(int page) {
        Pageable pageWithFiveElements = PageRequest.of(page, 5);

        return repository.findAllBy(pageWithFiveElements);
    }

    public Bundle createBundle(@NotNull Bundle bundle) {
        return repository.save(bundle);
    }
}