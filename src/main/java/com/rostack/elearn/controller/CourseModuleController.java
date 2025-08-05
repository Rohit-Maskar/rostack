package com.rostack.elearn.controller;

import com.rostack.elearn.DTO.CourseModuleDto;
import com.rostack.elearn.DTO.CourseModuleRequestDto;
import com.rostack.elearn.DTO.CourseModuleResponseDto;
import com.rostack.elearn.entity.CourseModule;
import com.rostack.elearn.service.CourseModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
public class CourseModuleController {

    private final CourseModuleService moduleService;

    // 🔹 Add module to a course
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseModuleResponseDto> addModule(@RequestBody CourseModuleRequestDto module) {
        return ResponseEntity.ok(moduleService.createModule(module));
    }

    // 🔹 Get modules by course ID
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseModule>> getModulesByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(moduleService.getModulesByCourseID(courseId));
    }

    // 🔹 Update module
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseModule> updateModule(@PathVariable Long id, @RequestBody CourseModule updated) {
        return ResponseEntity.ok(moduleService.updateModule(id, updated));
    }

    // 🔹 Delete module
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteModule(@PathVariable Long id) {
        moduleService.deleteModule(id);
        return ResponseEntity.ok("Module deleted");
    }
}

