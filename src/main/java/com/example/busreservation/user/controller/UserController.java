package com.example.busreservation.user.controller;

import com.example.busreservation.user.entity.UserDetails;
import com.example.busreservation.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping("/get/users")
    public List<UserDetails> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/user/{id}")
    public UserDetails userDetails(@PathVariable("id") Long userId) {

        UserDetails userDetails = userService.getUserById(userId);

        if (userDetails == null) {
            throw new RuntimeException("user id not found - " + userId);
        }

        return userDetails;
    }
        @GetMapping("/userId")
    public List<Long> userDetails(@Param("mailId") String mailId) {
        List<Long> userDetails = userService.getUserByMail(mailId);
        if (userDetails == null) {
            throw new RuntimeException("user id not found - " + mailId);
        }
        return userDetails;
    }

    @PostMapping("/users")
    public UserDetails createUser(@RequestBody UserDetails userDetails) {
        userService.createUser(userDetails);
        return userDetails;

    }

    @PutMapping("/users")
    public UserDetails updateUser(@RequestBody UserDetails userDetails) {
        userService.updateUser(userDetails);
        return userDetails;

    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable("id") Long Id) {
        UserDetails userDetails = userService.getUserById(Id);
        if (userDetails == null) {
            throw new RuntimeException("user id not found - " + Id);
        }
        userService.deleteUser(Id);
        return "Deleted user id - " + Id;
    }

    @GetMapping("/exist")
    public boolean userExists(@Param("email")String email,@Param("password")String password){
        return userService.findUser(email, password);
    }

    @GetMapping("/get/userId")
    public Long getUserId(@Param("mail")String mail){
        return userService.getUserId(mail);
    }

}



