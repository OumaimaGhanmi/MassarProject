package com.example.dao.entities;

import java.util.Date;
import java.util.Set;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Randonnee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRandonnee;

    private String titre;
    private String lieu;
    private Date date;
    private int fraisParticipation;
    private String programme;
    private String methode_paiement;
    private boolean validee; 
    private boolean publiee; 

    @ManyToOne
    private Admin admin; 

    @ManyToOne
    private Randonneur randonneur; 

    @ManyToMany
    @JoinTable(
        name = "randonnee_participant",
        joinColumns = @JoinColumn(name = "idRandonnee"),
        inverseJoinColumns = @JoinColumn(name = "idParticipant")
    )
    private Set<Participant> participants;
}
