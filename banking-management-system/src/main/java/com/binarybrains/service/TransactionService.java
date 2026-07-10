package com.binarybrains.service;

import com.binarybrains.dao.AccountDAO;
import com.binarybrains.dao.TransactionDAO;
import com.binarybrains.model.Account;
import com.binarybrains.model.Transaction;

import java.util.List;

public class TransactionService {

    private TransactionDAO transactionDAO = new TransactionDAO();
    private AccountDAO accountDAO = new AccountDAO();

    // Deposit Money
    public boolean deposit(int accountId, double amount) {

        if (amount <= 0) {
            System.out.println("❌ Amount must be greater than 0.");
            return false;
        }

        if (amount > 1000000) {
            System.out.println("❌ Maximum deposit limit is ₹10,00,000.");
            return false;
        }

        Account acc = accountDAO.getAccountById(accountId);

        if (acc == null) {
            System.out.println("❌ Account not found.");
            return false;
        }

        double oldBalance = acc.getBalance();
        double newBalance = oldBalance + amount;

        boolean updated = accountDAO.updateBalance(accountId, newBalance);

        if (updated) {
            transactionDAO.addTransaction(accountId, "DEPOSIT", amount);

            System.out.println("\n========== DEPOSIT SUCCESS ==========");
            System.out.println("Old Balance : " + oldBalance);
            System.out.println("Deposit     : " + amount);
            System.out.println("New Balance : " + newBalance);

            return true;
        }

        return false;
    }

    // Withdraw Money
    public boolean withdraw(int accountId, double amount) {

        if (amount <= 0) {
            System.out.println("❌ Amount must be greater than 0.");
            return false;
        }

        if (amount > 500000) {
            System.out.println("❌ Maximum withdrawal limit is ₹5,00,000.");
            return false;
        }

        Account acc = accountDAO.getAccountById(accountId);

        if (acc == null) {
            System.out.println("❌ Account not found.");
            return false;
        }

        if (acc.getBalance() < amount) {
            System.out.println("❌ Insufficient Balance!");
            return false;
        }

        double oldBalance = acc.getBalance();
        double newBalance = oldBalance - amount;

        boolean updated = accountDAO.updateBalance(accountId, newBalance);

        if (updated) {
            transactionDAO.addTransaction(accountId, "WITHDRAW", amount);

            System.out.println("\n========== WITHDRAW SUCCESS ==========");
            System.out.println("Old Balance : " + oldBalance);
            System.out.println("Withdraw    : " + amount);
            System.out.println("New Balance : " + newBalance);

            return true;
        }

        return false;
    }

    // Transfer Money
    public boolean transfer(int fromAccountId, int toAccountId, double amount) {

        if (amount <= 0) {
            System.out.println("❌ Amount must be greater than 0.");
            return false;
        }

        if (fromAccountId == toAccountId) {
            System.out.println("❌ Sender and Receiver cannot be the same.");
            return false;
        }

        if (amount > 1000000) {
            System.out.println("❌ Transfer limit exceeded.");
            return false;
        }

        Account fromAcc = accountDAO.getAccountById(fromAccountId);
        Account toAcc = accountDAO.getAccountById(toAccountId);

        if (fromAcc == null || toAcc == null) {
            System.out.println("❌ Invalid Account ID.");
            return false;
        }

        if (fromAcc.getBalance() < amount) {
            System.out.println("❌ Insufficient Balance!");
            return false;
        }

        double senderOld = fromAcc.getBalance();
        double receiverOld = toAcc.getBalance();

        boolean debit = accountDAO.updateBalance(fromAccountId, senderOld - amount);
        boolean credit = accountDAO.updateBalance(toAccountId, receiverOld + amount);

        if (debit && credit) {

            transactionDAO.addTransaction(fromAccountId, "TRANSFER_OUT", amount);
            transactionDAO.addTransaction(toAccountId, "TRANSFER_IN", amount);

            System.out.println("\n========== MONEY TRANSFER ==========");
            System.out.println("From Account       : " + fromAccountId);
            System.out.println("To Account         : " + toAccountId);
            System.out.println("Transfer Amount    : " + amount);

            System.out.println("\nSender Balance");
            System.out.println(senderOld + "  ->  " + (senderOld - amount));

            System.out.println("\nReceiver Balance");
            System.out.println(receiverOld + "  ->  " + (receiverOld + amount));

            System.out.println("\n✅ Transfer Successful!");

            return true;
        }

        return false;
    }

    // Statement
    public List<Transaction> getStatement(int accountId) {
        return transactionDAO.getTransactionsByAccount(accountId);
    }

    public List<Transaction> getRecentTransactions() {
        return transactionDAO.getRecentTransactions();
    }

    public boolean accountHasTransactions(int accountId) {
        return transactionDAO.accountHasTransactions(accountId);
    }

    // Mini Statement
    public List<Transaction> getMiniStatement(int accountId) {
        return transactionDAO.getMiniStatement(accountId);
    }
}