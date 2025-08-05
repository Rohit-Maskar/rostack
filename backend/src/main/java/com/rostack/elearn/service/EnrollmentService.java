package com.rostack.elearn.service;

import com.rostack.elearn.entity.Enrollment;

import java.util.List;

public interface EnrollmentService {
    Enrollment enrollUser(Long userId, Long courseId);
    List<Enrollment> getEnrollmentsByUser(Long userId);
    boolean isUserEnrolled(Long userId, Long courseId);
}
