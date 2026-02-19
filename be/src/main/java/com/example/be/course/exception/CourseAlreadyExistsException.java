package com.example.be.course.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class CourseAlreadyExistsException extends  CourseException{
    public CourseAlreadyExistsException(String message) {
        super(message);
    }
}
