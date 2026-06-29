package com.flare.spark.backend.emailing;

import com.flare.spark.generated.api.model.SendEmailDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class SendMailController {
    private final SendEmailService sendEmailService;

    public SendMailController(SendEmailService sendEmailService) {
        this.sendEmailService = sendEmailService;
    }

    @PostMapping("/send-email")
    public String send(
            @RequestBody SendEmailDto sendEmailDto
    ) throws Exception {
        return sendEmailService.sendMail(sendEmailDto);
    }
}
