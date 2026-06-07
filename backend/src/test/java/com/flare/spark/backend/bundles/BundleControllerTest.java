package com.flare.spark.backend.bundles;

import com.flare.spark.generated.api.model.BundleDto;
import com.flare.spark.generated.api.model.CreateBundleDto;
import com.flare.spark.generated.api.model.PaginatedBundlesDto;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(BundleController.class)
@Import(BundleMapperImpl.class)
class BundleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BundleService bundleService;

    @Autowired
    private BundleMapper bundleMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllBundlesReturnsPaginatedBundlesDto() throws Exception {
        List<Bundle> bundleList = List.of(BundleBuilder.create().build());
        int pageNumber = 0;
        int pageSize = 1;
        boolean hasNext = false;

        Slice<Bundle> paginatedBundles = new SliceImpl<>(
                bundleList,
                PageRequest.of(pageNumber, pageSize),
                hasNext
        );

        PaginatedBundlesDto paginatedBundlesDto =
            PaginatedBundlesDtoBuilder.create()
                .withContent(bundleList.stream().map(bundleMapper::bundleToDto).toList())
                .withPageNumber(pageNumber)
                .withPageSize(pageSize)
                .build();

        Mockito.when(bundleService.getAllBundles(pageNumber))
                .thenReturn(paginatedBundles);

        mockMvc.perform(
            get("/api/v1/bundles")
        )
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(paginatedBundlesDto)));

        Mockito.verify(bundleService, Mockito.times(1)).getAllBundles(pageNumber);
    }

    @Test
    public void testGetAllBundlesAcceptsPageParameterAndReturnsPaginatedBundleDto() throws Exception {
        List<Bundle> bundleList = List.of(BundleBuilder.create().build());
        int pageNumber = 4;
        int pageSize = 1;
        boolean hasNext = false;

        Slice<Bundle> paginatedBundles = new SliceImpl<>(
            bundleList,
            PageRequest.of(pageNumber, pageSize),
            hasNext
        );

        PaginatedBundlesDto paginatedBundlesDto =
            PaginatedBundlesDtoBuilder.create()
                .withContent(bundleList.stream().map(bundleMapper::bundleToDto).toList())
                .withPageNumber(pageNumber)
                .withPageSize(pageSize)
                .withIsFirst(false)
                .build();

        Mockito.when(bundleService.getAllBundles(pageNumber))
                .thenReturn(paginatedBundles);

        mockMvc.perform(
            get("/api/v1/bundles?page=4")
        )
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(paginatedBundlesDto)));

        Mockito.verify(bundleService, Mockito.times(1)).getAllBundles(pageNumber);
    }

    @ParameterizedTest
    @ValueSource(strings = {
        "abc",
        "true",
        "[]",
        "{}",
        "null"
    })
    public void testGetAllBundlesDoesNotAcceptInvalidPageParameter(String value) throws Exception {
        mockMvc.perform(
            get("/api/v1/bundles")
                .param("page", value)
        )
        .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateBundleReturnsBundleDto() throws Exception {
        CreateBundleDto createBundleDto = CreateBundleDtoBuilder.create().build();
        Bundle savedBundle = BundleBuilder.create().build();
        BundleDto bundleDto = bundleMapper.bundleToDto(savedBundle);

        Mockito.when(bundleService.createBundle(Mockito.any(Bundle.class)))
                .thenReturn(savedBundle);

        mockMvc.perform(
            post("/api/v1/bundles")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createBundleDto))
        )
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(bundleDto)));
    }

    @Test
    public void testCreateBundleReturnsBadRequestResponseWhenNoParametersAreGiven() throws Exception {
        mockMvc.perform(
            post("/api/v1/bundles")
        )
        .andExpect(status().isBadRequest());
    }

    @Test
    public void testCreateBundleReturnsBadRequestResponseWhenCreateBundleDtoIsInvalid() throws Exception {
        mockMvc.perform(
            post("/api/v1/bundles")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new Object()))
        )
        .andExpect(status().isBadRequest());
    }
}