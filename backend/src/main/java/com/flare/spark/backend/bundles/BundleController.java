package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.CreateBundleDto;

import com.flare.spark.generated.api.model.PaginatedBundlesDto;
import jakarta.validation.Valid;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public PaginatedBundlesDto getAllBundles(
        @RequestParam(required = false, defaultValue = "0", name = "page") int page
    ) {
        Slice<Bundle> bundles = bundleService.getAllBundles(page);

        return new PaginatedBundlesDto(
            bundles.getContent().stream().map(mapper::bundleToDto).toList(),
            bundles.getPageable().getPageNumber(),
            bundles.getPageable().getPageSize(),
            bundles.isFirst(),
            bundles.isLast(),
            bundles.isEmpty()
        );
    }

    @PostMapping
    public BundleDto createBundle(
        @Valid @RequestBody CreateBundleDto createBundleDto
    ) {
        Bundle bundle = mapper.bundleDtoToBundle(createBundleDto);
        Bundle savedBundle = bundleService.createBundle(bundle);

        return mapper.bundleToDto(savedBundle);
    }
}