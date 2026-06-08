package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.CreateBundleDto;
import java.util.stream.Collectors;
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
    private final BundleMapper mapper;

    public BundleController(BundleService bundleService, BundleMapper mapper) {
        this.bundleService = bundleService;
        this.mapper = mapper;
    }

    @GetMapping
    public List<BundleDto> getAllBundles() {
        List<Bundle> bundles = bundleService.getAllBundles();

        return bundles.stream()
            .map(mapper::bundleToDto)
            .collect(Collectors.toList());
    }

    @PostMapping
    public BundleDto createBundle(
        @RequestBody CreateBundleDto createBundleDto
    ) {
        Bundle createBundle = mapper.createBundleDtoToBundle(createBundleDto);
        Bundle bundle = bundleService.createBundle(createBundle);

        return mapper.bundleToDto(bundle);
    }
}