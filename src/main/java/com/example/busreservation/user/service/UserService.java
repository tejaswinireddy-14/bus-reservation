package com.example.busreservation.user.service;

import com.example.busreservation.user.entity.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public UserDetails createUser(UserDetails userDetails);
    public List<Long> getUserByMail(String mail);
    public List<UserDetails> getAllUser();
    public UserDetails getUserById(Long id);
    public String deleteUser(Long id);
    public UserDetails updateUser(UserDetails userDetails);
    public boolean findUser(String mail, String password);
    public Long getUserId(String mail);
}
