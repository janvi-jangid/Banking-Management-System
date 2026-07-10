package com.binarybrains.service;

import com.binarybrains.entity.Account;
import com.binarybrains.entity.Transaction;
import com.binarybrains.repository.AccountRepository;
import com.binarybrains.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    // Deposit Money
    @Transactional
    public Transaction deposit(Long accountId, Double amount) {

        validateAmount(amount);

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(getBalance(account) + amount);
        accountRepository.save(account);

        return saveTransaction(account, amount, "DEPOSIT");
    }

    // Withdraw Money
    @Transactional
    public Transaction withdraw(Long accountId, Double amount) {

        validateAmount(amount);

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (getBalance(account) < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        account.setBalance(getBalance(account) - amount);
        accountRepository.save(account);

        return saveTransaction(account, amount, "WITHDRAW");
    }

    // Get All Transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Transactional
    public void transfer(Long fromAccountId, Long toAccountId, Double amount) {

        validateAmount(amount);

        if (fromAccountId.equals(toAccountId)) {
            throw new RuntimeException("Source and destination accounts must be different");
        }

        Account fromAccount = accountRepository.findById(fromAccountId)
                .orElseThrow(() -> new RuntimeException("Source account not found"));
        Account toAccount = accountRepository.findById(toAccountId)
                .orElseThrow(() -> new RuntimeException("Destination account not found"));

        if (getBalance(fromAccount) < amount) {
            throw new RuntimeException("Insufficient Balance");
        }

        fromAccount.setBalance(getBalance(fromAccount) - amount);
        toAccount.setBalance(getBalance(toAccount) + amount);

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        saveTransaction(fromAccount, amount, "TRANSFER_OUT");
        saveTransaction(toAccount, amount, "TRANSFER_IN");
    }

    public void deleteTransaction(Long id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transactionRepository.delete(transaction);
    }

    private void validateAmount(Double amount) {
        if (amount == null || amount <= 0) {
            throw new RuntimeException("Amount must be greater than zero");
        }
    }

    private Transaction saveTransaction(Account account, Double amount, String transactionType) {
        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setAmount(amount);
        transaction.setTransactionType(transactionType);
        transaction.setTransactionDate(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    private Double getBalance(Account account) {
        return account.getBalance() == null ? 0.0 : account.getBalance();
    }
}
