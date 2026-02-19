package com.example.be.course.controller;

import com.example.be.course.dto.CourseDto;
import com.example.be.course.dto.CreateCourseDto;
import com.example.be.course.dto.UpdateCourseDto;
import com.example.be.course.exception.CourseAlreadyExistsException;
import com.example.be.course.exception.CourseNotFoundException;
import com.example.be.course.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CourseDto>> getAllCourses(){
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/page")
    public ResponseEntity<Page<CourseDto>> getAllCourses(
        @PageableDefault(page = 0, size = 10, sort = "title", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(courseService.findAllPaginatedCourses(pageable));
    }


    @GetMapping("/v2-page")
    public ResponseEntity<Page<CourseDto>> getByPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        // Corecție sintaxă ResponseEntity: folosim .ok() sau new ResponseEntity<>()
        return ResponseEntity.ok(courseService.getByPage(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable UUID id){
        return ResponseEntity.ok(courseService.getCourseById(id));
    }
    @ExceptionHandler(CourseNotFoundException.class)
    public ResponseEntity<String> exceptionNotFound(CourseNotFoundException ex){
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCourse(@RequestBody CreateCourseDto courseDto){
        courseService.createCourse(courseDto);
        return ResponseEntity.ok().build();
    }
    @ExceptionHandler(CourseAlreadyExistsException.class)
    public ResponseEntity<String> exceptionAlreadyExist(CourseAlreadyExistsException ex){
        return  ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateCourse(@PathVariable UUID id, @RequestBody UpdateCourseDto updateCourseDto){
        courseService.updateCourse(id, updateCourseDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id){
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{courseId}/add-lecture/{lessonId}")
    public ResponseEntity <Void> addLessonToCourse(@PathVariable UUID courseId, @PathVariable UUID lessonId){
        courseService.addLessonToCourse(courseId,lessonId);
        return ResponseEntity.noContent().build();
    }
}
