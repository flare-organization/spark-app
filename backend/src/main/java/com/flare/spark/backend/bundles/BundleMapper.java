package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.CreateBundleDto;
import com.flare.spark.generated.api.model.SearchBundleDto;
import com.flare.spark.generated.api.model.UpdateBundleDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BundleMapper {
    BundleDto bundleToDto(Bundle bundle);
    Bundle bundleDtoToBundle(CreateBundleDto bundleDto);
    SearchBundleDto bundleToSearchBundleDto(Bundle bundle);
    Bundle updateBundleDtoToBundle(UpdateBundleDto bundleDto);
}