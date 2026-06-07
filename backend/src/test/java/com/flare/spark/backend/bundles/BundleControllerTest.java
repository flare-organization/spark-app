package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.PaginatedBundlesDto;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BundleController.class)
class BundleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BundleService bundleRepository;

    @MockitoBean
    private BundleMapper mapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllBundles() throws Exception {
        PaginatedBundlesDto paginatedBundlesDto =
                PaginatedBundlesDtoBuilder.builder().build();

        Mockito.when(bundleRepository.getAllBundles(1)).thenReturn(paginatedBundles);

        mockMvc.perform(get("/api/v1/bundles")
            .andExpect(status().isOk())
            .andExpect(content().json(objectMapper.writeValueAsString(paginatedBundles)));

//        restTemplate.postForEntity("http://localhost:" + port)

//        mvc.perform(
//            post("/api/v1/bundles", createBundleDto).with(csrf())
//        ).andExpect(status().isOk());
    }
}