package com.binarybrains.controller;

import com.binarybrains.entity.Account;
import com.binarybrains.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001"
})
@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable Long id,
                                 @RequestBody Account account) {
        return accountService.updateAccount(id, account);
    }

    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id);
    }


    @DeleteMapping("/{id}")
    public String deleteAccount(@PathVariable Long id) {

        accountService.deleteAccount(id);

        return "Account Deleted Successfully";
    }
}
