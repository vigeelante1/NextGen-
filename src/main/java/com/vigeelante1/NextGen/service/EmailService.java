package com.vigeelante1.NextGen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String token) {
        try {
            String subject = "NextGen Email Verification";
            String body = "Click the link to verify your email: http://localhost:8080/api/users/verify?token=" + token;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);

            System.out.println("Email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
