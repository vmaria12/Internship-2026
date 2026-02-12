package com.example.be.course.dto;

import lombok.Builder;

@Builder
public record UpdateCourseDto(
        String title,
        String description
) {
}
