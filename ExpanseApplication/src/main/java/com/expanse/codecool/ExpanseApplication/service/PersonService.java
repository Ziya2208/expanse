package com.expanse.codecool.ExpanseApplication.service;

import com.expanse.codecool.ExpanseApplication.security.Person;
import com.expanse.codecool.ExpanseApplication.security.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

    public PersonService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Person save(Person person) {
        String encodedPassword = passwordEncoder.encode(person.getPassword());
        person.setPassword(encodedPassword);
        return userRepository.save(person);
    }

    public void passwordVerfication(String password, UserDetails person){
        boolean passwordVerification = passwordEncoder.matches(password, person.getPassword());

        if(!passwordVerification){
            throw new UsernameNotFoundException("Password Invalid");
        }

    }
}
