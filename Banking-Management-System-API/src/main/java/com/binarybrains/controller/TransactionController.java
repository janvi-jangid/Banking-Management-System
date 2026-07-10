package com.binarybrains.controller;

import com.binarybrains.entity.Transaction;
import com.binarybrains.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
})
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Deposit Money
    @PostMapping("/deposit")
    public Transaction deposit(@RequestParam Long accountId,
                               @RequestParam Double amount) {

        return transactionService.deposit(accountId, amount);
    }

    // Withdraw Money
    @PostMapping("/withdraw")
    public Transaction withdraw(@RequestParam Long accountId,
                                @RequestParam Double amount) {

        return transactionService.withdraw(accountId, amount);
    }


    // Get All Transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping("/transfer")
    public String transfer(@RequestParam Long fromAccountId,
                           @RequestParam Long toAccountId,
                           @RequestParam Double amount) {

        transactionService.transfer(fromAccountId, toAccountId, amount);

        return "Money Transferred Successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {

        transactionService.deleteTransaction(id);

        return "Transaction Deleted Successfully";
    }
}
