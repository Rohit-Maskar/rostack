package com.rostack.elearn.service;

import com.rostack.elearn.DTO.course.ResourceRequestDto;
import com.rostack.elearn.entity.Resource;

import java.util.List;

public interface ResourceService {
    Resource createResource(ResourceRequestDto dto);
    List<Resource> getResourcesByModuleId(Long moduleId);
    boolean deleteResource(Long id);
}

