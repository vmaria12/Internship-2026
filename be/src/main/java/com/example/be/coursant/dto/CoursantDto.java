package com.example.be.coursant.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record CoursantDto(UUID id,
                          String firstName,
                          String lastName,
                          Integer age) {
}
