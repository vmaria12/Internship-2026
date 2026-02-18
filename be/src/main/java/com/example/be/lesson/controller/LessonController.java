package com.example.be.lesson.controller;

import com.example.be.lesson.dto.CreateLessonDto;
import com.example.be.lesson.dto.LessonDto;
import com.example.be.lesson.dto.UpdateLessonDto;
import com.example.be.lesson.exception.LessonAlreadyExistsException;
import com.example.be.lesson.exception.SmallLengthLessonException;
import com.example.be.lesson.service.LessonService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
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
    ResponseEntity <List<LessonDto>> getAllLessons(){
        return ResponseEntity.ok(lessonService.getAllLessons());
    }

    @PostMapping("/v2-page")
    ResponseEntity <Page<LessonDto>> getAllLessonsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size){
        return  ResponseEntity.ok(lessonService.getAllLessondPagenated(page, size));
    }

    @PostMapping("/filter")
    ResponseEntity <List<LessonDto>> getFilteredLessond(
            @RequestParam(defaultValue = "") String content) {
        return  ResponseEntity.ok(lessonService.getFilteredLessons(content));
    }


 // ******************** Exception //
    @PostMapping("/create")
    ResponseEntity <Void> createLesson(@RequestBody CreateLessonDto createLessonDto){
        lessonService.createLesson(createLessonDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ExceptionHandler(LessonAlreadyExistsException.class)
    public ResponseEntity<String> handleErr(LessonAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(SmallLengthLessonException.class)
    public ResponseEntity<String> hanslerErrorSmallLength(SmallLengthLessonException ex){
        return ResponseEntity.status(HttpStatus.LENGTH_REQUIRED).body(ex.getMessage());
    }
    // ******************** Exception //




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
