package com.binarybrains.menu;

import com.binarybrains.model.Dashboard;
import com.binarybrains.service.DashboardService;

import com.binarybrains.model.Transaction;
import com.binarybrains.service.TransactionService;
import java.util.List;

public class DashboardMenu {

    DashboardService dashboardService = new DashboardService();

    TransactionService transactionService = new TransactionService();
    public void showDashboard() {

        Dashboard dashboard = dashboardService.getDashboardData();

        System.out.println("\n=======================================");
        System.out.println("      BANKING MANAGEMENT SYSTEM");
        System.out.println("          ADMIN DASHBOARD");
        System.out.println("=======================================\n");

        System.out.println("Total Customers     : " + dashboard.getTotalCustomers());
        System.out.println("Total Accounts      : " + dashboard.getTotalAccounts());
        System.out.println("Total Users         : " + dashboard.getTotalUsers());
        System.out.println("Total Transactions  : " + dashboard.getTotalTransactions());
        System.out.println("Total Bank Balance  : ₹" + dashboard.getTotalBalance());

        System.out.println("\n========== RECENT TRANSACTIONS ==========");

        List<Transaction> list = transactionService.getRecentTransactions();

        if (list.isEmpty()) {
            System.out.println("No Transactions Yet.");
        } else {

            System.out.printf("%-5s %-10s %-12s %-25s%n",
                    "ID", "ACC ID", "AMOUNT", "TYPE");

            System.out.println("------------------------------------------------");

            for (Transaction t : list) {

                System.out.printf("%-5d %-10d ₹%-10.2f %-20s%n",
                        t.getTransactionId(),
                        t.getAccountId(),
                        t.getAmount(),
                        t.getTransactionType());
            }
        }

        System.out.println("\n=======================================\n");
    }
}