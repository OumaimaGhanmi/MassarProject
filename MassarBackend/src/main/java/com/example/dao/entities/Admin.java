package com.example.dao.entities;

import java.util.Collection;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Admin extends User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private long idAdmin;

    @OneToMany(mappedBy = "admin") 
    private Set<Randonneur> randonneurs;

    @OneToMany(mappedBy = "admin")
    private Set<Randonnee> list_Randonnee;

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
