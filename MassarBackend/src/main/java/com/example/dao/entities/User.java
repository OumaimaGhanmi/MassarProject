package com.example.dao.entities;

import com.example.dao.Enums.RoleEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class User {
    @Getter @Setter private String firstName;
    @Getter @Setter private String lastName;
    @Column(nullable = false)
    @JsonIgnore
    @Getter @Setter private String password;
    @Column(unique = true, nullable = false)
    @Getter @Setter private String email;
    @Getter @Setter private int age;
    @Getter @Setter private int tel;
    @Getter @Setter private String address;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Getter @Setter private RoleEnum role;
    @Getter @Setter private String image;
}