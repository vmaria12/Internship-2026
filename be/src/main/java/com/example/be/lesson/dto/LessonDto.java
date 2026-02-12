package com.example.be.lesson.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record LessonDto(
        UUID id,
        String content
) {
}
