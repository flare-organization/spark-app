package com.flare.spark.backend.bundles;

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
        return repository.save(bundle);
    }
}