package com.example.business.Services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.Exception.DuplicateRandonneurException;
import com.example.dao.entities.Randonneur;

public interface RandonneurService {
    //operation getAllRandonneurs
    public List<Randonneur> getAllRandonneurs();
    public Randonneur getRandonneurById(Long idRandonneur);
    //operation deleteRandonneur
    public void deleteRandonneur(Long iRandonneur);
    //operation addRandonneur
    public Randonneur addRandonneur(Randonneur  randonneur) throws DuplicateRandonneurException;
    
    //update Randonneur   
    public Randonneur updateRandonneur(Randonneur randonneur,Long idRandonneur) throws DuplicateRandonneurException; 
    //operation upload image for randonneurs
    Randonneur uploadImageRandonneur(Long idRandonneur, MultipartFile image);
}
