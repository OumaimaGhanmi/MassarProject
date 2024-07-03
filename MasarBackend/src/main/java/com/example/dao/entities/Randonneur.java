package com.example.dao.entities;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Randonneur extends User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRandonneur;
   @JsonIgnore
    @ManyToOne
    private Admin admin; 
    
    @OneToMany(mappedBy = "randonneur") 
    private Set<Randonnee> randonneesDéposées;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return super.getRole().getAuthorities();
    }

    @Override
    public String getUsername() {
       return super.getEmail();
    }
    @Override
  public String getPassword() {
    return super.getPassword();
 }
 @Override
 public boolean isAccountNonExpired() {
   return true;
}

 @Override
 public boolean isAccountNonLocked() {
   return true;
}

 @Override
 public boolean isCredentialsNonExpired() {
   return true;
}

 @Override
 public boolean isEnabled() {
   return true;
}
}
