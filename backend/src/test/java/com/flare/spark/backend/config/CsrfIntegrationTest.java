package com.flare.spark.backend.config;

import com.flare.spark.backend.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.head;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CsrfIntegrationTest extends IntegrationTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @BeforeEach
    public void setUp() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    public void testCsrfProtectionIsDisabledOnGetRoute() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
        ).andExpect(status().isNoContent());
    }

    @Test
    public void testCsrfProtectionIsDisabledOnHeadRoute() throws Exception {
        mvc.perform(
            head("/api/v1/ping")
        ).andExpect(status().isNoContent());
    }

    @Test
    public void testCsrfCookieIsSetOnGetRequest() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
        ).andExpect(cookie().exists("XSRF-TOKEN"));
    }


    @Test
    public void testCsrfProtectionOnPostRouteWithNoTokenProvided() throws Exception {
        mvc.perform(
            post("/api/v1/ping")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPostRouteWithInvalidToken() throws Exception {
        mvc.perform(
            post("/api/v1/ping").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPostRouteWithValidToken() throws Exception {
        mvc.perform(
            post("/api/v1/ping").with(csrf())
        ).andExpect(status().isNoContent());
    }

    @Test
    public void testCsrfProtectionOnPutRouteWithNoTokenProvided() throws Exception {
        mvc.perform(
            put("/api/v1/ping")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPutRouteWithInvalidToken() throws Exception {
        mvc.perform(
            put("/api/v1/ping").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPutRouteWithValidToken() throws Exception {
        mvc.perform(
            put("/api/v1/ping").with(csrf())
        ).andExpect(status().isNoContent());
    }

    @Test
    public void testCsrfProtectionOnDeleteRouteWithNoTokenProvided() throws Exception {
        mvc.perform(
            delete("/api/v1/ping")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnDeleteRouteWithInvalidToken() throws Exception {
        mvc.perform(
            delete("/api/v1/ping").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnDeleteRouteWithValidToken() throws Exception {
        mvc.perform(
            delete("/api/v1/ping").with(csrf())
        ).andExpect(status().isNoContent());
    }

    @Test
    public void testCsrfProtectionOnPatchRouteWithNoTokenProvided() throws Exception {
        mvc.perform(
            patch("/api/v1/ping")
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPatchRouteWithInvalidToken() throws Exception {
        mvc.perform(
            patch("/api/v1/ping").with(csrf().useInvalidToken())
        ).andExpect(status().isForbidden());
    }

    @Test
    public void testCsrfProtectionOnPatchRouteWithValidToken() throws Exception {
        mvc.perform(
            patch("/api/v1/ping").with(csrf())
        ).andExpect(status().isNoContent());
    }
}