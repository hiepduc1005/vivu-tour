package com.tour.vn;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tour.vn.entity.Role;
import com.tour.vn.entity.User;
import com.tour.vn.service.RoleService;
import com.tour.vn.service.UserService;

@SpringBootApplication
public class TourappApplication implements CommandLineRunner {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(TourappApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Role roleAdmin = roleService.getRoleByName("ADMIN");
        String adminEmail = "admin@gmail.com";
        if (userService.getUserByEmail(adminEmail) == null) {
            User user = new User();
            user.setEmail(adminEmail);
            user.setPassword(passwordEncoder.encode("admin"));
            user.setName("admin");
            user.setRoles(List.of(roleAdmin));

            userService.createUser(user);
        }
    }
}
