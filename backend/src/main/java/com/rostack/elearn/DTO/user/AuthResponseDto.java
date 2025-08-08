package com.rostack.elearn.DTO.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private UserDetails userDetails;
    private String message;
}
