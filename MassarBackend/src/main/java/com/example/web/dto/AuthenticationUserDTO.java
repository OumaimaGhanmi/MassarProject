package com.example.web.dto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.example.dao.entities.Admin;
import com.example.dao.entities.Participant;
import com.example.dao.entities.Randonneur;

public record AuthenticationUserDTO(
        Long id,
        String email,
        List<String> roles) {

    public static AuthenticationUserDTO toAuthenticationUserDTO(Randonneur randonneur) {
        List<String> roles = randonneur.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return new AuthenticationUserDTO(randonneur.getIdRandonneur(), randonneur.getEmail(), roles);
    }

    public static AuthenticationUserDTO toAuthenticationUserDTO(Admin admin) {
        List<String> roles = admin.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return new AuthenticationUserDTO(admin.getIdAdmin(), admin.getEmail(), roles);
    }

    public static AuthenticationUserDTO toAuthenticationUserDTO(Participant participant) {
        List<String> roles = participant.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return new AuthenticationUserDTO(participant.getIdParticipant(), participant.getEmail(), roles);
    }
}