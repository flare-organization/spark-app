package com.flare.spark.backend.bundles;

import com.flare.spark.backend.shared.text.Sluggifier;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BundleService {

    private final BundleRepository repository;

    public BundleService(BundleRepository repository) {
        this.repository = repository;
    }

    public List<Bundle> getAllBundles() {
        return repository.findAll();
    }

    public Bundle createBundle(Bundle bundle) {
        bundle.setSlug(Sluggifier.toSlug(bundle.getName()));

        return repository.save(bundle);
    }
}