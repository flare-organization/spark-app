package com.flare.spark.backend.bundles;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BundleService {

    private final BundleRepository repository;
    private final BundleVersionRepository versionRepository;

    public BundleService(
        BundleRepository repository,
        BundleVersionRepository versionRepository
    ) {
        this.repository = repository;
        this.versionRepository = versionRepository;
    }

    public Slice<Bundle> getAllBundles(int page) {
        Pageable pageWithFiveElements = PageRequest.of(page, 6);

        return repository.findAllBy(pageWithFiveElements);
    }

    public Bundle createBundle(@NotNull Bundle bundle) {
        return repository.save(bundle);
    }

    public Bundle getBundleByName(String name) {
        return repository.findByNameAndDeletedAtIsNull(name)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "No bundle exists with name '" + name + "'"
            ));
    }

    public List<BundleVersion> getVersions(Bundle bundle) {
        return versionRepository.findByBundleOrderByPublishedAtDesc(bundle);
    }

    public Slice<Bundle> searchBundlesByName(
            String query,
            int page
    ) {
        Pageable pageWithFiveElements = PageRequest.of(page, 5);
        return repository.findPublicByNameContainingIgnoreCase(query, pageWithFiveElements);
    }
}