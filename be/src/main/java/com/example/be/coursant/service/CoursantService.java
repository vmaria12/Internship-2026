package com.example.be.coursant.service;

import com.example.be.coursant.dto.CoursantDto;
import com.example.be.coursant.dto.CreateCoursantDto;
import com.example.be.coursant.entity.CoursantEntity;
import com.example.be.coursant.repository.CoursantRepository;
import com.example.be.course.entity.CourseEntity;
import com.example.be.course.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CoursantService {
    private final CoursantRepository coursantRepository;
    private  final CourseRepository courseRepository;

    public CoursantService(CoursantRepository coursantRepository, CourseRepository courseRepository) {
        this.coursantRepository = coursantRepository;
        this.courseRepository = courseRepository;
    }

    public CoursantDto getById(UUID id) {
        // 1. Folosim findById
        CoursantEntity coursantEntity = coursantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cursantul nu a fost gasit"));

        // 2. Maparea către DTO folosind Builder
        return CoursantDto.builder()
                .id(coursantEntity.getId())
                .firstName(coursantEntity.getFirstName())
                .lastName(coursantEntity.getLastName())
                .age(coursantEntity.getAge())
                .coursesList(coursantEntity.getCourseList())
                .build();
    }

    public List<CoursantDto> getAllCoursant(){
        List<CoursantEntity> coursantEntityList = coursantRepository.findAll();
        return coursantEntityList.stream().map(coursantEntity -> CoursantDto.builder()
                .firstName(coursantEntity.getFirstName())
                        .lastName(coursantEntity.getLastName())
                        .age(coursantEntity.getAge())

                        .id(coursantEntity.getId())
                        .coursesList(coursantEntity.getCourseList())
                        .build()).toList();
    }

    public UUID create(CreateCoursantDto createCoursantDto){
        CoursantEntity coursantEntity = new CoursantEntity();
        coursantEntity.setFirstName(createCoursantDto.firstName());
        coursantEntity.setLastName(createCoursantDto.lastName());
        coursantEntity.setAge(createCoursantDto.age());
        coursantRepository.save(coursantEntity);
        return coursantEntity.getId();
    }

    public void deleteCoursant(UUID id){
        coursantRepository.deleteById(id);
    }


    // ******************* Assign a course to a student  ************
    @Transactional // <--- CRITIC: Fără asta, modificările pe liste nu se persistă
    public void assignCourseToStudent(UUID coursantId, UUID courseId) {
        // 1. Fetch entități
        CoursantEntity coursant = coursantRepository.findById(coursantId)
                .orElseThrow(() -> new EntityNotFoundException("Cursantul nu a fost gasit"));

        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Nu s-a putut gasi cursul"));

        // 2. Verifică să nu fie deja în listă (pentru a evita duplicate)
        if (!coursant.getCourseList().contains(course)) {
            // 3. Adaugă în ambele părți (Sincronizare bidirecțională)
            coursant.getCourseList().add(course);
            course.getCoursantList().add(coursant);
        }

        // 4. Salvează explicit stăpânul relației
        coursantRepository.save(coursant);
    }

}