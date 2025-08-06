package com.rostack.elearn.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendCourseAccessEmail(String to, String courseName, String driveLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Access to your course: " + courseName);
        message.setText("Hi,\n\nThank you for purchasing the course \"" + courseName + "\".\n" +
                "You can access your course materials here: " + driveLink + "\n\nHappy Learning!\nTeam dhisMas.com");

        mailSender.send(message);
    }
}

