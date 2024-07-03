package com.example.web.Controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.Exception.DuplicateParticipantException;
import com.example.business.Services.AuthenticationService;
import com.example.business.Services.JwtService;
import com.example.dao.entities.Participant;
import com.example.web.dto.AuthenticationUserDTO;
import com.example.web.dto.RegisterUserDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@Controller
@RequestMapping("auth")
public class AuthController {

     // Injecting required services
   private final AuthenticationService authenticationService;
   private final PasswordEncoder passwordEncoder;
   private final JwtService jwtService;

   public AuthController(AuthenticationService authenticationService,
   PasswordEncoder passwordEncoder,
   JwtService jwtService) {
this.authenticationService = authenticationService;
this.passwordEncoder = passwordEncoder;
this.jwtService = jwtService;
}

    // Endpoint for user login (sign-in)

       @PostMapping("/login")
       public ResponseEntity<AuthenticationUserDTO> auth(Authentication authentication) {
           // Authenticate the user and generate the authenticated user DTO
           AuthenticationUserDTO authenticationUserDTO = this.authenticationService.login(authentication);
           // Generate a JWT cookie
           ResponseCookie jwtCookie = jwtService.generateJwtCookie(jwtService.generateToken(authentication));
           // Return the response with the JWT cookie in the headers
           return ResponseEntity.ok()
                   .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                   .body(authenticationUserDTO);
       }
   
   
   // Endpoint for user registration (sign-up)
    @PostMapping("/register")
  public ResponseEntity<RegisterUserDto> register(@Valid @RequestBody RegisterUserDto registerUserDto) throws DuplicateParticipantException {
        // Register the user and return the registered user DTO
        Participant participant = authenticationService.register(registerUserDto, passwordEncoder);
        RegisterUserDto registeredUserDto = RegisterUserDto.toRegisterUserDTO(participant);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUserDto);
    }

    // Endpoint for user logout (sign-out)
    @PostMapping("/signout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        // Generate a clean JWT cookie to remove the existing one
        ResponseCookie jwtCookie = jwtService.getCleanJwtCookie();
        // Return the response with the clean JWT cookie in the headers
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }

}