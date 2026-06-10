package com.flare.spark.backend.config;

import com.flare.spark.backend.IntegrationTest;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;

class CorsIntegrationTest extends IntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Value("${spark-variables.cors.allowed-origin}")
    private String allowedOrigin;

    private final String notAllowedOrigin = "http://localhost:1234";

    @Test
    void shouldRejectNotAllowedOrigin() throws Exception {
        mockMvc.perform(
            get("/api/v1/ping")
                .header("Origin", notAllowedOrigin))
                .andExpect(status().isForbidden())
                .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }

    @Test
    void shouldAcceptAllowedOrigin() throws Exception {
        mockMvc.perform(
            get("/api/v1/ping")
                .header("Origin", allowedOrigin))
                .andExpect(status().isNoContent())
                .andExpect(header().string("Access-Control-Allow-Origin", allowedOrigin));
    }

    @Test
    void allowedRequestMethods() throws Exception {
        mockMvc.perform(
            options("/api/v1/ping")
                .header("Origin", allowedOrigin)
                .header("Access-Control-Request-Method", "GET")
        )
        .andExpect(status().isOk())
        .andExpect(header().string("Access-Control-Allow-Methods", "GET,POST"));
    }

    @Test
    void allHeadersAreAllowed() throws Exception {
        mockMvc.perform(
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
        mockMvc.perform(
            get("/api/v1/ping")
                .header("Origin", notAllowedOrigin)
                .header("Access-Control-Request-Headers", "X-Spark-Header")
            )
            .andExpect(status().isForbidden())
            .andExpect(header().doesNotExist("Access-Control-Request-Headers"));
    }
}