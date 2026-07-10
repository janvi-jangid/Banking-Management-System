package com.binarybrains.service;

import com.binarybrains.entity.Account;
import com.binarybrains.entity.Customer;
import com.binarybrains.repository.AccountRepository;
import com.binarybrains.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;

    public AccountService(AccountRepository accountRepository,
                          CustomerRepository customerRepository) {
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
    }

    public Account createAccount(Account account) {

        validateAccount(account);

        Long customerId = account.getCustomer().getId();

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        account.setCustomer(customer);

        if (account.getBalance() == null) {
            account.setBalance(0.0);
        }

        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {

        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

    }

    public Account updateAccount(Long id, Account updatedAccount) {

        validateAccount(updatedAccount);

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setAccountNumber(updatedAccount.getAccountNumber());
        account.setAccountType(updatedAccount.getAccountType());
        account.setBalance(updatedAccount.getBalance());

        if (updatedAccount.getCustomer() != null) {

            Long customerId = updatedAccount.getCustomer().getId();

            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

            account.setCustomer(customer);
        }

        return accountRepository.save(account);

    }

    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        accountRepository.delete(account);
    }

    private void validateAccount(Account account) {
        if (account.getCustomer() == null || account.getCustomer().getId() == null) {
            throw new RuntimeException("Customer is required");
        }

        if (account.getAccountNumber() == null || account.getAccountNumber().isBlank()) {
            throw new RuntimeException("Account number is required");
        }

        if (account.getAccountType() == null || account.getAccountType().isBlank()) {
            throw new RuntimeException("Account type is required");
        }

        if (account.getBalance() != null && account.getBalance() < 0) {
            throw new RuntimeException("Balance cannot be negative");
        }
    }
}
