package com.binarybrains.model;

public class Customer {

    private int customerId;
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private String aadharNumber;

    public Customer() {
    }

    public Customer(int customerId, String fullName, String phone, String email,
                    String address, String aadharNumber) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.aadharNumber = aadharNumber;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }
}