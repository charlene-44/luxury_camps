package com.camps.backend;

import com.camps.backend.services.FurnitureInitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private FurnitureInitService furnitureInitService;

    @Override
    public void run(String... args) {
        furnitureInitService.initializeDatabase();
    }
}