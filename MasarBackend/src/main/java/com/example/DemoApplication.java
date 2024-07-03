package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.dao.Repository.RandonneurRepository;

import lombok.extern.slf4j.Slf4j;



@SpringBootApplication


@ComponentScan({"com.example","com.example.business","com.example.config","com.example.dao","com.example.Exception","com.example.security","com.example.web"})
public class DemoApplication implements CommandLineRunner {
	
	
public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		
	}

	



}
