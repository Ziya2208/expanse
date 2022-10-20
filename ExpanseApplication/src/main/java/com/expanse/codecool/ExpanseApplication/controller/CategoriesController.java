package com.expanse.codecool.ExpanseApplication.controller;


import com.expanse.codecool.ExpanseApplication.entity.Categories;
import com.expanse.codecool.ExpanseApplication.service.CategoriesService;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/categories")
public class CategoriesController {

    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }


    @GetMapping
    public List<Categories> categoriesList(){
        return categoriesService.getCategories();
    }

    @GetMapping(value="/four")
    public List<Categories> topFourCategories(){
        return categoriesService.getTopFourCategories();
    }
}