package com.rostack.elearn.dao;

import com.rostack.elearn.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
    Optional<Cart> findByUserIdAndCourseId(Long userId, Long courseId);
    void deleteByUserId(Long userId);
}
