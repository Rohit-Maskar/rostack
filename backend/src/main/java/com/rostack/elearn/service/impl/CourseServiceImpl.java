package com.rostack.elearn.service.impl;

import com.rostack.elearn.DTO.course.CourseRequestDto;
import com.rostack.elearn.DTO.course.CourseResponseDto;
import com.rostack.elearn.dao.CourseRepository;
import com.rostack.elearn.dao.UserRepository;
import com.rostack.elearn.entity.Course;
import com.rostack.elearn.entity.CourseModule;
import com.rostack.elearn.entity.Resource;
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
    public CourseResponseDto createCourse(CourseRequestDto courseRequest, String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        Course courseDb = new Course();
        courseDb.setTitle(courseRequest.getTitle());
        courseDb.setDescription(courseRequest.getDescription());
        courseDb.setPrice(courseRequest.getPrice());
        courseDb.setThumbnail(courseRequest.getThumbnail());
        courseDb.setCreatedBy(user);

        if (courseRequest.getModules() != null) {
            List<CourseModule> modules = courseRequest.getModules().stream().map(moduleReq -> {
                CourseModule module = new CourseModule();
                module.setTitle(moduleReq.getTitle());
                module.setSequence(moduleReq.getSequence());
                module.setCourse(courseDb); // bi-directional

                if (moduleReq.getResources() != null) {
                    List<Resource> resources = moduleReq.getResources().stream().map(resReq -> {
                        Resource resource = new Resource();
                        resource.setType((resReq.getType()));
                        resource.setTitle(resReq.getTitle());
                        resource.setLink(resReq.getLink());
                        resource.setSequence(resReq.getSequence());
                        resource.setModule(module);
                        return resource;
                    }).toList();
                    module.setResources(resources);
                }

                return module;
            }).toList();

            courseDb.setModules(modules);
        }

        Course createdCourse = courseRepository.save(courseDb);

        return CourseMapper.toCourseDto(createdCourse);
    }

    @Override
    public CourseResponseDto updateCourse(Long courseId, CourseRequestDto request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        // Basic fields
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setPrice(request.getPrice());
        course.setThumbnail(request.getThumbnail());


        if (request.getModules() != null) {
            List<CourseModule> updatedModules = request.getModules().stream().map(modDto -> {
                CourseModule module = new CourseModule();
               // module.setId(modDto.getId()); // if existing
                module.setTitle(modDto.getTitle());
                module.setSequence(modDto.getSequence());
                module.setCourse(course);

                if (modDto.getResources() != null) {
                    List<Resource> resources = modDto.getResources().stream().map(resDto -> {
                        Resource res = new Resource();
                 //       res.setId(resDto.getId()); // if existing
                        res.setTitle(resDto.getTitle());
                        res.setLink(resDto.getLink());
                        res.setSequence(resDto.getSequence());
                        res.setType(resDto.getType());
                        res.setModule(module);
                        return res;
                    }).toList();
                    module.setResources(resources);
                }

                return module;
            }).toList();

            course.getModules().clear();
            course.getModules().addAll(updatedModules);
        }

        Course saved = courseRepository.save(course);
        return CourseMapper.toCourseDto(saved);
    }

    @Override
    public List<CourseResponseDto> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(CourseMapper::toCourseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResponseDto getCourseDetails(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        return CourseMapper.toCourseDto(course);
    }

    @Override
    public List<CourseResponseDto> getCoursesByCreator(Long creatorId) {
         return courseRepository.findByCreatedById(creatorId)
                 .stream()
                 .map(CourseMapper::toCourseDto)
                 .collect(Collectors.toList());
    }
}
