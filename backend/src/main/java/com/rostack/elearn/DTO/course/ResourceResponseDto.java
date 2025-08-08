package com.rostack.elearn.DTO.course;

import com.rostack.elearn.entity.ResourceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceResponseDto {
    private Long id;
    private ResourceType type;
    private String title;
    private String link;
    private Integer sequence;
    private Long moduleId;
}
