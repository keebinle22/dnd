package com.main.bootstrap;

import com.main.data.RoleRepository;
import com.main.model.Role;
import com.main.model.RolesEnum;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {

    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        RolesEnum[] roleNames = new RolesEnum[] {RolesEnum.DM, RolesEnum.PLAYER, RolesEnum.SUPER};
        Map<RolesEnum, String> roleDescriptionMap = Map.of(
                RolesEnum.DM, "The Story Teller",
                RolesEnum.PLAYER, "The Pawns",
                RolesEnum.SUPER, "A Literal God"
        );

        Arrays.stream(roleNames).forEach((roleName) -> {
            Role role = roleRepository.findRole(roleName.toString());
            if (role == null){
                Role roleToCreate = new Role();
                roleToCreate.setType(roleName.toString());
                roleToCreate.setDescription(roleDescriptionMap.get(roleName));
                roleRepository.addRole(roleToCreate);
            }
        });
    }
}
