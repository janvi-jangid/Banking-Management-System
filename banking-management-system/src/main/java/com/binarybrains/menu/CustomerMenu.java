package com.binarybrains.menu;

import com.binarybrains.service.AccountService;
import com.binarybrains.service.CustomerService;
import com.binarybrains.model.Customer;
import java.util.Scanner;

import java.util.List;


public class CustomerMenu {

    Scanner sc = new Scanner(System.in);
    CustomerService customerService = new CustomerService();

    public void customerMenu() {

        while (true) {

            System.out.println("\n========== CUSTOMER MENU ==========");
            System.out.println("1. Add Customer");
            System.out.println("2. View All Customers");
            System.out.println("3. Search Customer");
            System.out.println("4. Update Customer");
            System.out.println("5. Delete Customer");
            System.out.println("6. Back");

            System.out.print("Enter your choice: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:

                    Customer customer = new Customer();

                    System.out.print("Enter Full Name: ");
                    customer.setFullName(sc.nextLine());

                    System.out.print("Enter Phone: ");
                    customer.setPhone(sc.nextLine());

                    System.out.print("Enter Email: ");
                    customer.setEmail(sc.nextLine());

                    System.out.print("Enter Address: ");
                    customer.setAddress(sc.nextLine());

                    System.out.print("Enter Aadhar Number: ");
                    customer.setAadharNumber(sc.nextLine());

                    if (customerService.addCustomer(customer)) {
                        System.out.println("\n✅ Customer Added Successfully!");
                    } else {
                        System.out.println("\n❌ Failed to Add Customer!");
                    }

                    break;

                case 2:

                    List<Customer> customers = customerService.getAllCustomers();

                    System.out.println("\n========== CUSTOMER LIST ==========");

                    if (customers.isEmpty()) {
                        System.out.println("No customers found.");
                    } else {

                        for (Customer c : customers) {

                            System.out.println("-----------------------------------");
                            System.out.println("Customer ID : " + c.getCustomerId());
                            System.out.println("Name        : " + c.getFullName());
                            System.out.println("Phone       : " + c.getPhone());
                            System.out.println("Email       : " + c.getEmail());
                            System.out.println("Address     : " + c.getAddress());
                            System.out.println("Aadhar      : " + c.getAadharNumber());
                        }
                    }

                    break;

                case 3:

                    System.out.print("Enter Customer ID: ");
                    int id = sc.nextInt();
                    sc.nextLine();

                    Customer searchedCustomer = customerService.getCustomerById(id);

                    if (searchedCustomer != null) {

                        System.out.println("\n========== CUSTOMER DETAILS ==========");

                        System.out.println("Customer ID : " + searchedCustomer.getCustomerId());
                        System.out.println("Name        : " + searchedCustomer.getFullName());
                        System.out.println("Phone       : " + searchedCustomer.getPhone());
                        System.out.println("Email       : " + searchedCustomer.getEmail());
                        System.out.println("Address     : " + searchedCustomer.getAddress());
                        System.out.println("Aadhar      : " + searchedCustomer.getAadharNumber());

                    } else {

                        System.out.println("\nCustomer not found.");

                    }

                    break;

                case 4:

                    System.out.print("Enter Customer ID to Update: ");
                    int updateId = sc.nextInt();
                    sc.nextLine();

                    Customer updateCustomer = customerService.getCustomerById(updateId);

                    if (updateCustomer != null) {

                        System.out.print("Enter New Full Name: ");
                        updateCustomer.setFullName(sc.nextLine());

                        System.out.print("Enter New Phone: ");
                        updateCustomer.setPhone(sc.nextLine());

                        System.out.print("Enter New Email: ");
                        updateCustomer.setEmail(sc.nextLine());

                        System.out.print("Enter New Address: ");
                        updateCustomer.setAddress(sc.nextLine());

                        System.out.print("Enter New Aadhar Number: ");
                        updateCustomer.setAadharNumber(sc.nextLine());

                        if (customerService.updateCustomer(updateCustomer)) {
                            System.out.println("\n✅ Customer Updated Successfully!");
                        } else {
                            System.out.println("\n❌ Failed to Update Customer!");
                        }

                    } else {

                        System.out.println("\nCustomer not found.");

                    }

                    break;

                case 5:

                    System.out.print("Enter Customer ID to Delete: ");
                    int deleteId = Integer.parseInt(sc.nextLine());

                    AccountService accountService = new AccountService();

                    if (accountService.customerHasAccounts(deleteId)) {

                        System.out.println("❌ Cannot delete customer.");
                        System.out.println("Customer has one or more bank accounts.");

                        break;
                    }

                    boolean deleted = customerService.deleteCustomer(deleteId);

                    if (deleted) {
                        System.out.println("✅ Customer Deleted Successfully!");
                    } else {
                        System.out.println("❌ Customer Not Found!");
                    }

                    break;

                case 6:
                    return;

                default:
                    System.out.println("Invalid Choice!");

            }

        }

    }

}