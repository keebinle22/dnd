package com.main.domain;

import com.main.data.RoleRepository;
import com.main.data.UserRepository;
import com.main.dtos.RegisterUserDto;
import com.main.model.Role;
import com.main.model.RolesEnum;
import com.main.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User createAdministrator(RegisterUserDto input) {
        Role role = roleRepository.findRole(RolesEnum.SUPER.toString());
        if (role == null) {
            return null;
        }
        var user = new User(input.getUsername(),passwordEncoder.encode(input.getPassword()), role);

        return userRepository.addUser(user);
    }
}
