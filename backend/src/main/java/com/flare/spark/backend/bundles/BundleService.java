package com.flare.spark.backend.bundles;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static com.flare.spark.backend.bundles.BundleSpecification.statusPublic;
import static com.flare.spark.backend.bundles.BundleSpecification.nameLike;

@Service
public class BundleService {

    private final BundleRepository repository;

    public BundleService(BundleRepository repository) {
        this.repository = repository;
    }

    public Slice<Bundle> getAllBundles(GetBundleParams params) {
        Pageable pageRequest = PageRequest.of(params.page(), 12);

        return repository.findAllBy(
            Specification.where(statusPublic()).and(nameLike(params.search())),
            pageRequest
        );
    }

    public Bundle createBundle(@NotNull Bundle bundle) {
        return repository.save(bundle);
    }
}