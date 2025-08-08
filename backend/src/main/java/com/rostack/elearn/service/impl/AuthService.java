package com.rostack.elearn.service.impl;

import com.rostack.elearn.DTO.user.RegisterRequestDto;
import com.rostack.elearn.dao.RoleRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.dao.UserRoleRepository;
import com.rostack.elearn.entity.Role;
import com.rostack.elearn.entity.User;
import com.rostack.elearn.entity.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        user = userRepository.save(user);

        Role role = roleRepository.findById(1).get(); // assuming 1 = STUDENT
               // .orElseThrow(() -> new RuntimeException("Role not found"));

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        userRoleRepository.save(userRole);
        userRepository.flush();
    }
}
