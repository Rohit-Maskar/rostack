package com.rostack.elearn.mapper;

import com.rostack.elearn.DTO.course.CourseModuleResponseDto;
import com.rostack.elearn.DTO.course.CourseResponseDto;
import com.rostack.elearn.DTO.course.ResourceResponseDto;
import com.rostack.elearn.entity.Course;

import java.util.List;
import java.util.stream.Collectors;

public class CourseMapper {
    public static CourseResponseDto toCourseDto(Course course) {
        CourseResponseDto dto = new CourseResponseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        dto.setThumbnail(course.getThumbnail());
        dto.setCreatedBy(course.getCreatedBy().getName());

        List<CourseModuleResponseDto> moduleResponses = course.getModules().stream().map(mod -> {
            CourseModuleResponseDto cmr = new CourseModuleResponseDto();
            cmr.setId(mod.getId());
            cmr.setTitle(mod.getTitle());
            cmr.setSequence(mod.getSequence());

            List<ResourceResponseDto> resourceResponses = mod.getResources().stream().map(resrc -> {
                ResourceResponseDto rr = new ResourceResponseDto();
                rr.setId(resrc.getId());
                rr.setTitle(resrc.getTitle());
                rr.setLink(resrc.getLink());
                rr.setSequence(resrc.getSequence());
                rr.setType(resrc.getType());
                return rr;
            }).collect(Collectors.toList());

            cmr.setResources(resourceResponses);
            return cmr;
        }).collect(Collectors.toList());

        dto.setModules(moduleResponses);

        return dto;
    }
}

