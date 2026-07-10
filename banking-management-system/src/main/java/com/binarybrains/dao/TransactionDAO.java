package com.binarybrains.dao;

import com.binarybrains.config.DBConnection;
import com.binarybrains.model.Transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TransactionDAO {

    public boolean addTransaction(int accountId, String type, double amount) {

        String sql = "INSERT INTO transactions(account_id, transaction_type, amount) VALUES (?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);
            ps.setString(2, type);
            ps.setDouble(3, amount);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
    public List<Transaction> getTransactionsByAccount(int accountId) {

        ArrayList<Transaction> list = new ArrayList<>();

        String sql = "SELECT * FROM transactions WHERE account_id = ? ORDER BY transaction_date DESC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Transaction t = new Transaction();

                t.setTransactionId(rs.getInt("transaction_id"));
                t.setAccountId(rs.getInt("account_id"));
                t.setTransactionType(rs.getString("transaction_type"));
                t.setAmount(rs.getDouble("amount"));
                t.setTransactionDate(rs.getTimestamp("transaction_date"));

                list.add(t);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    public List<Transaction> getMiniStatement(int accountId) {

        List<Transaction> list = new ArrayList<>();

        String sql = "SELECT * FROM transactions WHERE account_id = ? ORDER BY transaction_date DESC LIMIT 5";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Transaction t = new Transaction();

                t.setTransactionId(rs.getInt("transaction_id"));
                t.setAccountId(rs.getInt("account_id"));
                t.setTransactionType(rs.getString("transaction_type"));
                t.setAmount(rs.getDouble("amount"));
                t.setTransactionDate(rs.getTimestamp("transaction_date"));

                list.add(t);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    public List<Transaction> getRecentTransactions() {

        List<Transaction> list = new ArrayList<>();

        String sql = "SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT 5";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Transaction t = new Transaction();

                t.setTransactionId(rs.getInt("transaction_id"));
                t.setAccountId(rs.getInt("account_id"));
                t.setTransactionType(rs.getString("transaction_type"));
                t.setAmount(rs.getDouble("amount"));
                t.setTransactionDate(rs.getTimestamp("transaction_date"));

                list.add(t);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    public boolean accountHasTransactions(int accountId) {

        String sql = "SELECT transaction_id FROM transactions WHERE account_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, accountId);

            ResultSet rs = ps.executeQuery();

            return rs.next();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }


}