package com.expanse.codecool.ExpanseApplication.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/user")
public class UserController {


    @GetMapping
    public String userInformation(){
        return null;
    }
}
