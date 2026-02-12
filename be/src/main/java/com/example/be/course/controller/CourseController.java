package com.example.be.course.controller;

import com.example.be.course.dto.CourseDto;
import com.example.be.course.dto.CreateCourseDto;
import com.example.be.course.dto.UpdateCourseDto;
import com.example.be.course.service.CourseService;
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

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable UUID id){
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createCourse(@RequestBody CreateCourseDto courseDto){
        courseService.createCourse(courseDto);
        return ResponseEntity.ok().build();
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
}
