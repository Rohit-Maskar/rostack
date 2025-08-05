package com.rostack.elearn.controller;

import com.rostack.elearn.DTO.ResourceDto;
import com.rostack.elearn.entity.Resource;
import com.rostack.elearn.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    // 🔹 Add resource to module
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addResource(@RequestBody ResourceDto resource) {
        return ResponseEntity.ok(resourceService.createResource(resource));
    }

    // 🔹 Get resources by module ID
    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<Resource>> getResourcesByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(resourceService.getResourcesByModuleId(moduleId));
    }

    // 🔹 Delete resource
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok("Resource deleted");
    }
}

