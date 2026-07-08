package com.flare.spark.backend.bundleFile;

import com.flare.spark.backend.bundleFiles.BundleFile;
import java.util.UUID;

public class BundleFileBuilder {
    private UUID bundleId = UUID.fromString("11111111-1111-1111-1111-111111111111");
    private String fileName = "test-file.txt";
    private String filePath = "uploads/test-file.txt";
    private double fileSize = 1024;

    public static BundleFileBuilder create() {
        return new BundleFileBuilder();
    }

    public BundleFileBuilder withBundleId(UUID bundleId) {
        this.bundleId = bundleId;
        return this;
    }

    public BundleFileBuilder withFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public BundleFileBuilder withFilePath(String filePath) {
        this.filePath = filePath;
        return this;
    }

    public BundleFileBuilder withFileSize(double fileSize) {
        this.fileSize = fileSize;
        return this;
    }

    public BundleFile buildBundleFile() {
        return new BundleFile(
                this.bundleId,
                this.fileName,
                this.filePath,
                this.fileSize
        );
    }
}
