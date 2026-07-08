package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BundleFileService {

    private static final Path UPLOAD_DIR = Paths.get("uploads");

    private final BundleFileRepository repository;
    private final BundleFileMapper mapper;

    public BundleFileService(
            BundleFileRepository repository,
            BundleFileMapper mapper
    ) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public UploadResultDto store(
            UUID bundleId,
            MultipartFile file
    ) throws IOException {
        Files.createDirectories(UPLOAD_DIR);

        String fileName = extractFilename(file);

        Path destination = UPLOAD_DIR.resolve(fileName);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
        }

        BundleFile bundleFile = new BundleFile(bundleId, fileName, destination.toString(), file.getSize());
        BundleFile saved = repository.save(bundleFile);

        return mapper.toUploadResult(saved);
    }

    private String extractFilename(MultipartFile file) {
        String original = file.getOriginalFilename();
        if (original == null || original.isBlank()) {
            throw new RuntimeException("No filename found, please try again");
        }
        String safeName = Paths.get(original).getFileName().toString();
        return UUID.randomUUID() + "-" + safeName;
    }
}
