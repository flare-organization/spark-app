package com.flare.spark.backend.bundles;

import com.flare.spark.backend.shared.text.Sluggifier;
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
        Pageable firstPageWithFiveElements = PageRequest.of(page, 5);

        return repository.findAllBy(firstPageWithFiveElements);
    }

    public Bundle createBundle(Bundle bundle) {
        bundle.setSlug(Sluggifier.toSlug(bundle.getName()));

        return repository.save(bundle);
    }
}