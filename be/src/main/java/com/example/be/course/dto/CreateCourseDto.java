package com.example.be.course.dto;

import lombok.Builder;

@Builder
public record CreateCourseDto(
   String title,
   String description
) {
}
