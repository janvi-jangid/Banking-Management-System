package com.binarybrains.menu;

import com.binarybrains.model.User;
import com.binarybrains.service.UserService;

import java.util.Scanner;

public class LoginMenu {

    Scanner sc = new Scanner(System.in);
    UserService userService = new UserService();

    public User login() {

        System.out.println("\n========== LOGIN ==========");

        System.out.print("Enter Username: ");
        String username = sc.nextLine();

        System.out.print("Enter Password: ");
        String password = sc.nextLine();

        User user = userService.login(username, password);

        if (user != null) {
            System.out.println("\n✅ Login Successful! Role: " + user.getRole());
            return user;
        } else {
            System.out.println("\n❌ Invalid username or password.");
            System.out.println("Please try again.");
            return null;
        }
    }
}