package com.flare.spark.backend.bundleFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.flare.spark.backend.IntegrationTest;
import com.flare.spark.backend.bundleFiles.BundleFile;
import com.flare.spark.backend.bundleFiles.BundleFileRepository;
import com.flare.spark.backend.bundles.Bundle;
import com.flare.spark.backend.bundles.BundleRepository;
import com.flare.spark.backend.bundles.BundleStatus;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

class BundleFileUploadIntegrationTest extends IntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BundleRepository bundleRepository;

    @Autowired
    private BundleFileRepository bundleFileRepository;

    @AfterEach
    void cleanUp() {
        bundleFileRepository.findAll().forEach(bundleFile -> {
            try {
                Files.deleteIfExists(Path.of(bundleFile.getFilePath()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    @Test
    void testBundleFileLinksToExistingBundle() throws Exception {
        Bundle bundle = bundleRepository.save(new Bundle(
                "file upload bundle",
                "file-upload-bundle",
                "a bundle file desc",
                BundleStatus.PRIVATE
        ));
        UUID bundleId = bundle.getId();

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "filename=\"upload.txt\"",
                "text/plain",
                "uploaded file".getBytes()
        );

        mockMvc.perform(
                        multipart("/api/v1/bundles/{bundleId}/upload", bundleId)
                                .file(file)
                                .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("bundleId").value(bundleId.toString()));

        List<BundleFile> stored = bundleFileRepository.findAll().stream().toList();

        assertEquals(1, stored.size());

        BundleFile persisted = stored.getFirst();

        assertEquals(bundleId, persisted.getBundleId());

        assertTrue(persisted.getFileName().endsWith("upload.txt"));

        assertEquals("uploaded file".getBytes().length, persisted.getFileSize());

        assertTrue(Files.exists(Path.of(persisted.getFilePath())));
    }
}
