package com.example.be.course.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class CourseException extends RuntimeException {
    String message;

    public CourseException(String message){
        super(message);
        this.message=message;
    }
}
