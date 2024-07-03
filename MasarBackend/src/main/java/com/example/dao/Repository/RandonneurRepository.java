
package com.example.dao.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dao.entities.Randonneur;

import java.util.List;
import java.util.Optional;
@Repository
public interface RandonneurRepository extends JpaRepository<Randonneur, Long> {
    Optional<Randonneur> findByEmail(String email);
   
	
	List<Randonneur> findByAdresse(String address);
}