package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bundles")
public class BundleController {

    private final BundleService bundleService;

    public BundleController(BundleService bundleService) {
        this.bundleService = bundleService;
    }

    @GetMapping
    public List<BundleDto> getAllBundles() {
        return bundleService.getAllBundles();
    }

    @PostMapping("/create")
    public BundleDto createBundle(
        @RequestBody Bundle bundle
    ) {
        return bundleService.createBundle(bundle);
    }
}