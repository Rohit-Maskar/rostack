package com.rostack.elearn.service.impl;

import com.rostack.elearn.dao.CartRepository;
import com.rostack.elearn.dao.CourseRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.entity.Cart;
import com.rostack.elearn.entity.Course;
import com.rostack.elearn.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepo;
    private final UserRepository userRepo;
    private final CourseRepository courseRepo;

    public Cart addToCart(Long userId, Long courseId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCourse(course);

        return cartRepo.save(cart);
    }

    public void removeFromCart(Long userId, Long courseId) {
        Cart cart = cartRepo.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        cartRepo.delete(cart);
    }

    public List<Cart> getCartItems(Long userId) {
        return cartRepo.findByUserId(userId);
    }

    public void clearCart(Long userId) {
        List<Cart> items = cartRepo.findByUserId(userId);
        cartRepo.deleteAll(items);
    }
}
