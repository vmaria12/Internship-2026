package com.example.be.course.dto;

import com.example.be.lesson.entity.LessonEntity;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record CourseDto(
        UUID id,
        String title,
        String description,
        List<LessonEntity> lessons
) {
}
