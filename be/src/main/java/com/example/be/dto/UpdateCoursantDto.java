package com.example.be.dto;


import lombok.Builder;

@Builder
public record UpdateCoursantDto(
String firstName,
String lastName,
Integer ange
) {
}
