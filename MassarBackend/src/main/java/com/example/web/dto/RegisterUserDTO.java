package com.example.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.dao.entities.Participant;

public class RegisterUserDto {

    @NotBlank(message = "firstname is required")
    private String firstname;

    @NotBlank(message = "lastname is required")
    private String lastname;

    @NotBlank(message = "Adress is required")
    private String address;

    @NotBlank(message = "email is required")
    @Email(message = "email format is not valid")
    private String email;

    @NotBlank(message = "password is required")
    @Size(min = 6, message = "Password must be at most 6 characters long")
    private String password;

    @NotNull(message = "age is required")
    private int age;

    

    private int tel;

    

    // Constructeurs, getters et setters

    public RegisterUserDto() {
    }

    public RegisterUserDto(@NotBlank(message = "firstname is required") String firstname, @NotBlank(message = "lastname is required") String lastname, @NotBlank(message = "Adress is required") String address, @NotBlank(message = "email is required") @Email(message = "email format is not valid") String email, @NotBlank(message = "password is required") @Size(min = 6, message = "Password must be at most 6 characters long") String password, @NotBlank(message = "age is required") int age,  int tel) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.password = password;
        this.age = age;
        this.tel = tel;
        
    }

    public static Participant fromRegisterUserDTO(RegisterUserDto registerUserDTO, PasswordEncoder passwordEncoder) {
        Participant participant = new Participant();
        participant.setFirstName(registerUserDTO.getFirstname()); // Utilisez getFirstname() ici
        participant.setLastName(registerUserDTO.getLastname());
        participant.setEmail(registerUserDTO.getEmail());
        participant.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        participant.setAge(registerUserDTO.getAge());
        participant.setTel(registerUserDTO.getTel());
        participant.setAddress(registerUserDTO.getAddress());
        
        
        return participant;
    }

    public static RegisterUserDto toRegisterUserDTO(Participant participant) {
        return new RegisterUserDto(
            participant.getFirstName(),
            participant.getLastName(),
            participant.getAddress(),
            participant.getEmail(),
            "", // Note: password should not be passed like this, it's not usually included in DTOs for security reasons
            participant.getAge(),
            participant.getTel()
        );
    }

    // Getters et setters pour vos champs

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getTel() {
        return tel;
    }

    public void setTel(int tel) {
        this.tel = tel;
    }

 
}
