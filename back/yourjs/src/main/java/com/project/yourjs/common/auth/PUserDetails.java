package com.project.yourjs.common.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.yourjs.db.entity.User;

public class PUserDetails implements UserDetails {
  @Autowired
  User user;
  boolean accountNonExpired;
  boolean accountNonLocked;
  boolean credentialNonExpired;
  boolean enabled = false;
  List<GrantedAuthority> roles = new ArrayList<>();

  public PUserDetails(User user) {
    super();
    this.user = user;
  }

  public User getUser() {
    return this.user;
  }

  public String getUserId() {
    return this.user.getUserId();
  }

  public String getNickname() {
    return this.user.getNickname();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.roles;
  }

  @Override
  public String getPassword() {
    return this.user.getPassword();
  }

  @Override
  public String getUsername() {
    return this.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    return this.accountNonExpired;
  }

  @Override
  public boolean isAccountNonLocked() {
    return this.accountNonLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return this.credentialNonExpired;
  }

  @Override
  public boolean isEnabled() {
    return this.enabled;
  }
}
