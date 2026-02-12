package com.example.be.lesson.dto;

import lombok.Builder;

@Builder
public record CreateLessonDto(
        String content
) {
}
