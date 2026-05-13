package com.teamflare.spark.backend;

import com.teamflare.spark.generated.api.model.PingResultDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping")
public class PingController {

    @GetMapping
    public PingResultDto getPingResult() {
        return new PingResultDto(true);
    }

}
