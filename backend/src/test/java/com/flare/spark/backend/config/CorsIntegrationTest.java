package com.flare.spark.backend.config;

import com.flare.spark.backend.IntegrationTest;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;

class CorsIntegrationTest extends IntegrationTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Value("${cors.allowed-origin}")
    private String allowedOrigin;

    private final String notAllowedOrigin = "http://localhost:1234";

    @BeforeEach
    public void setUp() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    void shouldRejectNotAllowedOrigin() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
                .header("Origin", notAllowedOrigin))
                .andExpect(status().isForbidden())
                .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }

    @Test
    void shouldAcceptAllowedOrigin() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
                .header("Origin", allowedOrigin))
                .andExpect(status().isNoContent())
                .andExpect(header().string("Access-Control-Allow-Origin", allowedOrigin));
    }

    @Test
    void allowedRequestMethods() throws Exception {
        mvc.perform(
            options("/api/v1/ping")
                .header("Origin", allowedOrigin)
                .header("Access-Control-Request-Method", "GET")
            )
            .andExpect(status().isOk())
            .andExpect(header().string("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS"));
    }

    @Test
    void headRequestMethodIsNotAllowed() throws Exception {
        mvc.perform(
            options("/api/v1/ping")
                .header("Origin", allowedOrigin)
                .header("Access-Control-Request-Method", "HEAD")
            )
            .andExpect(status().isForbidden());
    }

    @Test
    void allHeadersAreAllowed() throws Exception {
        mvc.perform(
            options("/api/v1/ping")
                .header("Origin", allowedOrigin)
                .header("Access-Control-Request-Method", "GET")
                .header("Access-Control-Request-Headers", "X-Spark-Header")
                .cookie(new Cookie("spark-cookie", "spark-cookie-value"))
            )
            .andExpect(status().isOk())
            .andExpect(header().string("Access-Control-Allow-Origin", allowedOrigin))
            .andExpect(header().exists("Access-Control-Allow-Headers"));
    }

    @Test
    void exposedHeaderIsNotIncludedForNotAllowedOrigin() throws Exception {
        mvc.perform(
            get("/api/v1/ping")
                .header("Origin", notAllowedOrigin)
                .header("Access-Control-Request-Headers", "X-Spark-Header")
            )
            .andExpect(status().isForbidden())
            .andExpect(header().doesNotExist("Access-Control-Request-Headers"));
    }
}