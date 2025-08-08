package com.rostack.elearn.service.impl;

import com.rostack.elearn.DTO.course.ResourceRequestDto;
import com.rostack.elearn.dao.CourseModuleRepository;
import com.rostack.elearn.dao.ResourceRepository;
import com.rostack.elearn.entity.CourseModule;
import com.rostack.elearn.entity.Resource;
import com.rostack.elearn.service.ResourceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final CourseModuleRepository moduleRepository;
    private final ResourceRepository resourceRepository;

    @Override
    public Resource createResource(ResourceRequestDto dto) {
        CourseModule module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new EntityNotFoundException("Module not found"));

        Resource resource = new Resource();
        resource.setType((dto.getType()));
        resource.setTitle(dto.getTitle());
        resource.setLink(dto.getLink());
        resource.setSequence(dto.getSequence());
        resource.setModule(module);

        return resourceRepository.save(resource);
    }

    @Override
    public List<Resource> getResourcesByModuleId(Long moduleId) {
        return resourceRepository.findByModuleId(moduleId);
    }

    @Override
    public boolean deleteResource(Long id) {
        try {
            resourceRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
