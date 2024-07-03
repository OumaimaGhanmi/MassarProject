package com.example.dao.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.dao.entities.FeedBack;

public interface FeedBackRepository extends JpaRepository<FeedBack,Long>{
    
}