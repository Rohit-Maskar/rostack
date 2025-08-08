package com.rostack.elearn.DTO.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseModuleRequestDto {
    private String title;
    private Integer sequence;
    private Long courseId;
    private List<ResourceRequestDto> resources;
}
