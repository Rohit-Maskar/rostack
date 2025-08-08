package com.rostack.elearn.service;

import com.rostack.elearn.DTO.course.CourseRequestDto;
import com.rostack.elearn.DTO.course.CourseResponseDto;

import java.util.List;

public interface CourseService {
    CourseResponseDto createCourse(CourseRequestDto course, String email);
    CourseResponseDto updateCourse(Long id, CourseRequestDto course);
    List<CourseResponseDto> getAllCourses(); // public listing
    CourseResponseDto getCourseDetails(Long courseId);
    List<CourseResponseDto> getCoursesByCreator(Long creatorId);
}
