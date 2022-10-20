package com.expanse.codecool.ExpanseApplication.controller;


import com.expanse.codecool.ExpanseApplication.entity.Saving;
import com.expanse.codecool.ExpanseApplication.entity.SavingGoal;
import com.expanse.codecool.ExpanseApplication.service.BalanceService;
import com.expanse.codecool.ExpanseApplication.service.SavingGoalService;
import com.expanse.codecool.ExpanseApplication.service.SavingService;
import com.expanse.codecool.ExpanseApplication.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/savings")
public class SavingsController {

    private final SavingService savingService;
    private final BalanceService balanceService;

    private final SavingGoalService savingGoalService;

    public SavingsController(SavingService savingService, TransactionService transactionService, BalanceService balanceService, SavingGoalService savingGoalService) {
        this.savingService = savingService;
        this.balanceService = balanceService;
        this.savingGoalService = savingGoalService;
    }

    @GetMapping
    public Long savingBalance(){
        return savingService.getSavingAmount();
    }


    @GetMapping(value="/getall")
    public List<Saving> getAll(){
        return savingService.getAll();
    }


    @PostMapping(value="/add")
    public void addToSaving(@RequestParam long amount){
        Long updateAmount = savingService.getSavingAmount() + amount;
        savingService.updateSaving(updateAmount);
        balanceService.updateBalance(balanceService.getBalance() - amount);
    }


    @PostMapping(value="/deduct")
    public void removeFromSaving(@RequestParam long amount){
        Long updateAmount = savingService.getSavingAmount() - amount;
        savingService.updateSaving(updateAmount);
        balanceService.updateBalance(balanceService.getBalance() + amount);
    }

    @PostMapping(value="/setsavings")
    public void userSaving(@RequestParam Long amount){
        Saving newSaving = new Saving(amount);
        savingService.save(newSaving);
    }


    @GetMapping(value="/saving-goals")
    public List<SavingGoal> getGoal(){
        return savingGoalService.getAll();
    }

    @PostMapping(value="saving-goals")
    public void save(@RequestBody SavingGoal savingGoal) {
        savingGoalService.save(savingGoal);
    }



}