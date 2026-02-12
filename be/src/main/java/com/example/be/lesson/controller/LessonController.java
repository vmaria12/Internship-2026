package com.example.be.lesson.controller;

import com.example.be.lesson.dto.CreateLessonDto;
import com.example.be.lesson.dto.LessonDto;
import com.example.be.lesson.dto.UpdateLessonDto;
import com.example.be.lesson.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/lesson")
public class LessonController {
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/{id}")
    ResponseEntity<LessonDto> getLessonById(@PathVariable UUID id){
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @GetMapping("/all")
    ResponseEntity <List<LessonDto>> getAllLessond(){
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    @PostMapping("/create")
    ResponseEntity <Void> createLesson(@RequestBody CreateLessonDto createLessonDto){
        lessonService.createLesson(createLessonDto);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    ResponseEntity <Void> updateLesson(@PathVariable UUID id, @RequestBody UpdateLessonDto updateLessonDto){
        lessonService.updateLesson(id, updateLessonDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
        ResponseEntity <Void> deleteLesson(@PathVariable UUID id){
        lessonService.deletelesson(id);
        return ResponseEntity.noContent().build();
    }

}
