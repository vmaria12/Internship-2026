package com.example.be.course.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseNotFoundException extends CourseException{
    public CourseNotFoundException(String message) {
        super(message);
    }
}
