package com.example.be.service;

import com.example.be.dto.CoursantDto;
import com.example.be.dto.CreateCourseDto;
import com.example.be.entity.CoursantEntity;
import com.example.be.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CoursantService {
    private final CourseRepository courseRepository;

    public CoursantService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CoursantDto getById(UUID id) {
        // 1. Folosim findById
        CoursantEntity coursantEntity = courseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cursantul nu a fost gasit"));

        // 2. Maparea către DTO folosind Builder
        return CoursantDto.builder()
                .id(coursantEntity.getId())
                .firstName(coursantEntity.getFirstName())
                .lastName(coursantEntity.getLastName())
                .age(coursantEntity.getAnge())
                .build();
    }

    public List<CoursantDto> getAllCoursant(){
        List<CoursantEntity> coursantEntityList = courseRepository.findAll();
        return coursantEntityList.stream().map(coursantEntity -> CoursantDto.builder()
                .firstName(coursantEntity.getFirstName())
                        .lastName(coursantEntity.getLastName())
                        .age(coursantEntity.getAnge())
                        .id(coursantEntity.getId())
                        .build()).toList();
    }

    public UUID create(CreateCourseDto createCourseDto){
        CoursantEntity coursantEntity = new CoursantEntity();
        coursantEntity.setFirstName(createCourseDto.firstName());
        coursantEntity.setLastName(createCourseDto.lastName());
        courseRepository.save(coursantEntity);
        return coursantEntity.getId();
    }

}