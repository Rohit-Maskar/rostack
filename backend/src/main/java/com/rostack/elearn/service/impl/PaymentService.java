package com.rostack.elearn.service.impl;

import com.rostack.elearn.dao.CartRepository;
import com.rostack.elearn.dao.EnrollmentRepository;
import com.rostack.elearn.dao.OrderRepository;
import com.rostack.elearn.dao.PaymentRepository;
import com.rostack.elearn.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepo;
    private final OrderRepository orderRepo;
    private final CartRepository cartRepo;
    private final EnrollmentRepository enrollmentRepo;

    public Payment processPayment(Long orderId, String gateway, String txnId, boolean isSuccess) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getOrderStatus() == OrderStatus.PAID) {
            throw new RuntimeException("Order is already paid");
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setGateway(gateway);
        payment.setTxnId(txnId);
        payment.setStatus(isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
        payment.setPaidAt(LocalDateTime.now());

        paymentRepo.save(payment);

        if (isSuccess) {
            order.setOrderStatus(OrderStatus.PAID);
            orderRepo.save(order);

            List<Cart> cartItems = cartRepo.findByUserId(order.getUser().getId());
            for (Cart cartItem : cartItems) {
                Enrollment enrollment = new Enrollment();
                enrollment.setUser(order.getUser());
                enrollment.setCourse(cartItem.getCourse());
                enrollment.setEnrolledAt(LocalDateTime.now());
                enrollmentRepo.save(enrollment);
            }

            cartRepo.deleteAll(cartItems); // Clear cart after success
        }

        return payment;
    }
}
