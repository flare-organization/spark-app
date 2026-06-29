package com.flare.spark.backend.emailing;


import com.flare.spark.generated.api.model.SendEmailDto;
import jakarta.mail.MessagingException;
import org.jspecify.annotations.NonNull;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {
    private final JavaMailSender mailSender;

    // its giving a warning about not being able to auto wire, but its fully working, IDE issue/misfire?
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public SendEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendMail(@NonNull SendEmailDto sendEmailDto) throws MessagingException {
        var mimeMessage = mailSender.createMimeMessage();
        var message = new MimeMessageHelper(mimeMessage);
        message.setFrom(sendEmailDto.getFrom());
        message.setTo(sendEmailDto.getTo());
        message.setSubject(sendEmailDto.getSubject());
        message.setText(sendEmailDto.getBody(), false);
        mailSender.send(message.getMimeMessage());
        return "Email successfully sent";
    }
}
