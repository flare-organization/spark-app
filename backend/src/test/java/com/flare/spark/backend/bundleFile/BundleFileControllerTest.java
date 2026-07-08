package com.flare.spark.backend.bundleFile;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.flare.spark.backend.bundleFiles.BundleFileController;
import com.flare.spark.backend.bundleFiles.BundleFileService;
import com.flare.spark.generated.api.model.UploadResultDto;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

@WebMvcTest(BundleFileController.class)
class BundleFileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BundleFileService bundleFileService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testUploadReturnsUploadResultDto() throws Exception {
        UUID bundleId = UUID.fromString("66666666-6666-6666-6666-666666666666");
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "document.pdf",
                "application/pdf",
                "file content".getBytes()
        );

        UploadResultDto uploadResultDto = new UploadResultDto(bundleId);

        Mockito.when(bundleFileService.store(
                Mockito.eq(bundleId),
                Mockito.any(MultipartFile.class)
        )).thenReturn(uploadResultDto);

        mockMvc.perform(
                        multipart("/api/v1/bundles/{bundleId}/upload", bundleId).file(file)
                )
                .andExpect(status().isOk())

                .andExpect(content().json(objectMapper.writeValueAsString(uploadResultDto)));

        Mockito.verify(bundleFileService, Mockito.times(1))
                .store(Mockito.eq(bundleId), Mockito.any(MultipartFile.class));
    }
}
