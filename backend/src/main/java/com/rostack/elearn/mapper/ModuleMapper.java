package com.rostack.elearn.mapper;

import com.rostack.elearn.DTO.course.CourseModuleRequestDto;
import com.rostack.elearn.DTO.course.CourseModuleResponseDto;
import com.rostack.elearn.entity.CourseModule;

public class ModuleMapper {
    public static CourseModule getCourseModule(CourseModuleRequestDto dto) {
        CourseModule module = new CourseModule();
        module.setId(dto.getCourseId());
        module.setTitle(dto.getTitle());
        module.setSequence(dto.getSequence());
        return module;
    }

    public static CourseModuleRequestDto getCourseModuleRequestDto(CourseModule module) {
        CourseModuleRequestDto dto = new CourseModuleRequestDto();
        dto.setSequence(module.getSequence());
        dto.setTitle(module.getTitle());
        return dto;
    }

    public static CourseModuleResponseDto getCourseModuleResponseDto(CourseModule module) {
        CourseModuleResponseDto dto = new CourseModuleResponseDto();
        dto.setSequence(module.getSequence());
        dto.setTitle(module.getTitle());
        return dto;
    }
}
