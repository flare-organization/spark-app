package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import java.io.IOException;
import java.util.UUID;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/bundles")
public class BundleFileController {

    private final BundleFileService bundleFileService;

    public BundleFileController(BundleFileService bundleFileService) {
        this.bundleFileService = bundleFileService;
    }

    @PostMapping("/{id}/upload")
    public UploadResultDto upload(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
//        unable to bind this yet as we would first need the bundles to then link this id to the bundles
        return bundleFileService.store(id, file);
    }
}
