package com.rostack.elearn.controller;

import com.rostack.elearn.entity.Payment;
import com.rostack.elearn.service.impl.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(
            @RequestParam Long orderId,
            @RequestParam String gateway,
            @RequestParam String txnId,
            @RequestParam boolean isSuccess
    ) {
        return ResponseEntity.ok(
                paymentService.processPayment(orderId, gateway, txnId, isSuccess)
        );
    }
}
