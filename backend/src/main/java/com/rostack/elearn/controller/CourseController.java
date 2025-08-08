package com.rostack.elearn.controller;

import com.rostack.elearn.DTO.course.CourseRequestDto;
import com.rostack.elearn.DTO.course.CourseResponseDto;
import com.rostack.elearn.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // 🔹 Create a new course (admin or creator)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CourseResponseDto> createCourse(@RequestBody CourseRequestDto course) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CourseResponseDto created = courseService.createCourse(course, authentication.getName());
        return ResponseEntity.ok(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CourseResponseDto> updateCourse(@RequestBody CourseRequestDto course, @PathVariable Long id) {
        return ResponseEntity.ok(courseService.updateCourse(id, course));
    }

    // 🔹 Get all courses
    @GetMapping
    public ResponseEntity<List<CourseResponseDto>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // 🔹 Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDto> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseDetails(id));
    }

    // 🔹 Get all courses created by a specific user
    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<CourseResponseDto>> getCoursesByCreator(@PathVariable Long creatorId) {
        return ResponseEntity.ok(courseService.getCoursesByCreator(creatorId));
    }
}