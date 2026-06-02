package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
public class BundleFileController {

    private final BundleFileService bundleFileService;

    public BundleFileController(BundleFileService bundleFileService) {
        this.bundleFileService = bundleFileService;
    }

    @PostMapping
    public UploadResultDto upload(
        @RequestParam("file") MultipartFile file
    ) throws IOException {
        return bundleFileService.store(file);
    }
}
