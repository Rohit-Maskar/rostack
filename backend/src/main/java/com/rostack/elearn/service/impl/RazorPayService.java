package com.rostack.elearn.service.impl;

import com.rostack.elearn.DTO.payment.PaymentResponseDto;
import com.rostack.elearn.dao.OrderRepository;
import com.rostack.elearn.dao.PaymentRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.entity.Order;
import com.rostack.elearn.entity.OrderStatus;
import com.rostack.elearn.entity.Payment;
import com.rostack.elearn.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RazorPayService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private UserRepository userRepository;

    public Order saveRazorPayOrder(com.razorpay.Order order) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // this will be the logged-in user's email

        User loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order razorPayOrder = new Order();
        razorPayOrder.setUser(loggedInUser); // fetch from SecurityContext
        razorPayOrder.setTotalAmount((Integer) order.get("amount") / 100.0); // convert paise to rupees
        razorPayOrder.setOrderStatus(OrderStatus.PENDING);
        razorPayOrder.setRazorpayOrderId(order.get("id"));
        razorPayOrder.setCreatedAt(order.get("createdAt"));
        return orderRepository.save(razorPayOrder);
    }

    public Payment saveRazorPayPayment(PaymentResponseDto paymentResponseDto) {
        Order order = orderRepository.findByRazorpayOrderId(paymentResponseDto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if (order.getOrderStatus() == OrderStatus.PAID) {
            throw new RuntimeException("Order is already paid");
        }
        order.setOrderStatus(OrderStatus.PAID);
        orderRepository.save(order);
        Payment payment = new Payment();
        payment.setRazorPaymentId(paymentResponseDto.getPaymentId());
        payment.setGateway("RazorPay");
        payment.setRazorPayOrderId(paymentResponseDto.getOrderId());
        payment.setRazorPaySignature(paymentResponseDto.getSignature());
        payment.setOrder(order);

        return paymentRepository.save(payment);
    }

}
