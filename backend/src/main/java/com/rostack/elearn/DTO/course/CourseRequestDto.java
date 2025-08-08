package com.rostack.elearn.DTO.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequestDto {
    private String title;
    private String description;
    private Double price;
    private String thumbnail;
    private String createdBy;
    private List<CourseModuleRequestDto> modules;
}
