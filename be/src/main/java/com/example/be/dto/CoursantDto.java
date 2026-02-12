package com.example.be.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record CoursantDto(UUID id,
                          String firstName,
                          String lastName,
                          Integer age) {
}
