package com.flare.spark.backend.mailing;

import static ch.martinelli.oss.testcontainers.mailpit.assertions.MailpitAssertions.assertThat;

import ch.martinelli.oss.testcontainers.mailpit.MailpitContainer;
import com.flare.spark.backend.IntegrationTest;
import com.flare.spark.backend.emailing.Email;
import com.flare.spark.backend.emailing.SendEmailService;
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

    private List<Email> testEmails;

    @BeforeEach
    public void setUp() {
        mailpit.getClient().deleteAllMessages();
        testEmails = List.of(
                Email.builder()
                        .from("test@example.com")
                        .to("alice@example.com")
                        .subject("Hello!")
                        .body("This is a test email.")
                        .build(),
                Email.builder()
                        .from("noreply@flare.com")
                        .to("bob@example.com")
                        .subject("Welcome to Flare")
                        .body("Thanks for signing up. We hope you enjoy using Flare!")
                        .build(),
                Email.builder()
                        .from("support@flare.com")
                        .to("charlie@example.com")
                        .subject("Password Reset")
                        .body("Click the following link to reset your password:\nhttps://example.com/reset?token=abc123")
                        .build()
        );
    }

    @Test
    public void sendsAllGenericMails() {
        for (Email email : testEmails) {
            emailService.sendMail(email);
        }

        assertThat(mailpit)
                .awaitMessageCount(3)
                .hasMessageTo("alice@example.com")
                .hasMessageWithSubject("Welcome to Flare")
                .hasMessageFrom("support@flare.com");
    }
}
