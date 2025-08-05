package com.rostack.elearn.service.impl;

import com.rostack.elearn.dao.CartRepository;
import com.rostack.elearn.dao.OrderRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.entity.Cart;
import com.rostack.elearn.entity.Order;
import com.rostack.elearn.entity.OrderStatus;
import com.rostack.elearn.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckoutService {

    private final CartRepository cartRepo;
    private final UserRepository userRepo;
    private final OrderRepository orderRepo;

    public Order checkout(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Cart> cartItems = cartRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = cartItems.stream()
                .mapToDouble(c -> c.getCourse().getPrice())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepo.save(order);

        // We keep cart as is, will clear it after payment
        return savedOrder;
    }
}
