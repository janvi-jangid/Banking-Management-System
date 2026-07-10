package com.binarybrains.menu;

import com.binarybrains.model.User;
import com.binarybrains.service.UserService;
import java.util.List;
import java.util.Scanner;

public class AdminMenu {

    Scanner sc = new Scanner(System.in);

    DashboardMenu dashboardMenu = new DashboardMenu();
    CustomerMenu customerMenu = new CustomerMenu();
    AccountMenu accountMenu = new AccountMenu();
    TransactionMenu transactionMenu = new TransactionMenu();
    UserService userService = new UserService();

    public void showAdminMenu(User user) {

        while (true) {

            System.out.println("\n========== ADMIN DASHBOARD ==========");
            System.out.println("1. Dashboard");
            System.out.println("2. Customer Management");
            System.out.println("3. Account Management");
            System.out.println("4. Transaction Management");
            System.out.println("5. View All Users");
            System.out.println("6. Create New User");
            System.out.println("7. Update User");
            System.out.println("8. Delete User");
            System.out.println("9. Search User");
            System.out.println("10. Change User Password");
            System.out.println("11. Logout");

            System.out.print("Enter choice: ");
            int choice;

            try {
                choice = Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("❌ Please enter a valid number.");
                continue;
            }

            switch (choice) {

                case 1:
                    dashboardMenu.showDashboard();
                    break;

                case 2:
                    customerMenu.customerMenu();
                    break;

                case 3:
                    accountMenu.accountMenu();
                    break;

                case 4:
                    transactionMenu.transactionMenu();
                    break;

                case 5:

                    List<User> users = userService.getAllUsers();

                    System.out.println("\n========== ALL USERS ==========");

                    System.out.printf("%-5s %-20s %-15s%n",
                            "ID", "USERNAME", "ROLE");
                    System.out.println("-----------------------------------------");

                    for (User u : users) {
                        System.out.printf("%-5d %-20s %-15s%n",
                                u.getUserId(),
                                u.getUsername(),
                                u.getRole());
                    }

                    break;

                case 6:

                    User newUser = new User();

                    System.out.print("Enter Username: ");
                    newUser.setUsername(sc.nextLine());

                    System.out.print("Enter Password: ");
                    newUser.setPassword(sc.nextLine());

                    System.out.print("Enter Role (ADMIN/USER): ");
                    String role = sc.nextLine();

                    if (role == null || role.trim().isEmpty()) {
                        System.out.println("❌ Role cannot be empty");
                        break;
                    }

                    newUser.setRole(role.toUpperCase());
                    if (!newUser.getRole().equals("ADMIN") &&
                            !newUser.getRole().equals("USER")) {

                        System.out.println("❌ Role must be ADMIN or USER.");
                        break;
                    }

                    System.out.print("Enter Customer ID (0 for Admin): ");
                    newUser.setCustomerId(Integer.parseInt(sc.nextLine()));

                    if (userService.createUser(newUser)) {
                        System.out.println("\n✅ User Created Successfully!");
                    } else {
                        System.out.println("\n❌ Failed to Create User!");
                    }

                    break;

                case 7:

                    User updateUser = new User();

                    System.out.print("Enter User ID: ");
                    updateUser.setUserId(Integer.parseInt(sc.nextLine()));

                    System.out.print("Enter New Username: ");
                    updateUser.setUsername(sc.nextLine());

                    System.out.print("Enter New Password: ");
                    updateUser.setPassword(sc.nextLine());

                    System.out.print("Enter New Role (ADMIN/USER): ");
                    updateUser.setRole(sc.nextLine().toUpperCase());

                    System.out.print("Enter Customer ID: ");
                    updateUser.setCustomerId(Integer.parseInt(sc.nextLine()));

                    if (userService.updateUser(updateUser)) {
                        System.out.println("\n✅ User Updated Successfully!");
                    } else {
                        System.out.println("\n❌ User Update Failed!");
                    }

                    break;

                case 8:

                    System.out.print("Enter User ID to Delete: ");
                    int userId = Integer.parseInt(sc.nextLine());

                    if (userService.deleteUser(userId)) {
                        System.out.println("✅ User Deleted Successfully!");
                    } else {
                        System.out.println("❌ User Not Found!");
                    }

                    break;

                case 9:

                    System.out.print("Enter User ID: ");
                    int searchId = Integer.parseInt(sc.nextLine());

                    User foundUser = userService.getUserById(searchId);

                    if (foundUser != null) {

                        System.out.println("\n========== USER DETAILS ==========");
                        System.out.println("User ID      : " + foundUser.getUserId());
                        System.out.println("Username     : " + foundUser.getUsername());
                        System.out.println("Role         : " + foundUser.getRole());
                        System.out.println("Customer ID  : " + foundUser.getCustomerId());

                    } else {

                        System.out.println("❌ User Not Found!");
                    }

                    break;

                case 10:

                    System.out.print("Enter User ID: ");
                    int changeUserId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter New Password: ");
                    String newPassword = sc.nextLine();

                    if (userService.changePassword(changeUserId, newPassword)) {
                        System.out.println("✅ Password Changed Successfully!");
                    } else {
                        System.out.println("❌ Failed to Change Password!");
                    }

                    break;


                case 11:
                    System.out.println("Logged out successfully.");
                    return;

                default:
                    System.out.println("Invalid Choice!");


            }
        }
    }
}
