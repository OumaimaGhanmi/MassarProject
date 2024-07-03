package com.example.web.Controllers;
import org.springframework.web.bind.annotation.RestController;

import com.example.Exception.DuplicateRandonneurException;
import com.example.business.Services.RandonneurService;
import com.example.dao.Enums.RoleEnum;
import com.example.dao.entities.Randonneur;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController

public class RandonneurController {
    private final RandonneurService randonneurService;
     @Autowired
	 PasswordEncoder passwordEncoder;
    public RandonneurController(RandonneurService randonneurService) {
        this.randonneurService = randonneurService;
    }

    @GetMapping("getAllRandonneurs")
    
  
	
	public List<Randonneur> getAllRandonneur() {
		
		return randonneurService.getAllRandonneurs();
	}
    @DeleteMapping("/deleteRandonneur/{idRandonneur}")
	
		public void DeleteRandonneur(@PathVariable("idRandonneur") Long idRandonneur) {
			randonneurService.deleteRandonneur(idRandonneur);
		}
        @PostMapping("/addUser")
	
		public Randonneur addRandonneur( @RequestBody Randonneur randonneur) throws DuplicateRandonneurException {
		 randonneur.setPassword(passwordEncoder.encode("password"));
		    randonneur.setRole(RoleEnum.Randonneur);
			return randonneurService.addRandonneur(randonneur);
		}

	
}
