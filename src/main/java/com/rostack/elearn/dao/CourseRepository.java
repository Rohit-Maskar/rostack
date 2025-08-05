package com.rostack.elearn.dao;

import com.rostack.elearn.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCreatedById(Long userId);
}
