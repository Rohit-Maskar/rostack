package com.rostack.elearn.controller;

import com.rostack.elearn.DTO.CreateCourseResponseDto;
import com.rostack.elearn.entity.Course;
import com.rostack.elearn.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity<CreateCourseResponseDto> createCourse(@RequestBody Course course,
                                               @RequestParam Long creatorId) {
        CreateCourseResponseDto created = courseService.createCourse(course, creatorId);
        return ResponseEntity.ok(created);
    }

    // 🔹 Get all courses
    @GetMapping
    public ResponseEntity<List<CreateCourseResponseDto>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // 🔹 Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseDetails(id));
    }

    // 🔹 Get all courses created by a specific user
    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<Course>> getCoursesByCreator(@PathVariable Long creatorId) {
        return ResponseEntity.ok(courseService.getCoursesByCreator(creatorId));
    }
}