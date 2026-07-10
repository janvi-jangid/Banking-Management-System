package com.binarybrains.menu;

import com.binarybrains.model.Transaction;
import com.binarybrains.service.TransactionService;

import java.util.List;
import java.util.Scanner;

public class TransactionMenu {

    Scanner sc = new Scanner(System.in);
    TransactionService transactionService = new TransactionService();

    public void transactionMenu() {

        while (true) {

            System.out.println("\n========== TRANSACTION MENU ==========");
            System.out.println("1. Deposit");
            System.out.println("2. Withdraw");
            System.out.println("3. Transfer Money");
            System.out.println("4. Mini Statement");
            System.out.println("5. Full Statement");
            System.out.println("6. Back");

            System.out.print("Enter choice: ");
            int choice;

            try {
                choice = Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalid choice.");
                continue;
            }

            switch (choice) {

                case 1:
                    System.out.print("Enter Account ID: ");
                    int depId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter Amount: ");
                    double depAmt = Double.parseDouble(sc.nextLine());

                    if (transactionService.deposit(depId, depAmt)) {
                        System.out.println("✅ Deposit Successful");
                    } else {
                        System.out.println("❌ Failed");
                    }
                    break;

                case 2:
                    System.out.print("Enter Account ID: ");
                    int wId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter Amount: ");
                    double wAmt = Double.parseDouble(sc.nextLine());

                    if (transactionService.withdraw(wId, wAmt)) {
                        System.out.println("✅ Withdraw Successful");
                    } else {
                        System.out.println("❌ Failed");
                    }
                    break;

                case 3:

                    System.out.print("Enter From Account ID: ");
                    int fromId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter To Account ID: ");
                    int toId = Integer.parseInt(sc.nextLine());

                    System.out.print("Enter Amount: ");
                    double amt = Double.parseDouble(sc.nextLine());

                    if (transactionService.transfer(fromId, toId, amt)) {
                        System.out.println("✅ Transfer Successful!");
                    } else {
                        System.out.println("❌ Transfer Failed!");
                    }

                    break;

                case 4:

                    System.out.print("Enter Account ID: ");
                    int accId = Integer.parseInt(sc.nextLine());

                    List<Transaction> list = transactionService.getStatement(accId);

                    if (list.isEmpty()) {
                        System.out.println("No transactions found!");
                    } else {

                        System.out.println("\n========== MINI STATEMENT ==========");

                        for (Transaction t : list) {

                            System.out.println("----------------------------------------");
                            System.out.println("Transaction ID : " + t.getTransactionId());
                            System.out.println("Type           : " + t.getTransactionType());
                            System.out.println("Amount         : ₹" + t.getAmount());
                            System.out.println("Date           : " + t.getTransactionDate());
                        }
                    }

                    break;
                case 5:

                    System.out.print("Enter Account ID: ");
                    int fullAccId = Integer.parseInt(sc.nextLine());

                    List<Transaction> allTransactions =
                            transactionService.getStatement(fullAccId);

                    if (allTransactions.isEmpty()) {

                        System.out.println("No Transactions Found!");

                    } else {

                        System.out.println("\n========== FULL STATEMENT ==========");

                        System.out.printf("%-5s %-15s %-12s %-25s%n",
                                "ID",
                                "TYPE",
                                "AMOUNT",
                                "DATE");

                        System.out.println("--------------------------------------------------------------");

                        for (Transaction t : allTransactions) {

                            System.out.printf("%-5d %-15s ₹%-10.2f %-25s%n",
                                    t.getTransactionId(),
                                    t.getTransactionType(),
                                    t.getAmount(),
                                    t.getTransactionDate());
                        }
                    }

                    break;

                case 6:
                    return;

                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}