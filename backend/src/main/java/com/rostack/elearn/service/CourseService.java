package com.rostack.elearn.service;

import com.rostack.elearn.DTO.CreateCourseResponseDto;
import com.rostack.elearn.entity.Course;

import java.util.List;

public interface CourseService {
    CreateCourseResponseDto createCourse(Course course, Long creatorId);
    List<CreateCourseResponseDto> getAllCourses(); // public listing
    Course getCourseDetails(Long courseId);
    List<Course> getCoursesByCreator(Long creatorId);
}
