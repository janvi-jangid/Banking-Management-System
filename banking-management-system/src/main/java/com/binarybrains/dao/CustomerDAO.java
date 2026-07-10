package com.binarybrains.dao;

import com.binarybrains.config.DBConnection;
import com.binarybrains.model.Customer;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CustomerDAO {

    public boolean addCustomer(Customer customer) {

        String sql = "INSERT INTO customers(full_name, phone, email, address, aadhar_number) VALUES (?, ?, ?, ?, ?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, customer.getFullName());
            ps.setString(2, customer.getPhone());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getAddress());
            ps.setString(5, customer.getAadharNumber());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public List<Customer> getAllCustomers() {

        List<Customer> customers = new ArrayList<>();

        String sql = "SELECT * FROM customers";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                Customer customer = new Customer();

                customer.setCustomerId(rs.getInt("customer_id"));
                customer.setFullName(rs.getString("full_name"));
                customer.setPhone(rs.getString("phone"));
                customer.setEmail(rs.getString("email"));
                customer.setAddress(rs.getString("address"));
                customer.setAadharNumber(rs.getString("aadhar_number"));

                customers.add(customer);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return customers;
    }
    public Customer getCustomerById(int customerId) {

        String sql = "SELECT * FROM customers WHERE customer_id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, customerId);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Customer customer = new Customer();

                customer.setCustomerId(rs.getInt("customer_id"));
                customer.setFullName(rs.getString("full_name"));
                customer.setPhone(rs.getString("phone"));
                customer.setEmail(rs.getString("email"));
                customer.setAddress(rs.getString("address"));
                customer.setAadharNumber(rs.getString("aadhar_number"));

                return customer;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean updateCustomer(Customer customer) {

        String sql = "UPDATE customers SET full_name=?, phone=?, email=?, address=?, aadhar_number=? WHERE customer_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, customer.getFullName());
            ps.setString(2, customer.getPhone());
            ps.setString(3, customer.getEmail());
            ps.setString(4, customer.getAddress());
            ps.setString(5, customer.getAadharNumber());
            ps.setInt(6, customer.getCustomerId());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteCustomer(int id) {

        String sql = "DELETE FROM customers WHERE customer_id = ?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean customerExists(int customerId) {

        String sql = "SELECT customer_id FROM customers WHERE customer_id=?";

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