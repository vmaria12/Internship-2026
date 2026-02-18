package com.example.be.lesson.exception;

import lombok.Getter;

@Getter
public class LessonAlreadyExistsException extends LessonException{
    public LessonAlreadyExistsException(String message){
        super(message);
    }
}
