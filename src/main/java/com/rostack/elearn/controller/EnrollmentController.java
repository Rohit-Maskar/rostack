package com.rostack.elearn.controller;

import com.rostack.elearn.entity.Enrollment;
import com.rostack.elearn.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    // Enroll a user into a course
    @PostMapping
    public ResponseEntity<Enrollment> enrollUser(
            @RequestParam Long userId,
            @RequestParam Long courseId
    ) {
        Enrollment enrollment = enrollmentService.enrollUser(userId, courseId);
        return ResponseEntity.ok(enrollment);
    }

    // Get all enrollments for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Enrollment>> getUserEnrollments(@PathVariable Long userId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByUser(userId));
    }

    // Check if a user is enrolled in a course
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkEnrollment(
            @RequestParam Long userId,
            @RequestParam Long courseId
    ) {
        boolean enrolled = enrollmentService.isUserEnrolled(userId, courseId);
        return ResponseEntity.ok(enrolled);
    }
}
