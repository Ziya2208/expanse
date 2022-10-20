package com.expanse.codecool.ExpanseApplication.controller;


import com.expanse.codecool.ExpanseApplication.entity.Categories;
import com.expanse.codecool.ExpanseApplication.entity.Transaction;
import com.expanse.codecool.ExpanseApplication.entity.type.TransactionType;
import com.expanse.codecool.ExpanseApplication.service.BalanceService;
import com.expanse.codecool.ExpanseApplication.service.CategoriesService;
import com.expanse.codecool.ExpanseApplication.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value="/transaction")
public class TransactionsController {

    private final TransactionService transactionService;
    private final CategoriesService categoriesService;
    private final BalanceService balanceService;


    public TransactionsController(TransactionService transactionService, CategoriesService categoriesService, BalanceService balanceService) {
        this.transactionService = transactionService;
        this.categoriesService = categoriesService;
        this.balanceService = balanceService;
    }

    @GetMapping
    public List<Transaction> transactionTable(){
        return transactionService.fetchTransactions();
    }

    @PutMapping(value="/addexpense")
    @ResponseBody
    public void addExpense(@RequestParam String title, String category, Long amount) throws Exception {
        LocalDate date = LocalDate.now();
        Transaction transaction = new Transaction(title, category, date, amount, TransactionType.EXPENSE);
        transactionService.saveTransaction(transaction);
        if(!categoriesService.checkForDuplicate(category)){
            Categories newCategory = new Categories(category, amount);
            categoriesService.save(newCategory);
        }
        else {
            Categories categoryToUpdate = categoriesService.getCategory(category);
            long newAmount = categoryToUpdate.getAmount() + amount;
            categoriesService.updateCategoryAmount(newAmount, category);
        }
        Long amountUpdate = balanceService.getBalance() - amount;
        System.out.println('b' + amountUpdate);
        balanceService.updateBalance(amountUpdate);
    }


    @PutMapping(value="/addincome")
    public void addIncome(@RequestParam String title, String category, Long amount){
        LocalDate date = LocalDate.now();
        Transaction transaction = new Transaction(title, category, date, amount, TransactionType.INCOME);
        transactionService.saveTransaction(transaction);
        Long amountUpdate = balanceService.getBalance() + amount;
        System.out.println('b' + amountUpdate);
        balanceService.updateBalance(amountUpdate);
    }


    @GetMapping(value="/incomes")
    public List<Transaction> transactionIncomes(){
        return transactionService.fetchIncomes();
    }

    @GetMapping(value="/expenses")
    public List<Transaction> transactionExpenses(){
        return transactionService.fetchExpenses();
    }

    @GetMapping(value="/expensesvalue")
    public Long transactionExpensesValue(){
        return transactionService.sumExpenses();
    }

    @GetMapping(value="/incomesvalue")
    public Long transactionIncomesValue(){
        return transactionService.sumIncomes();
    }
}