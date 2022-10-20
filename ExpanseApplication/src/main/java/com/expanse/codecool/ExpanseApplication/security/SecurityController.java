package com.expanse.codecool.ExpanseApplication.security;

import com.expanse.codecool.ExpanseApplication.service.PersonService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class SecurityController {
    private final SecurityUserDetailsService userDetailsManager;
    private final PersonService personService;
    private final UserRepository userRepository;
    private final SecurityUserDetailsService securityUserDetailsService;

    public SecurityController(SecurityUserDetailsService userDetailsManager, PersonService personService, UserRepository userRepository, SecurityUserDetailsService securityUserDetailsService) {
        this.userDetailsManager = userDetailsManager;
        this.personService = personService;
        this.userRepository = userRepository;
        this.securityUserDetailsService = securityUserDetailsService;
    }

    @PostMapping("/login")
    public String login(@RequestBody Person person, HttpSession session) {
        UserDetails personByUsername = securityUserDetailsService.loadUserByUsername(person.getUsername());
        personService.passwordVerfication(person.getPassword(), personByUsername);
        session.setAttribute("username", personByUsername.getUsername());
        System.out.println(personByUsername);
        List<Person> people = userRepository.findAll();
        System.out.println(people);
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping(
            value = "/register"//,
            //        consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = {
            //        MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public void addUser(@RequestBody Person person) {
        System.out.println("Before save:" + person);
        person = personService.save(person);
        System.out.println("After save:" + person);
    }

    private String getErrorMessage(HttpServletRequest request) {
        Exception exception = (Exception) request.getSession().getAttribute("SPRING_SECURITY_LAST_EXCEPTION");
        String error = "";
        if (exception instanceof BadCredentialsException) {
            error = "Invalid username and password!";
        } else if (exception instanceof LockedException) {
            error = exception.getMessage();
        } else {
            error = "Invalid username and password!";
        }
        return error;
    }
}
