package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import org.springframework.stereotype.Component;

@Component
public class BundleMapper {
    public BundleDto toDto(Bundle bundle) {
        return new BundleDto(
                bundle.getId(),
                bundle.getName(),
                bundle.getSlug()
        );
    }
}