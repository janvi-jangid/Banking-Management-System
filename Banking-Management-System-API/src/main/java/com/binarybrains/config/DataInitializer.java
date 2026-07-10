package com.binarybrains.config;

import com.binarybrains.entity.User;
import com.binarybrains.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        userRepository.findByUsername("admin")
                .map(existingAdmin -> {
                    existingAdmin.setPassword("admin123");
                    existingAdmin.setRole("ADMIN");
                    return userRepository.save(existingAdmin);
                })
                .orElseGet(() -> {
                    User admin = new User();
                    admin.setUsername("admin");
                    admin.setPassword("admin123");
                    admin.setRole("ADMIN");
                    return userRepository.save(admin);
                });
    }
}
