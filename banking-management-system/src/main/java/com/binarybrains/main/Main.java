package com.binarybrains.main;

import com.binarybrains.menu.AdminMenu;
import com.binarybrains.menu.LoginMenu;
import com.binarybrains.menu.UserMenu;
import com.binarybrains.model.User;
import com.binarybrains.session.SessionManager;

public class Main {

    public static void main(String[] args) {

        LoginMenu loginMenu = new LoginMenu();

        User user = loginMenu.login();

        if (user == null) {
            System.out.println("\nLogin failed. Exiting application...");
            return;
        }

        SessionManager.setUser(user);

        if (user.getRole().equalsIgnoreCase("ADMIN")) {

            AdminMenu adminMenu = new AdminMenu();
            adminMenu.showAdminMenu(user);

        } else {

            UserMenu userMenu = new UserMenu();
            userMenu.showUserMenu(user);

        }

        System.out.println("\nThank you for using Banking System.");
    }
}



