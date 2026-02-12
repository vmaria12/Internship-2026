package com.example.be.coursant.dto;


import lombok.Builder;

@Builder
public record UpdateCoursantDto(
String firstName,
String lastName,
Integer ange
) {
}
