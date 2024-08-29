package com.main.domain;

import com.main.data.RoleRepository;
import com.main.data.UserRepository;
import com.main.dtos.LoginUserDto;
import com.main.dtos.RegisterUserDto;
import com.main.model.Role;
import com.main.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public Result<User> signup(RegisterUserDto input) {
        Result<User> result = new Result<>();
        User search = userRepository.findByUser(input.getUsername());
        if (search != null){
            result.addMessage("Username already exist.", ResultType.INVALID);
            return result;
        }
        Role role = roleRepository.findRole(input.getRole());
        User user = new User(input.getUsername(),
        passwordEncoder.encode(input.getPassword()),
                role);
        userRepository.addUser(user);
        result.setPayload(user);
        return result;
    }

    public User authenticate(LoginUserDto input) throws UsernameNotFoundException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );
        return userRepository.findByUser(input.getUsername());
    }
}
