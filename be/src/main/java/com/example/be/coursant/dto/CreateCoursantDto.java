package com.example.be.coursant.dto;

import lombok.Builder;

@Builder
public record CreateCoursantDto(
        String firstName,
        String lastName,
        Integer age
) {
}
