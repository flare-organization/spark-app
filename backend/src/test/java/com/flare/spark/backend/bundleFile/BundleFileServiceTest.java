package com.flare.spark.backend.bundleFile;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.flare.spark.backend.bundleFiles.BundleFile;
import com.flare.spark.backend.bundleFiles.BundleFileMapper;
import com.flare.spark.backend.bundleFiles.BundleFileRepository;
import com.flare.spark.backend.bundleFiles.BundleFileService;
import com.flare.spark.generated.api.model.UploadResultDto;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

@ExtendWith(MockitoExtension.class)
class BundleFileServiceTest {
    private final List<Path> createdFiles = new ArrayList<>();

    @Mock
    private BundleFileRepository repository;

    @Mock
    private BundleFileMapper mapper;

    @InjectMocks
    private BundleFileService service;

    @AfterEach
    void cleanUpCreatedFiles() throws IOException {
        for (Path path : createdFiles) {
            Files.deleteIfExists(path);
        }
    }

    @Test
    void testStoreCopiesFileToDiskAndReturnsUploadResult() throws IOException {
        UUID bundleId = UUID.fromString("22222222-2222-2222-2222-222222222222");
        byte[] content = "the file contents".getBytes();
        MockMultipartFile file = new MockMultipartFile("file", "document.pdf", "application/pdf", content);

        BundleFile savedBundleFile = BundleFileBuilder.create().withBundleId(bundleId).buildBundleFile();
        UploadResultDto expected = new UploadResultDto(bundleId);

        List<BundleFile> savedFiles = new ArrayList<>();
        Mockito.when(repository.save(Mockito.any(BundleFile.class))).thenAnswer(invocation -> {
            savedFiles.add(invocation.getArgument(0));
            return savedBundleFile;
        });
        Mockito.when(mapper.toUploadResult(savedBundleFile)).thenReturn(expected);

        UploadResultDto actual = service.store(bundleId, file);

        assertEquals(expected, actual);

        Mockito.verify(repository).save(Mockito.any(BundleFile.class));
        BundleFile stored = savedFiles.getFirst();
        createdFiles.add(Path.of(stored.getFilePath()));

        assertEquals(bundleId, stored.getBundleId());

        assertTrue(stored.getFileName().endsWith("document.pdf"));

        assertEquals(content.length, stored.getFileSize());

        assertTrue(Files.exists(Path.of(stored.getFilePath())));

        assertArrayEquals(content, Files.readAllBytes(Path.of(stored.getFilePath())));
    }

    @Test
    void testSavingGeneratesUniqueFileNameForTheSameOriginalFilename() throws IOException {
        UUID bundleId = UUID.fromString("33333333-3333-3333-3333-333333333333");

        MockMultipartFile firstFile = new MockMultipartFile("file", "report.txt", "text/plain", "first".getBytes());
        MockMultipartFile secondFile = new MockMultipartFile("file", "report.txt", "text/plain", "second".getBytes());

        List<BundleFile> stored = new ArrayList<>();
        Mockito.when(repository.save(Mockito.any(BundleFile.class))).thenAnswer(invocation -> {
            BundleFile arg = invocation.getArgument(0);
            stored.add(arg);
            return arg;
        });

        service.store(bundleId, firstFile);
        service.store(bundleId, secondFile);

        Mockito.verify(repository, Mockito.times(2)).save(Mockito.any(BundleFile.class));

        stored.forEach(bundleFile -> createdFiles.add(Path.of(bundleFile.getFilePath())));

        String firstName = stored.get(0).getFileName();
        String secondName = stored.get(1).getFileName();

        assertTrue(firstName.endsWith("report.txt"));

        assertTrue(secondName.endsWith("report.txt"));

        assertNotEquals(firstName, secondName, "generated file names should be unique");
    }

    @Test
    void testStoreThrowsRuntimeExceptionWhenOriginalFilenameIsBlank() {
        UUID bundleId = UUID.fromString("44444444-4444-4444-4444-444444444444");
        MockMultipartFile file = new MockMultipartFile("file", "", "text/plain", "data".getBytes());

        assertThrows(RuntimeException.class, () -> service.store(bundleId, file));
    }
}
