package com.rostack.elearn.controller;

import com.rostack.elearn.DTO.course.CourseRequestDto;
import com.rostack.elearn.DTO.course.CourseResponseDto;
import com.rostack.elearn.service.CourseService;
import com.rostack.elearn.service.impl.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @Autowired
    private FileStorageService fileStorageService;

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

    @PostMapping("/upload/thumbnail")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileStorageService.uploadFile(file);
            return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "Failed to upload file"));
        }
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