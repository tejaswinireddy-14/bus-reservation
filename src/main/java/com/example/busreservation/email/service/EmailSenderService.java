package com.example.busreservation.email.service;

public interface EmailSenderService {
public boolean sendEmail(String subject, String message, String to);
}
