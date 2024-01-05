package com.example.busreservation.user.service;

import com.example.busreservation.user.dao.UserRepository;
import com.example.busreservation.user.entity.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails createUser(UserDetails userDetails) {
        return userRepository.save(userDetails);
    }

    @Override
    public List<Long> getUserByMail(String mail) {
        return userRepository.getUserByMail(mail);
    }

    @Override
    public List<UserDetails> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "User with User Id " + id + " deleted!!!";
    }

    @Override
    public UserDetails updateUser(UserDetails userDetails) {
        UserDetails u= userRepository.findById(userDetails.getId()).orElse(null);
        if(u != null) {
            u.setUserName(userDetails.getUserName());
            u.setUserMail(userDetails.getUserMail());
            u.setPassword(userDetails.getPassword());
            u = userRepository.save(u);
        }
        return u;
    }

    @Override
    public boolean findUser(String mail, String password) {
        boolean f = false;
        List<UserDetails> userDetails = userRepository.findAll();
        for(UserDetails u: userDetails){
            if((u.getUserMail().equals(mail)) && (u.getPassword().equals(password))){
                f= true;
                break;
            }
        }
        return f;
    }

    @Override
    public Long getUserId(String mail) {
        return userRepository.getUserId(mail);
    }
}
