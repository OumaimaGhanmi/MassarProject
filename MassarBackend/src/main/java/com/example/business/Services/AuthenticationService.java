package com.example.business.Services;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.Exception.DuplicateParticipantException;
import com.example.dao.entities.Participant;
import com.example.web.dto.AuthenticationUserDTO;
import com.example.web.dto.RegisterUserDto;


public interface AuthenticationService {
    Participant register(RegisterUserDto registerUserDto, PasswordEncoder passwordEncoder) throws DuplicateParticipantException;
    AuthenticationUserDTO login(Authentication authentication);
}
