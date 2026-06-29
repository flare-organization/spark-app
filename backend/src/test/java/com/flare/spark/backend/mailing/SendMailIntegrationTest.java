package com.flare.spark.backend.mailing;

import static ch.martinelli.oss.testcontainers.mailpit.assertions.MailpitAssertions.assertThat;

import ch.martinelli.oss.testcontainers.mailpit.MailpitContainer;
import com.flare.spark.backend.IntegrationTest;
import com.flare.spark.backend.emailing.SendEmailService;
import com.flare.spark.generated.api.model.SendEmailDto;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.junit.jupiter.Container;

class SendMailIntegrationTest extends IntegrationTest {

    @Container
    @ServiceConnection
    static MailpitContainer mailpit = new MailpitContainer("axllent/mailpit:v1.29");

    @Autowired
    private SendEmailService emailService;

    private List<SendEmailDto> testDtos;

    @BeforeEach
    void setUp() {
        mailpit.getClient().deleteAllMessages();
        testDtos = List.of(
                new SendEmailDto(
                        "test@example.com",
                        "alice@example.com",
                        "Hello!",
                        "This is a test email."
                ),
                new SendEmailDto(
                        "noreply@flare.com",
                        "bob@example.com",
                        "Welcome to Flare",
                        "Thanks for signing up. We hope you enjoy using Flare!"
                ),
                new SendEmailDto(
                        "support@flare.com",
                        "charlie@example.com",
                        "Password Reset",
                        "Click the following link to reset your password:\nhttps://example.com/reset?token=abc123"
                )
        );
    }

    @Test
    void sendsAllGenericMails() throws Exception {
        for (SendEmailDto dto : testDtos) {
            emailService.sendMail(dto);
        }

        assertThat(mailpit)
                .awaitMessageCount(3)
                .hasMessageTo("alice@example.com")
                .hasMessageWithSubject("Welcome to Flare")
                .hasMessageFrom("support@flare.com");
    }
}
