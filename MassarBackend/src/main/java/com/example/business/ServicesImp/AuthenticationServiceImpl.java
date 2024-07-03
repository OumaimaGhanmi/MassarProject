package com.example.business.ServicesImp;

import org.springframework.stereotype.Service;

import com.example.Exception.DuplicateParticipantException;
import com.example.business.Services.AuthenticationService;
import com.example.dao.Enums.RoleEnum;
import com.example.dao.Repository.ParticipantRepository;
import com.example.dao.entities.Admin;
import com.example.dao.entities.Participant;
import com.example.dao.entities.Randonneur;
import com.example.web.dto.AuthenticationUserDTO;
import com.example.web.dto.RegisterUserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;



@Service
public class AuthenticationServiceImpl implements AuthenticationService {
@Autowired
ParticipantRepository participantrep;
    @Override
    public Participant register(RegisterUserDto registerUserDto, PasswordEncoder passwordEncoder) throws DuplicateParticipantException {
        // Créer un nouvel objet Participant à partir du DTO
        Participant participant = RegisterUserDto.fromRegisterUserDTO(registerUserDto, passwordEncoder);
        
        // Définir le rôle du participant
        participant.setRole(RoleEnum.Participant);

        // Enregistrer le participant dans la base de données
        try {
            return participantrep.save(participant);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateParticipantException("User already exists");
        }
    }

    @Override
    public AuthenticationUserDTO login(Authentication authentication) {
        if (authentication == null) {
            throw new IllegalArgumentException("Authentication object is null");
        }
    
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof UserDetails)) {
            throw new IllegalArgumentException("Principal is not an instance of UserDetails");
        }
    
        UserDetails user = (UserDetails) principal;
    
        if (user instanceof Participant) {
            return AuthenticationUserDTO.toAuthenticationUserDTO((Participant) user);
        } else if (user instanceof Admin) {
            return AuthenticationUserDTO.toAuthenticationUserDTO((Admin) user);
        } else if (user instanceof Randonneur) {
            return AuthenticationUserDTO.toAuthenticationUserDTO((Randonneur) user);
        } else {
            throw new IllegalArgumentException("Unsupported user type");
        }
    }
    
   
}