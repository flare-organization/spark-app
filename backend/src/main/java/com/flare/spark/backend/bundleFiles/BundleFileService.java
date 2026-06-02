package com.flare.spark.backend.bundleFiles;

import com.flare.spark.generated.api.model.UploadResultDto;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;
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

    public UploadResultDto store(MultipartFile file) throws IOException {
        Files.createDirectories(UPLOAD_DIR);

        String originalName = file.getOriginalFilename() == null ? "unnamed" : file.getOriginalFilename();
        String storedName = UUID.randomUUID() + "-" + originalName;
        Path destination = UPLOAD_DIR.resolve(storedName);

//        grab all the bytes out of the uploaded file and dump them onto disk
        byte[] bytes = file.getBytes();
        Files.write(destination, bytes);

        BundleFile bundleFile = new BundleFile(originalName, destination.toString(), bytes.length, checksum(bytes)
        );
        BundleFile saved = repository.save(bundleFile);

        return mapper.toUploadResult(saved);
    }

    private String checksum(byte[] bytes) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(bytes);
            // we turn the hash into a hex format to make it "somewhat" readable as a person
            StringBuilder hex = new StringBuilder();
            for (byte b : hash) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }
}
