package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.CreateBundleDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BundleMapper {
    BundleDto bundleToDto(Bundle bundle);
    Bundle createBundleDtoToBundle(CreateBundleDto bundleDto);
}