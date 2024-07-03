package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.example.dao.Repository.AdminRepository;
import com.example.dao.entities.Admin;

@Component

@PropertySource("classpath:application.properties")
public class DefaultAdminUserInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;
    
    @Value("${admin.initialized:false}") // Lire la valeur depuis application.properties, par défaut false
    private boolean adminInitialized;

    @Override
    public void run(String... args) throws Exception {
        if (!adminInitialized) {
            String adminEmail = "admin@gmail.com";
            if (adminRepository.findByEmail(adminEmail).isEmpty()) {
                Admin admin = new Admin();
                admin.setEmail(adminEmail);
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setPassword("password");
                // ... autres propriétés

                adminRepository.save(admin);
                System.out.println("Admin user initialized successfully.");
            } else {
                System.out.println("Admin user with email " + adminEmail + " already exists.");
            }
            // Marquer l'initialisation comme terminée
            adminInitialized = true;
        } else {
            System.out.println("Admin user initialization skipped as it has already been done.");
        }
    }
}
