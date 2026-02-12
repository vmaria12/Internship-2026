package com.example.be.coursant.dto;

import com.example.be.course.dto.CourseDto;
import com.example.be.course.entity.CourseEntity;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record CoursantDto(UUID id,
                          String firstName,
                          String lastName,
                          Integer age,
                          List<CourseEntity> coursesList) {
}
