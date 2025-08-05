package com.rostack.elearn.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseModuleResponseDto implements CourseModuleDto {
    private Long id;
    private String title;
    private Integer sequence;
}
