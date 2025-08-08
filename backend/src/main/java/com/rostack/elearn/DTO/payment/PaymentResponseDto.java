package com.rostack.elearn.DTO.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDto {
    private String paymentId;
    private String orderId;
    private String signature;

    private String email;
    private String courseName;
}
