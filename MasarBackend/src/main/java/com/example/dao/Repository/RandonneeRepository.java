package com.example.dao.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.example.dao.entities.Randonnee;

@Repository
public interface RandonneeRepository extends JpaRepository<Randonnee,Long >{

    
   
}