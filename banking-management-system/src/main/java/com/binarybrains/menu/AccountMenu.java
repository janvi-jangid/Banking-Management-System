package com.binarybrains.menu;

import com.binarybrains.model.Account;
import com.binarybrains.service.AccountService;
import com.binarybrains.service.TransactionService;


import java.util.List;
import java.util.Scanner;

public class AccountMenu {

    Scanner sc = new Scanner(System.in);
    AccountService accountService = new AccountService();

    public void accountMenu() {

        while (true) {

            System.out.println("\n========== ACCOUNT MENU ==========");
            System.out.println("1. Create Account");
            System.out.println("2. Search Account by ID");
            System.out.println("3. Search Account by Number");
            System.out.println("4. View All Accounts");
            System.out.println("5. Update Account");
            System.out.println("6. Delete Account");
            System.out.println("7. Back");



            System.out.print("Enter choice: ");
            int choice;

            try {
                choice = Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalid input.");
                continue;
            }

            switch (choice) {

                case 1:

                    Account acc = new Account();

                    System.out.print("Enter Customer ID: ");
                    acc.setCustomerId(Integer.parseInt(sc.nextLine()));

                    System.out.print("Enter Account Type (SAVINGS/CURRENT): ");
                    acc.setAccountType(sc.nextLine());

                    System.out.print("Enter Initial Deposit: ");
                    acc.setBalance(Double.parseDouble(sc.nextLine()));

                    acc.setAccountNumber(accountService.generateAccountNumber());

                    if (accountService.createAccount(acc)) {
                        System.out.println("\n✅ Account Created Successfully!");
                        System.out.println("Account Number: " + acc.getAccountNumber());
                    } else {
                        System.out.println("\n❌ Failed to create account!");
                    }

                    break;

                case 2:

                    System.out.print("Enter Account ID: ");
                    int accountId = Integer.parseInt(sc.nextLine());

                    Account account = accountService.searchAccount(accountId);

                    if (account != null) {

                        System.out.println("\n========== ACCOUNT DETAILS ==========");
                        System.out.println("Account ID     : " + account.getAccountId());
                        System.out.println("Account Number : " + account.getAccountNumber());
                        System.out.println("Customer ID    : " + account.getCustomerId());
                        System.out.println("Account Type   : " + account.getAccountType());
                        System.out.println("Balance        : ₹" + account.getBalance());

                    } else {

                        System.out.println("❌ Account Not Found!");

                    }

                    break;
                case 3:

                    System.out.print("Enter Account Number: ");
                    String accNo = sc.nextLine();

                    Account accountByNumber = accountService.searchAccountByNumber(accNo);

                    if (accountByNumber != null) {

                        System.out.println("\n========== ACCOUNT DETAILS ==========");
                        System.out.println("Account ID     : " + accountByNumber.getAccountId());
                        System.out.println("Account Number : " + accountByNumber.getAccountNumber());
                        System.out.println("Customer ID    : " + accountByNumber.getCustomerId());
                        System.out.println("Account Type   : " + accountByNumber.getAccountType());
                        System.out.println("Balance        : ₹" + accountByNumber.getBalance());

                    } else {

                        System.out.println("❌ Account Not Found!");
                    }

                    break;
                case 4:

                    List<Account> accounts = accountService.getAllAccounts();

                    if (accounts.isEmpty()) {

                        System.out.println("No Accounts Found!");

                    } else {

                        System.out.println("\n========== ALL ACCOUNTS ==========");

                        System.out.printf("%-5s %-20s %-12s %-12s %-15s%n",
                                "ID",
                                "ACCOUNT NO",
                                "CUSTOMER",
                                "TYPE",
                                "BALANCE");

                        System.out.println("---------------------------------------------------------------");

                        for (Account a : accounts) {

                            System.out.printf("%-5d %-20s %-12d %-12s ₹%-15.2f%n",
                                    a.getAccountId(),
                                    a.getAccountNumber(),
                                    a.getCustomerId(),
                                    a.getAccountType(),
                                    a.getBalance());
                        }
                    }

                    break;

                case 5:

                    Account updateAcc = new Account();

                    System.out.print("Enter Account ID: ");
                    updateAcc.setAccountId(Integer.parseInt(sc.nextLine()));

                    System.out.print("Enter Customer ID: ");
                    updateAcc.setCustomerId(Integer.parseInt(sc.nextLine()));

                    System.out.print("Enter Account Type (SAVINGS/CURRENT): ");
                    updateAcc.setAccountType(sc.nextLine());

                    System.out.print("Enter Balance: ");
                    updateAcc.setBalance(Double.parseDouble(sc.nextLine()));

                    if (accountService.updateAccount(updateAcc)) {
                        System.out.println("✅ Account Updated Successfully!");
                    } else {
                        System.out.println("❌ Account Update Failed!");
                    }

                    break;

                case 6:

                    System.out.print("Enter Account ID to Delete: ");
                    int deleteId = Integer.parseInt(sc.nextLine());

                    TransactionService transactionService = new TransactionService();

                    if (transactionService.accountHasTransactions(deleteId)) {

                        System.out.println("❌ Cannot delete account.");
                        System.out.println("Transaction history exists.");

                        break;
                    }

                    if (accountService.deleteAccount(deleteId)) {
                        System.out.println("✅ Account Deleted Successfully!");
                    } else {
                        System.out.println("❌ Account Not Found!");
                    }

                    break;

                case 7:
                    return;

                default:
                    System.out.println("Invalid choice!");

            }
        }
    }
}