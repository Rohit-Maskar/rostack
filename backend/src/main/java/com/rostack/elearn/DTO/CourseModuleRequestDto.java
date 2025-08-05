package com.rostack.elearn.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseModuleRequestDto implements CourseModuleDto {
    private String title;
    private Integer sequence;
    private Long courseId;
}
