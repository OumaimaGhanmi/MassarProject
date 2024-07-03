package com.example.web.Controllers;

import com.example.Exception.DuplicateRandonneurException;
import com.example.business.Services.RandonneeService;
import com.example.dao.entities.Randonnee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RandonneeController {

    private final RandonneeService randonneeService;

    @Autowired
    public RandonneeController(RandonneeService randonneeService) {
        this.randonneeService = randonneeService;
    }

    @GetMapping("/getAllRandonnees")
    public List<Randonnee> getAllRandonnees() {
        return randonneeService.getAllRandonnees();
    }

    @GetMapping("/getRandonnee/{idRandonnee}")
    public ResponseEntity<Randonnee> getRandonneeById(@PathVariable("idRandonnee") Long idRandonnee) {
        Randonnee randonnee = randonneeService.getRandonneeById(idRandonnee);
        if (randonnee != null) {
            return new ResponseEntity<>(randonnee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteRandonnee/{idRandonnee}")
    public ResponseEntity<Void> deleteRandonnee(@PathVariable("idRandonnee") Long idRandonnee) {
        randonneeService.deleteRandonnee(idRandonnee);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/addRandonnee")
    public ResponseEntity<?> addRandonnee(@RequestBody Randonnee randonnee) {
        try {
            Randonnee newRandonnee = randonneeService.addRandonnee(randonnee);
            return new ResponseEntity<>(newRandonnee, HttpStatus.CREATED);
        } catch (DuplicateRandonneurException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    // Additional methods (e.g., updateRandonnee, uploadImageRandonnee) can be added here
}