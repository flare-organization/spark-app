package com.flare.spark.backend.bundles;

import com.flare.spark.backend.IntegrationTest;
import com.flare.spark.generated.api.model.CreateBundleDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.context.WebApplicationContext;

class CreateBundleIntegrationTest extends IntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BundleRepository bundleRepository;

    @Test
    public void testCreateBundleInsertsNewBundleInTheDatabase() throws Exception {
        CreateBundleDto createBundleDto = new CreateBundleDto();

        createBundleDto.setName("spark bundle");
        createBundleDto.setDescription("The description of the bundle");
        createBundleDto.setStatus(CreateBundleDto.StatusEnum.PRIVATE);

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_JSON);

//        restTemplate.postForEntity("http://localhost:" + port)

//        mvc.perform(
//            post("/api/v1/bundles", createBundleDto).with(csrf())
//        ).andExpect(status().isOk());

        bundleRepository.findById(bundle.getId());
    }
}