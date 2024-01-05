package com.example.busreservation.email.controller;

import com.example.busreservation.email.entity.EmailMessage;
import com.example.busreservation.email.service.EmailSenderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class EmailController {
    @Autowired
    EmailSenderServiceImpl emailSenderService;
    @RequestMapping(value = "/sendEmail" , method = RequestMethod.POST)
   public ResponseEntity<?> sendEmail(@RequestBody EmailMessage emailMessage){
        System.out.println(emailMessage);
        this.emailSenderService.sendEmail(emailMessage.getSubject(),emailMessage.getMessage(),emailMessage.getTo());
        return ResponseEntity.ok("Done...");
    }
}


