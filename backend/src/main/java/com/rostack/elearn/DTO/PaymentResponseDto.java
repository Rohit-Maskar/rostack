package com.rostack.elearn.DTO;

import lombok.Data;

@Data
public class PaymentResponseDto {
    private String paymentId;
    private String orderId;
    private String signature;

    private String email;
    private String courseName;
}

