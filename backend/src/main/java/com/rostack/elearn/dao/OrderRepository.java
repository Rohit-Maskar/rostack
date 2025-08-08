package com.rostack.elearn.dao;

import com.rostack.elearn.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    Optional<Order> findByRazorpayOrderId(String orderId);
}
