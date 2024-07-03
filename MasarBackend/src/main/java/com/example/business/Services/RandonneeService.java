package com.example.business.Services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.Exception.DuplicateRandonneurException;
import com.example.dao.entities.Randonnee;

public interface RandonneeService {
    //operation getAllRandonnees
    public List<Randonnee> getAllRandonnees();
    public Randonnee getRandonneeById(Long idRandonnee);
    //operation deleteRandonnee
    public void deleteRandonnee(Long idRandonnee);
    //operation addRandonnee
    public Randonnee addRandonnee(Randonnee randonnee) throws DuplicateRandonneurException;
    
    //update Randonnee   
    public Randonnee updateRandonnee(Randonnee randonnee, Long idRandonnee) throws DuplicateRandonneurException; 
    //operation upload image for randonnees
    Randonnee uploadImageRandonnee(Long idRandonnee, MultipartFile image);
}