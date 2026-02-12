package com.example.be.course.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record CourseDto(
        UUID id,
        String title,
        String description) {
}
