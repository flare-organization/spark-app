package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BundleFileMapper {

    UploadResultDto toUploadResult(BundleFile bundleFile);
}
