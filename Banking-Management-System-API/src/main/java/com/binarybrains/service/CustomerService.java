package com.binarybrains.service;

import com.binarybrains.entity.Customer;
import com.binarybrains.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // Save Customer
    public Customer saveCustomer(Customer customer) {
        validateCustomer(customer);
        return customerRepository.save(customer);
    }

    // Get All Customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get Customer By Id
    public Customer getCustomerById(Long id) {

        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

    }

    // Update Customer
    public Customer updateCustomer(Long id, Customer updatedCustomer) {

        validateCustomer(updatedCustomer);

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        customer.setName(updatedCustomer.getName());
        customer.setPhone(updatedCustomer.getPhone());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setAddress(updatedCustomer.getAddress());
        customer.setAadhar(updatedCustomer.getAadhar());

        return customerRepository.save(customer);

    }

    // Delete Customer
    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        if (customer.getAccounts() != null &&
                !customer.getAccounts().isEmpty()) {

            throw new RuntimeException(
                    "Cannot delete customer with active accounts."
            );

        }

        customerRepository.delete(customer);

    }

    private void validateCustomer(Customer customer) {
        if (customer.getName() == null || customer.getName().isBlank()) {
            throw new RuntimeException("Customer name is required");
        }

        if (customer.getPhone() == null || customer.getPhone().isBlank()) {
            throw new RuntimeException("Phone number is required");
        }

        if (customer.getEmail() == null || customer.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (customer.getAddress() == null || customer.getAddress().isBlank()) {
            throw new RuntimeException("Address is required");
        }

        if (customer.getAadhar() == null || customer.getAadhar().isBlank()) {
            throw new RuntimeException("Aadhar number is required");
        }
    }

}
