package com.main.dtos;

import com.main.model.Role;
import com.main.model.RolesEnum;

public class RegisterUserDto {

    private String password;
    private String username;
    private String role;

    public RegisterUserDto(){}

    public RegisterUserDto(String username, String password, String role){
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
