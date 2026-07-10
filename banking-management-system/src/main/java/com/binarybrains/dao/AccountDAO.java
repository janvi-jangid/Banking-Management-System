package com.binarybrains.dao;

import com.binarybrains.config.DBConnection;
import com.binarybrains.model.Account;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;

public class AccountDAO {

    public String generateAccountNumber() {
        return "AC" + System.currentTimeMillis();
    }

    public boolean createAccount(Account acc) {

        String sql = "INSERT INTO accounts(account_number, customer_id, account_type, balance) VALUES (?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, acc.getAccountNumber());
            ps.setInt(2, acc.getCustomerId());
            ps.setString(3, acc.getAccountType());
            ps.setDouble(4, acc.getBalance());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public List<Account> getAllAccounts() {

        List<Account> list = new ArrayList<>();

        String sql = "SELECT * FROM accounts";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Account acc = new Account();

                acc.setAccountId(rs.getInt("account_id"));
                acc.setAccountNumber(rs.getString("account_number"));
                acc.setCustomerId(rs.getInt("customer_id"));
                acc.setAccountType(rs.getString("account_type"));
                acc.setBalance(rs.getDouble("balance"));

                list.add(acc);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }

    public boolean updateBalance(int accountId, double newBalance) {

        String sql = "UPDATE accounts SET balance = ? WHERE account_id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setDouble(1, newBalance);
            ps.setInt(2, accountId);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public Account getAccountById(int accountId) {

        String sql = "SELECT * FROM accounts WHERE account_id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Account acc = new Account();

                acc.setAccountId(rs.getInt("account_id"));
                acc.setAccountNumber(rs.getString("account_number"));
                acc.setCustomerId(rs.getInt("customer_id"));
                acc.setAccountType(rs.getString("account_type"));
                acc.setBalance(rs.getDouble("balance"));

                return acc;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    // SEARCH ACCOUNT
    public Account searchAccount(int accountId) {

        String sql = "SELECT * FROM accounts WHERE account_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Account acc = new Account();

                acc.setAccountId(rs.getInt("account_id"));
                acc.setAccountNumber(rs.getString("account_number"));
                acc.setCustomerId(rs.getInt("customer_id"));
                acc.setAccountType(rs.getString("account_type"));
                acc.setBalance(rs.getDouble("balance"));

                return acc;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public List<Account> getAccountsByCustomerId(int customerId) {

        List<Account> list = new ArrayList<>();

        String sql = "SELECT * FROM accounts WHERE customer_id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, customerId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Account acc = new Account();

                acc.setAccountId(rs.getInt("account_id"));
                acc.setAccountNumber(rs.getString("account_number"));
                acc.setCustomerId(rs.getInt("customer_id"));
                acc.setAccountType(rs.getString("account_type"));
                acc.setBalance(rs.getDouble("balance"));

                list.add(acc);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    public boolean updateAccount(Account account) {

        String sql = "UPDATE accounts SET customer_id=?, account_type=?, balance=? WHERE account_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, account.getCustomerId());
            ps.setString(2, account.getAccountType());
            ps.setDouble(3, account.getBalance());
            ps.setInt(4, account.getAccountId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteAccount(int accountId) {

        String sql = "DELETE FROM accounts WHERE account_id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public Account getAccountByNumber(String accountNumber) {

        String sql = "SELECT * FROM accounts WHERE account_number = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, accountNumber);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Account acc = new Account();

                acc.setAccountId(rs.getInt("account_id"));
                acc.setAccountNumber(rs.getString("account_number"));
                acc.setCustomerId(rs.getInt("customer_id"));
                acc.setAccountType(rs.getString("account_type"));
                acc.setBalance(rs.getDouble("balance"));

                return acc;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean customerHasAccounts(int customerId) {

        String sql = "SELECT account_id FROM accounts WHERE customer_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, customerId);

            ResultSet rs = ps.executeQuery();

            return rs.next();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}