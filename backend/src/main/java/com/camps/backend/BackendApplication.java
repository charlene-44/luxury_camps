// backend\src\main\java\com\camps\backend\BackendApplication.java

package com.camps.backend;

import me.paulschwarz.springdotenv.DotenvPropertySource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;


@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();

		// Add DotenvPropertySource to environment before registering components
    	DotenvPropertySource.addToEnvironment(applicationContext.getEnvironment());

		applicationContext.register(Config.class);
    	applicationContext.refresh();

		SpringApplication.run(BackendApplication.class, args);
	}
}
