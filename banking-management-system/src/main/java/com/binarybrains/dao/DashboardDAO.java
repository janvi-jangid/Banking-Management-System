package com.binarybrains.dao;

import com.binarybrains.config.DBConnection;
import com.binarybrains.model.Dashboard;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DashboardDAO {

    public Dashboard getDashboardData() {

        Dashboard dashboard = new Dashboard();

        try (Connection con = DBConnection.getConnection()) {

            // Total Customers
            PreparedStatement ps1 = con.prepareStatement(
                    "SELECT COUNT(*) FROM customers");
            ResultSet rs1 = ps1.executeQuery();
            if (rs1.next()) {
                dashboard.setTotalCustomers(rs1.getInt(1));
            }

            // Total Accounts
            PreparedStatement ps2 = con.prepareStatement(
                    "SELECT COUNT(*) FROM accounts");
            ResultSet rs2 = ps2.executeQuery();
            if (rs2.next()) {
                dashboard.setTotalAccounts(rs2.getInt(1));
            }

            // Total Users
            PreparedStatement ps3 = con.prepareStatement(
                    "SELECT COUNT(*) FROM users");
            ResultSet rs3 = ps3.executeQuery();
            if (rs3.next()) {
                dashboard.setTotalUsers(rs3.getInt(1));
            }

            // Total Transactions
            PreparedStatement ps4 = con.prepareStatement(
                    "SELECT COUNT(*) FROM transactions");
            ResultSet rs4 = ps4.executeQuery();
            if (rs4.next()) {
                dashboard.setTotalTransactions(rs4.getInt(1));
            }

            // Total Balance
            PreparedStatement ps5 = con.prepareStatement(
                    "SELECT SUM(balance) FROM accounts");
            ResultSet rs5 = ps5.executeQuery();
            if (rs5.next()) {
                dashboard.setTotalBalance(rs5.getDouble(1));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return dashboard;
    }
}