package com.rostack.elearn.DTO;

public interface CourseModuleDto {
    Long getCourseId();

    String getTitle();

    Integer getSequence();

    void setSequence(Integer sequence);

    void setTitle(String title);
}
