package com.binarybrains.service;

import com.binarybrains.dao.AccountDAO;
import com.binarybrains.dao.TransactionDAO;
import com.binarybrains.dao.UserDAO;
import com.binarybrains.model.Account;
import com.binarybrains.model.Transaction;
import com.binarybrains.model.User;

import java.util.List;

public class UserService {

    private UserDAO userDAO = new UserDAO();
    private AccountDAO accountDAO = new AccountDAO();
    private TransactionDAO transactionDAO = new TransactionDAO();

    // LOGIN
    public User login(String username, String password) {
        return userDAO.login(username, password);
    }

    // USER ACCOUNTS
    public List<Account> getAccounts(int customerId) {
        return accountDAO.getAccountsByCustomerId(customerId);
    }

    // BALANCE
    public double getBalance(int accountId) {
        Account acc = accountDAO.getAccountById(accountId);
        return acc != null ? acc.getBalance() : 0;
    }

    // MINI STATEMENT
    public List<Transaction> miniStatement(int accountId) {
        return transactionDAO.getMiniStatement(accountId);
    }

    // VIEW USERS
    public List<User> getAllUsers() {
        return userDAO.getAllUsers();
    }

    // CREATE USER
    public boolean createUser(User user) {

        if (user.getUsername() == null ||
                user.getUsername().trim().length() < 5 ||
                user.getUsername().contains(" ")) {

            System.out.println("❌ Username must be at least 5 characters and contain no spaces.");
            return false;
        }

        String password = user.getPassword();

        if (password == null ||
                password.length() < 8 ||
                !password.matches(".*[A-Z].*") ||
                !password.matches(".*[a-z].*") ||
                !password.matches(".*\\d.*")) {

            System.out.println("❌ Password must contain:");
            System.out.println("   • At least 8 characters");
            System.out.println("   • One uppercase letter");
            System.out.println("   • One lowercase letter");
            System.out.println("   • One digit");
            return false;
        }

        if (!(user.getRole().equalsIgnoreCase("ADMIN")
                || user.getRole().equalsIgnoreCase("USER"))) {

            System.out.println("❌ Invalid role.");
            return false;
        }

        return userDAO.createUser(user);
    }
    public boolean deleteUser(int userId){
        return userDAO.deleteUser(userId);
    }

    public boolean updateUser(User user) {
        return userDAO.updateUser(user);
    }

    public User getUserById(int userId) {
        return userDAO.getUserById(userId);
    }

    public boolean changePassword(int userId, String newPassword) {
        return userDAO.changePassword(userId, newPassword);
    }
}