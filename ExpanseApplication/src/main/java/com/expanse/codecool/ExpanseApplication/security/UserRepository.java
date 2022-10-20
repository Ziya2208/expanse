package com.expanse.codecool.ExpanseApplication.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Person, String> {

    List<Person> findAll();

    Optional<Person> findUserByUsername(String username);
    Person findPasswordByUsername(String username);

}
