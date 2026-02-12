package com.example.be.lesson.dto;

import lombok.Builder;

@Builder
public record UpdateLessonDto(
        String content
) {
}
