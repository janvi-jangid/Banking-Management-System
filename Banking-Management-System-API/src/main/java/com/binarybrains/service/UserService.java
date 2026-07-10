package com.binarybrains.service;

import com.binarybrains.entity.User;
import com.binarybrains.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        return "Login Successful";
    }
}
