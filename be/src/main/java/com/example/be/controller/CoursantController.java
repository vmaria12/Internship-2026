package com.example.be.controller;

import com.example.be.dto.CoursantDto;
import com.example.be.dto.CreateCourseDto;
import com.example.be.service.CoursantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/coursant")
public class CoursantController {
    private final CoursantService coursantService;

    public CoursantController(CoursantService coursantService) {
        this.coursantService = coursantService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CoursantDto>> getAll(){
        return ResponseEntity.ok(coursantService.getAllCoursant());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoursantDto> getCoursantById(@PathVariable(required = true) UUID id ){
        return ResponseEntity.ok(coursantService.getById(id));
    }
   @PostMapping("/create")
    public ResponseEntity<UUID> createCoursant(@RequestBody CreateCourseDto createCourseDto){
        UUID id = coursantService.create(createCourseDto);
        return ResponseEntity.ok(id);
   }

}
