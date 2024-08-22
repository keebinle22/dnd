package com.main.bootstrap;

import com.main.data.RoleRepository;
import com.main.data.UserRepository;
import com.main.dtos.RegisterUserDto;
import com.main.model.Role;
import com.main.model.RolesEnum;
import com.main.model.User;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        this.createSuper();
    }

    private void createSuper(){
        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setUsername("Super");
        userDto.setPassword("super");
        Role role = roleRepository.findRole(RolesEnum.SUPER.toString());
        User user = userRepository.findByUser(userDto.getUsername());
        if (role == null || user != null){
            return;
        }
        User superUser = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), role);

        userRepository.addUser(superUser);

    }
}
