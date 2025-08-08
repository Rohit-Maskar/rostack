package com.rostack.elearn.service;

import com.rostack.elearn.DTO.course.CourseModuleRequestDto;
import com.rostack.elearn.DTO.course.CourseModuleResponseDto;
import com.rostack.elearn.entity.CourseModule;

import java.util.List;

public interface CourseModuleService {
    CourseModuleResponseDto createModule(CourseModuleRequestDto dto);
    List<CourseModule> getModulesByCourseID(Long courseId);

    CourseModule updateModule(Long id, CourseModule updated);

    void deleteModule(Long id);
}

