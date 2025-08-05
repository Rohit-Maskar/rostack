package com.rostack.elearn.dao;

import com.rostack.elearn.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByModuleId(Long moduleId);
}
