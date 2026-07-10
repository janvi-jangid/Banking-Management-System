package com.binarybrains.service;

import com.binarybrains.dao.CustomerDAO;
import com.binarybrains.model.Customer;
import java.util.List;

public class CustomerService {

    private CustomerDAO customerDAO = new CustomerDAO();

    public boolean addCustomer(Customer customer) {

        if (customer.getFullName() == null || customer.getFullName().trim().isEmpty()) {
            System.out.println("❌ Customer name cannot be empty.");
            return false;
        }

        if (!customer.getPhone().matches("\\d{10}")) {
            System.out.println("❌ Phone number must contain exactly 10 digits.");
            return false;
        }

        if (!customer.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            System.out.println("❌ Invalid email address.");
            return false;
        }

        if (!customer.getAadharNumber().matches("\\d{12}")) {
            System.out.println("❌ Aadhar number must contain exactly 12 digits.");
            return false;
        }

        return customerDAO.addCustomer(customer);
    }
    public List<Customer> getAllCustomers() {
        return customerDAO.getAllCustomers();
    }

    public Customer getCustomerById(int customerId) {
        return customerDAO.getCustomerById(customerId);
    }

    public boolean updateCustomer(Customer customer) {

        if (customer.getFullName() == null || customer.getFullName().trim().isEmpty()) {
            System.out.println("❌ Customer name cannot be empty.");
            return false;
        }

        if (!customer.getPhone().matches("\\d{10}")) {
            System.out.println("❌ Phone number must contain exactly 10 digits.");
            return false;
        }

        if (!customer.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            System.out.println("❌ Invalid email address.");
            return false;
        }

        if (!customer.getAadharNumber().matches("\\d{12}")) {
            System.out.println("❌ Aadhar number must contain exactly 12 digits.");
            return false;
        }

        return customerDAO.updateCustomer(customer);
    }

    public boolean deleteCustomer(int id) {
        return customerDAO.deleteCustomer(id);
    }
}