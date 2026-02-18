package com.example.be.lesson.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SmallLengthLessonException extends LessonException{
    public SmallLengthLessonException(String message) {
        super(message);
    }
}
