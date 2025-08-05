package com.rostack.elearn.service.impl;

import com.rostack.elearn.DTO.CreateCourseResponseDto;
import com.rostack.elearn.dao.CourseRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.entity.Course;
import com.rostack.elearn.entity.User;
import com.rostack.elearn.mapper.CourseMapper;
import com.rostack.elearn.service.CourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Override
    public CreateCourseResponseDto createCourse(Course course, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        course.setCreatedBy(creator);
        Course createdCourse = courseRepository.save(course);

        return CourseMapper.toCreateCourseResponseDto(createdCourse);
    }

    @Override
    public List<CreateCourseResponseDto> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(CourseMapper::toCreateCourseResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Course getCourseDetails(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
    }

    @Override
    public List<Course> getCoursesByCreator(Long creatorId) {
        return courseRepository.findByCreatedById(creatorId);
    }
}
