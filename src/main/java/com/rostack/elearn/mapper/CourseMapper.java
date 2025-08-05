package com.rostack.elearn.mapper;

import com.rostack.elearn.DTO.CreateCourseResponseDto;
import com.rostack.elearn.entity.Course;

public class CourseMapper {
    public static CreateCourseResponseDto toCreateCourseResponseDto(Course course) {
        CreateCourseResponseDto dto = new CreateCourseResponseDto();
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        dto.setThumbnail(course.getThumbnail());
        dto.setCreatedBy(course.getCreatedBy().getName());
        return dto;
    }
}

