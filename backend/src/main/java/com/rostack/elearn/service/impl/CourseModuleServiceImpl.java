package com.rostack.elearn.service.impl;

import com.rostack.elearn.DTO.course.CourseModuleRequestDto;
import com.rostack.elearn.DTO.course.CourseModuleResponseDto;
import com.rostack.elearn.dao.CourseModuleRepository;
import com.rostack.elearn.dao.CourseRepository;
import com.rostack.elearn.entity.Course;
import com.rostack.elearn.entity.CourseModule;
import com.rostack.elearn.mapper.ModuleMapper;
import com.rostack.elearn.service.CourseModuleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseModuleServiceImpl implements CourseModuleService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;

    @Override
    public CourseModuleResponseDto createModule(CourseModuleRequestDto dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        CourseModule module = new CourseModule();
        module.setTitle(dto.getTitle());
        module.setSequence(dto.getSequence());
        module.setCourse(course);

        CourseModule moduleSaved = moduleRepository.save(module);
        return (CourseModuleResponseDto) ModuleMapper.getCourseModuleResponseDto(moduleSaved);
    }

    @Override
    public List<CourseModule> getModulesByCourseID(Long courseId) {
        List<CourseModule> list = moduleRepository.findByCourseId(courseId);
        list.stream().forEach(module -> module.setSequence(module.getSequence()));
        return list;
    }

    @Override
    public CourseModule updateModule(Long id, CourseModule updated) {
        return null;
    }

    @Override
    public void deleteModule(Long id) {

    }
}

