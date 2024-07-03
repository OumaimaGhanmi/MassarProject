package com.example.config;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import com.example.dao.Repository.AdminRepository;
import com.example.dao.Repository.ParticipantRepository;
import com.example.dao.Repository.RandonneurRepository;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
public class ApplicationSecurityConfig {

   
    private final RSAPublicKey key;
    private final RSAPrivateKey priv;
    private final RandonneurRepository randonneurRepository;
     private final ParticipantRepository participantRepository;
    private final AdminRepository adminRepository;

    public ApplicationSecurityConfig(@Value("${jwt.public.key}") RSAPublicKey key,
            @Value("${jwt.private.key}") RSAPrivateKey priv,
            RandonneurRepository randonneurRepository,ParticipantRepository participantRepository, AdminRepository adminRepository) {
        this.key = key;
        this.priv = priv;
        this.randonneurRepository = randonneurRepository;
        this.participantRepository = participantRepository;
        this.adminRepository = adminRepository;
    }

    // Bean for loading user details from the database
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Optional<? extends UserDetails> user = participantRepository.findByEmail(username)
                    .map(participant -> (UserDetails) participant);
    
            if (user.isEmpty()) {
                user = randonneurRepository.findByEmail(username)
                        .map(randonneur -> (UserDetails) randonneur);
            }
    
            if (user.isEmpty()) {
                user = adminRepository.findByEmail(username)
                        .map(admin -> (UserDetails) admin);
            }
    
            return user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
        };
    }
    
    

    

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean for authentication provider using DAO authentication
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(bCryptPasswordEncoder());
        return authProvider;
    }

    // Bean for JWT decoder using the public key
    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(this.key).build();
    }

    // Bean for JWT encoder using the public and private keys
    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(this.key).privateKey(this.priv).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    // Bean for JwtAuthenticationConverter
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        // Remove the SCOPE_ prefix
        grantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }
}