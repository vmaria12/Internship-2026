package com.example.be.coursant.controller;

import com.example.be.coursant.dto.CoursantDto;
import com.example.be.coursant.dto.CreateCoursantDto;
import com.example.be.coursant.dto.UpdateCoursantDto;
import com.example.be.coursant.service.CoursantService;
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
    public ResponseEntity<UUID> createCoursant(@RequestBody CreateCoursantDto createCoursantDto){
        UUID id = coursantService.create(createCoursantDto);
        return ResponseEntity.ok(id);
   }

   @PatchMapping("/{id}")
   public ResponseEntity<Void> updateCoursant(@PathVariable UUID id, @RequestBody UpdateCoursantDto updateCoursantDto){
       coursantService.editCoursant(id, updateCoursantDto);
        return ResponseEntity.noContent().build();
   }

   @DeleteMapping("/{id}")
    public ResponseEntity <Void> deleteCoursant(@PathVariable(required = true)  UUID id){coursantService.deleteCoursant(id);
       return ResponseEntity.noContent().build();
   }

   @PostMapping("/{coursantId}/add-course/{courseId}")
    public ResponseEntity <Void> addCourseToCoursant(@PathVariable UUID coursantId, @PathVariable UUID courseId){
        coursantService.assignCourseToStudent(coursantId,courseId);
        return ResponseEntity.noContent().build();
   }


}
