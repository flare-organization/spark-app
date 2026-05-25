package com.flare.spark.backend.testdata;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestDataTestController {

    @PostMapping("/ping")
    public String ping() {
        return "ping";
    }
}
