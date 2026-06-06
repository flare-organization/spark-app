package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BundleFileService {

    private static final Path UPLOAD_DIR = Paths.get("uploads");

    private final BundleFileRepository repository;
    private final BundleFileMapper mapper;

    public BundleFileService(BundleFileRepository repository, BundleFileMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public UploadResultDto store(MultipartFile file, String fileName) throws IOException {
        Files.createDirectories(UPLOAD_DIR);

        Path destination = UPLOAD_DIR.resolve(fileName);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
        }

        BundleFile bundleFile = new BundleFile(fileName, destination.toString(), file.getSize());
        BundleFile saved = repository.save(bundleFile);

        return mapper.toUploadResult(saved);
    }
}
