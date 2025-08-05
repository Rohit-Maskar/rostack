package com.rostack.elearn.config;

// Package: com.example.lms.config

import com.rostack.elearn.dao.RoleRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.dao.UserRoleRepository;
import com.rostack.elearn.entity.Role;
import com.rostack.elearn.entity.User;
import com.rostack.elearn.entity.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final UserRoleRepository userRoleRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedRoles();
        seedAdminUser();
    }

    private void seedRoles() {
        if (roleRepo.count() == 0) {
            roleRepo.saveAll(List.of(
                    new Role(1, "STUDENT"),
                    new Role(2, "ADMIN")
            ));
        }
    }

    private void seedAdminUser() {
        if (userRepo.findByEmail("admin@lms.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@lms.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setCreatedAt(LocalDateTime.now());

            userRepo.save(admin);

            UserRole adminRole = new UserRole();
            adminRole.setUser(admin);
            adminRole.setRole(roleRepo.findById(2).get());

            userRoleRepo.save(adminRole);
        }
    }
}

