package com.example.be.lesson.exception;

public class NoSuchLessonExistsException extends LessonException{
    public NoSuchLessonExistsException(String message){
        super(message);
    };
}
