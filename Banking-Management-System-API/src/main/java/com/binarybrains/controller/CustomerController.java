package com.binarybrains.controller;

import com.binarybrains.entity.Customer;
import com.binarybrains.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
})
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Add Customer
    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    // Get All Customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Get Customer By Id
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    // Update Customer
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer customer
    ) {
        return customerService.updateCustomer(id, customer);
    }

    // Delete Customer
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {

        customerService.deleteCustomer(id);

        return "Customer Deleted Successfully";
    }

}
