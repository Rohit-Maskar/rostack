package com.rostack.elearn.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourceDto {
    private String type;
    private String title;
    private String link;
    private Integer sequence;
    private Long moduleId;
}

