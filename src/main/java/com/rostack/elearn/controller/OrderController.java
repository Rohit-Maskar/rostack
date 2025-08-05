package com.rostack.elearn.controller;

import com.rostack.elearn.entity.Order;
import com.rostack.elearn.service.impl.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final CheckoutService checkoutService;

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(@RequestParam Long userId) {
        return ResponseEntity.ok(checkoutService.checkout(userId));
    }
}

