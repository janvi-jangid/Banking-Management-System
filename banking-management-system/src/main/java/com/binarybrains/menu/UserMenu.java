package com.binarybrains.menu;

import com.binarybrains.model.Account;
import com.binarybrains.model.Transaction;
import com.binarybrains.model.User;
import com.binarybrains.service.AccountService;
import com.binarybrains.service.TransactionService;
import com.binarybrains.service.UserService;

import java.util.List;
import java.util.Scanner;

public class UserMenu {

    Scanner sc = new Scanner(System.in);

    UserService userService = new UserService();
    AccountService accountService = new AccountService();
    TransactionService transactionService = new TransactionService();

    public void showUserMenu(User user) {

        while (true) {

            System.out.println("\n========== USER DASHBOARD ==========");
            System.out.println("1. View My Accounts");
            System.out.println("2. Check Balance");
            System.out.println("3. Deposit Money");
            System.out.println("4. Withdraw Money");
            System.out.println("5. Mini Statement");
            System.out.println("6. Exit");

            System.out.print("Enter choice: ");

            int choice;
            try {
                choice = Integer.parseInt(sc.nextLine());
            } catch (Exception e) {
                System.out.println("❌ Invalid input!");
                continue;
            }

            switch (choice) {

                case 1:

                    List<Account> accounts = userService.getAccounts(user.getUserId());

                    if (accounts.isEmpty()) {
                        System.out.println("No Accounts Found!");
                    } else {

                        for (Account acc : accounts) {
                            System.out.println("-----------------------------");
                            System.out.println("Account ID : " + acc.getAccountId());
                            System.out.println("Account No : " + acc.getAccountNumber());
                            System.out.println("Type       : " + acc.getAccountType());
                            System.out.println("Balance    : " + acc.getBalance());
                        }
                    }
                    break;

                case 2:

                    System.out.print("Enter Account ID: ");
                    int accId = Integer.parseInt(sc.nextLine());

                    Account acc = accountService.searchAccount(accId);

                    if (acc != null) {
                        System.out.println("Current Balance : ₹" + acc.getBalance());
                    } else {
                        System.out.println("❌ Account not found!");
                    }

                    break;

                case 3:

                    System.out.print("Enter Account ID: ");
                    int depId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter Amount: ");
                    double depAmount = Double.parseDouble(sc.nextLine());

                    if (accountService.deposit(depId, depAmount)) {
                        System.out.println("✅ Deposit Successful!");
                    } else {
                        System.out.println("❌ Deposit Failed!");
                    }

                    break;

                case 4:

                    System.out.print("Enter Account ID: ");
                    int wdId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter Amount: ");
                    double wdAmount = Double.parseDouble(sc.nextLine());

                    if (accountService.withdraw(wdId, wdAmount)) {
                        System.out.println("✅ Withdraw Successful!");
                    } else {
                        System.out.println("❌ Withdraw Failed!");
                    }

                    break;

                case 5:

                    System.out.print("Enter Account ID: ");
                    int id = Integer.parseInt(sc.nextLine());

                    List<Transaction> list = transactionService.getMiniStatement(id);

                    if (list.isEmpty()) {
                        System.out.println("No Transactions Found!");
                    } else {

                        for (Transaction t : list) {
                            System.out.println("--------------------------------");
                            System.out.println("Type   : " + t.getTransactionType());
                            System.out.println("Amount : ₹" + t.getAmount());
                            System.out.println("Date   : " + t.getTransactionDate());
                        }
                    }

                    break;

                case 6:
                    return;

                default:
                    System.out.println("Invalid Choice!");
            }
        }
    }
}