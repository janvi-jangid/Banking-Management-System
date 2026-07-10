package com.binarybrains.controller;

import com.binarybrains.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
})
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password) {

        return userService.login(username, password);
    }
}
