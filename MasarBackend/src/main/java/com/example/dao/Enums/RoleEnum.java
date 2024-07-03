package com.example.dao.Enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
 
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import static com.example.dao.Enums.Privilege.*;
@RequiredArgsConstructor
public enum RoleEnum {
    Admin(
        Set.of(READ_PRIVILEGE, WRITE_PRIVILEGE, UPDATE_PRIVILEGE, DELETE_PRIVILEGE)
    ),
    Randonneur(
        Set.of(READ_PRIVILEGE, WRITE_PRIVILEGE, UPDATE_PRIVILEGE, DELETE_PRIVILEGE)
    ),
    Participant(
        Set.of(READ_PRIVILEGE, WRITE_PRIVILEGE, UPDATE_PRIVILEGE, DELETE_PRIVILEGE)
    );
    @Getter
    private final Set<Privilege> privileges;
 
  public List<SimpleGrantedAuthority> getAuthorities(){
    List<SimpleGrantedAuthority> authorities = getPrivileges()
       .stream()
       .map(privilege -> new SimpleGrantedAuthority(privilege.name()))
       .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
    return authorities;
 }
}