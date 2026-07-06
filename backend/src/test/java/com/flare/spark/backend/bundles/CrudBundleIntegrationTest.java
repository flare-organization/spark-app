package com.flare.spark.backend.bundles;

import com.flare.spark.backend.IntegrationTest;
import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.CreateBundleDto;
import com.flare.spark.generated.api.model.PaginatedBundlesDto;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CrudBundleIntegrationTest extends IntegrationTest {

    @Autowired
    private BundleRepository bundleRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    public void testGetAllBundlesReturnsCorrectPaginatedBundleDto() throws Exception {
        saveBundlesInTheDatabase(20);

        MvcResult result = mockMvc.perform(
            get("/api/v1/bundles?page=1")
        )
        .andExpect(status().isOk())
        .andReturn();

        String json = result.getResponse().getContentAsString();
        PaginatedBundlesDto paginatedBundlesDto = objectMapper.readValue(json, PaginatedBundlesDto.class);

        assertEquals(6, paginatedBundlesDto.getContent().size());
        assertFalse(paginatedBundlesDto.getIsFirst());
        assertFalse(paginatedBundlesDto.getIsLast());
        assertSame(1, paginatedBundlesDto.getPageNumber());
        assertSame(6, paginatedBundlesDto.getPageSize());
        assertFalse(paginatedBundlesDto.getIsEmpty());
    }
    // delete this comment
    @Test
    @Order(2)
    public void testBundleGetsSavedInTheDatabase() throws Exception {
        List<Bundle> emptyBundles = bundleRepository.findByName("spark bundle");
        assertEquals(List.of(), emptyBundles);

        CreateBundleDto createBundleDto = CreateBundleDtoBuilder.create().withName("spark bundle").build();

        MvcResult result = mockMvc.perform(
            post("/api/v1/bundles")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createBundleDto))
                .with(csrf())
        )
        .andExpect(status().isOk())
        .andReturn();

        String json = result.getResponse().getContentAsString();
        BundleDto bundleDto = objectMapper.readValue(json, BundleDto.class);

        assertEquals(createBundleDto.getName(), bundleDto.getName());
        assertEquals(createBundleDto.getDescription(), bundleDto.getDescription());
        assertEquals("spark-bundle", bundleDto.getSlug());

        assertTrue(
            bundleRepository.findById(bundleDto.getId()).isPresent()
        );
    }

    @Order(3)
    private void saveBundlesInTheDatabase(int amount) {
        List<Bundle> bundleList = new ArrayList<>();

        for (int i = 0; i < amount; i++) {
            bundleList.add(
                BundleBuilder.create()
                    .withName("bundle " + i)
                    .build()
            );
        }

        bundleRepository.saveAll(bundleList);
    }
}