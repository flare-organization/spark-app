package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import org.springframework.stereotype.Component;

@Component
public class BundleFileMapper {

    public UploadResultDto toUploadResult(BundleFile bundleFile) {
//        TODO will have to see what we do with this in the future
        return new UploadResultDto(bundleFile.getId());
    }
}
