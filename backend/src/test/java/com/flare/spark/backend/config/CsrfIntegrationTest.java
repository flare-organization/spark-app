package com.flare.spark.backend.config;

import com.flare.spark.backend.IntegrationTest;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class CsrfIntegrationTest extends IntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private MockMvc mvc;

    @Test
    @Order(1) // We set the order to 1, because we need a fresh application context
    public void testCsrfCookieIsSetOnGetRequest() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
        ).andExpect(cookie().exists("XSRF-TOKEN"));
    }

    @Test
    public void testCsrfProtectionIsDisabledOnGetRoute() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
        ).andExpect(status().isNoContent());
    }

    @Test
    public void testCsrfProtectionOnPostRouteWithNoTokenProvidedIsForbidden() throws Exception {
        mvc.perform(
            post("/api/v1/bundles")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPostRouteWithInvalidTokenIsForbidden() throws Exception {
        mvc.perform(
            post("/api/v1/bundles").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPutRouteWithNoTokenProvidedIsForbidden() throws Exception {
        mvc.perform(
            put("/api/v1/bundles")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPutRouteWithInvalidTokenIsForbidden() throws Exception {
        mvc.perform(
            put("/api/v1/bundles").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnDeleteRouteWithNoTokenProvidedIsForbidden() throws Exception {
        mvc.perform(
            delete("/api/v1/bundles")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnDeleteRouteWithInvalidTokenIsForbidden() throws Exception {
        mvc.perform(
            delete("/api/v1/bundles").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPatchRouteWithNoTokenProvidedIsForbidden() throws Exception {
        mvc.perform(
            patch("/api/v1/bundles")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPatchRouteWithInvalidTokenIsForbidden() throws Exception {
        mvc.perform(
            patch("/api/v1/bundles").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }
}