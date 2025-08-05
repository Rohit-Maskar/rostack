package com.rostack.elearn.DTO;

import lombok.Data;

@Data
public class CreateCourseResponseDto {
    private String title;
    private String description;
    private Double price;
    private String thumbnail;
    private String createdBy;
}
