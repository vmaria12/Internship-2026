package com.example.be.dto;

import lombok.Builder;

@Builder
public record CreateCourseDto(
        String firstName,
        String lastName,
        Integer age
) {
}
