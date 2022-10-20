package com.expanse.codecool.ExpanseApplication.controller;


import com.expanse.codecool.ExpanseApplication.entity.Balance;
import com.expanse.codecool.ExpanseApplication.service.BalanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/finances")
public class AmountsController {


    private final BalanceService balanceService;

    public AmountsController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping(value="/balance")
    public Long userBalance(){
        return balanceService.getBalance();
    }

    @PostMapping(value="/setbalance")
    public void userBalance(@RequestParam Long amount){
        Balance newBalance = new Balance(amount);
        balanceService.save(newBalance);
    }

    /*@CrossOrigin
    @GetMapping(value="/totalIncome")
    public String userIncome(){
        return "total Income";
    }

    @CrossOrigin
    @GetMapping(value="/totalExpense")
    public String userExpense(){
        return "total Expense";
    }*/
}