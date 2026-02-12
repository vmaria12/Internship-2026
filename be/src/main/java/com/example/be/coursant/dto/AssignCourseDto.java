package com.example.be.coursant.dto;

import java.util.UUID;

public record AssignCourseDto(
        UUID coursantId,
        UUID courseId

) {
}
