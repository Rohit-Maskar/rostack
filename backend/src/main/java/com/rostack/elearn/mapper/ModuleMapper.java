package com.rostack.elearn.mapper;

import com.rostack.elearn.DTO.CourseModuleDto;
import com.rostack.elearn.DTO.CourseModuleRequestDto;
import com.rostack.elearn.DTO.CourseModuleResponseDto;
import com.rostack.elearn.entity.CourseModule;

public class ModuleMapper {
    public static CourseModule getCourseModule(CourseModuleDto dto) {
        CourseModule module = new CourseModule();
        module.setId(dto.getCourseId());
        module.setTitle(dto.getTitle());
        module.setSequence(dto.getSequence());
        return module;
    }

    public static CourseModuleDto getCourseModuleRequestDto(CourseModule module) {
        CourseModuleDto dto = new CourseModuleRequestDto();
        dto.setSequence(module.getSequence());
        dto.setTitle(module.getTitle());
        return dto;
    }

    public static CourseModuleDto getCourseModuleResponseDto(CourseModule module) {
        CourseModuleDto dto = new CourseModuleResponseDto();
        dto.setSequence(module.getSequence());
        dto.setTitle(module.getTitle());
        return dto;
    }
}
