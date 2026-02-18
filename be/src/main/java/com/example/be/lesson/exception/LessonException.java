package com.example.be.lesson.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class LessonException extends RuntimeException {
    private String message;

    public LessonException(){}
    public LessonException(String message){
        super();
        this.message=message;
    }
}
