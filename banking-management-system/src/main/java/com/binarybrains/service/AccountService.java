package com.binarybrains.service;

import com.binarybrains.dao.AccountDAO;
import com.binarybrains.dao.CustomerDAO;
import com.binarybrains.dao.TransactionDAO;
import com.binarybrains.model.Account;

import java.util.List;

public class AccountService {

    private AccountDAO accountDAO = new AccountDAO();
    private CustomerDAO customerDAO = new CustomerDAO();
    private TransactionDAO transactionDAO = new TransactionDAO();

    public boolean createAccount(Account acc) {

        if (!customerDAO.customerExists(acc.getCustomerId())) {
            System.out.println("❌ Customer ID does not exist.");
            return false;
        }

        if (!(acc.getAccountType().equalsIgnoreCase("SAVINGS")
                || acc.getAccountType().equalsIgnoreCase("CURRENT"))) {

            System.out.println("❌ Account type must be SAVINGS or CURRENT.");
            return false;
        }

        if (acc.getBalance() < 500) {
            System.out.println("❌ Minimum opening balance is ₹500.");
            return false;
        }

        return accountDAO.createAccount(acc);
    }

    public boolean deposit(int accountId, double amount) {

        if (amount <= 0) {
            System.out.println("❌ Invalid deposit amount.");
            return false;
        }

        Account acc = accountDAO.getAccountById(accountId);

        if (acc == null) {
            System.out.println("❌ Account not found.");
            return false;
        }

        double newBalance = acc.getBalance() + amount;

        boolean updated = accountDAO.updateBalance(accountId, newBalance);

        if (updated) {
            transactionDAO.addTransaction(accountId, "DEPOSIT", amount);
        }

        return updated;
    }

    public boolean withdraw(int accountId, double amount) {

        if (amount <= 0) {
            System.out.println("❌ Invalid withdraw amount.");
            return false;
        }

        Account acc = accountDAO.getAccountById(accountId);

        if (acc == null) {
            System.out.println("❌ Account not found.");
            return false;
        }

        if (acc.getBalance() < amount) {
            System.out.println("❌ Insufficient balance.");
            return false;
        }

        double newBalance = acc.getBalance() - amount;

        boolean updated = accountDAO.updateBalance(accountId, newBalance);

        if (updated) {
            transactionDAO.addTransaction(accountId, "WITHDRAW", amount);
        }

        return updated;
    }

    public String generateAccountNumber() {
        return accountDAO.generateAccountNumber();
    }

    public Account searchAccount(int accountId) {
        return accountDAO.getAccountById(accountId);
    }

    public List<Account> getAllAccounts() {
        return accountDAO.getAllAccounts();
    }

    public boolean updateAccount(Account account) {

        if (!customerDAO.customerExists(account.getCustomerId())) {
            System.out.println("❌ Customer ID does not exist.");
            return false;
        }

        if (!(account.getAccountType().equalsIgnoreCase("SAVINGS")
                || account.getAccountType().equalsIgnoreCase("CURRENT"))) {

            System.out.println("❌ Invalid account type.");
            return false;
        }

        if (account.getBalance() < 0) {
            System.out.println("❌ Balance cannot be negative.");
            return false;
        }

        return accountDAO.updateAccount(account);
    }

    public boolean deleteAccount(int accountId) {
        return accountDAO.deleteAccount(accountId);
    }

    public Account searchAccountByNumber(String accountNumber) {
        return accountDAO.getAccountByNumber(accountNumber);
    }

    public boolean customerHasAccounts(int customerId) {
        return accountDAO.customerHasAccounts(customerId);
    }
}