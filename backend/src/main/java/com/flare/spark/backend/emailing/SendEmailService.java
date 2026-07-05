package com.flare.spark.backend.emailing;


import jakarta.mail.internet.MimeMessage;
import jakarta.validation.constraints.NotNull;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.resilience.annotation.Retryable;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {
    private final JavaMailSender mailSender;

    public SendEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Retryable(value = MailException.class, delay = 5000, maxRetries = 5)
    public void sendMail(@NotNull Email email) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMailMessage helper = new MimeMailMessage(mimeMessage);

        helper.setFrom(email.from());
        helper.setTo(email.to());
        helper.setSubject(email.subject());
        helper.setText(email.body());

        mailSender.send(mimeMessage);
    }
}
