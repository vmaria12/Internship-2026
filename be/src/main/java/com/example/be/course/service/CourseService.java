package com.example.be.course.service;
import com.example.be.course.exception.CourseAlreadyExistsException;
import com.example.be.course.exception.CourseNotFoundException;
import org.hibernate.query.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import com.example.be.course.dto.CourseDto;
import com.example.be.course.dto.CreateCourseDto;
import com.example.be.course.dto.UpdateCourseDto;
import com.example.be.course.entity.CourseEntity;
import com.example.be.course.repository.CourseRepository;
import com.example.be.lesson.entity.LessonEntity;
import com.example.be.lesson.repository.LessonRepository;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public CourseService(CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    //CRUD
    public UUID createCourse(CreateCourseDto createCourseDto){
        // search course
        List<CourseEntity> courseEntityListWithSameTitleAndDescription = courseRepository.findCourseEntitiesByDescriptionAndTitle(createCourseDto.description(), createCourseDto.title());
        if(!courseEntityListWithSameTitleAndDescription.isEmpty()){
            throw  new CourseAlreadyExistsException("Exista un curs similar");
        }

        CourseEntity courseEntity  = new CourseEntity();
        courseEntity.setDescription(createCourseDto.description());
        courseEntity.setTitle(createCourseDto.title());
        courseRepository.save(courseEntity);
        return courseEntity.getId();
    }

    // get course
    public CourseDto getCourseById(UUID id){
       CourseEntity courseEntity= courseRepository.findById(id).orElseThrow(()->new RuntimeException("The course with id" + id+ "cannot be found"));
    return CourseDto.builder()
            .id(courseEntity.getId())
            .description(courseEntity.getDescription())
            .title(courseEntity.getTitle())
            .lessons(courseEntity.getLessons())
            .build();
    }

    // get All courses
    public List<CourseDto> getAllCourses() {
        List<CourseEntity> courseEntityList = courseRepository.findAll();
        return courseEntityList.stream().map(courseEntity -> CourseDto.builder()
                .id(courseEntity.getId())
                .title(courseEntity.getTitle())
                .description(courseEntity.getDescription())
                .lessons(courseEntity.getLessons())
                .build()).toList();
    }

    // get paginated courses
    public Page<CourseDto> findAllPaginatedCourses(Pageable pageable) {
        // 1. Preluăm pagina de entități din DB
        Page<CourseEntity> coursePage = courseRepository.findAll(pageable);
        return coursePage.map(courseEntity -> CourseDto.builder()
                .id(courseEntity.getId())
                .title(courseEntity.getTitle())
                .description(courseEntity.getDescription())
                .lessons(courseEntity.getLessons())
                .build());
    }


    public Page<CourseDto> getByPage(int page, int size) {
        // Cream obiectul Pageable folosind PageRequest
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").descending());

        // Apelăm metoda standard findAll din repository
        Page<CourseEntity> coursePage = courseRepository.findAll(pageable);

        return coursePage.map(courseEntity -> CourseDto.builder()
                .id(courseEntity.getId())
                .title(courseEntity.getTitle())
                .description(courseEntity.getDescription())
                .lessons(courseEntity.getLessons())
                .build());
    }
    // Metodă helper pentru conversie (pentru a păstra codul curat)
    private CourseDto convertToDto(CourseEntity entity) {
        return CourseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .lessons(entity.getLessons())
                .build();
    }

    // update a specific course
    public void updateCourse(UUID id, UpdateCourseDto updateCourseDto) {
        var foundedCourse = courseRepository.findById(id).orElseThrow(() ->
                new CourseNotFoundException("Curs negasit, incercati din nou"));

        if(updateCourseDto.title()!=null){
            foundedCourse.setTitle(updateCourseDto.title());
        }
        if (updateCourseDto.description()!=null){
            foundedCourse.setDescription(updateCourseDto.description());
        }
        courseRepository.save(foundedCourse);
    }


    // delete course
    public void deleteCourse(UUID id){
        var courseEntity = courseRepository.findById(id).orElseThrow(()-> new RuntimeException("Wr cannot found this course"));
        courseRepository.delete(courseEntity);
    }

    // Add lesson to course
    @Transactional
    public void addLessonToCourse(UUID courseId, UUID lessonId) {
        // 1. Căutăm entitățile
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Nu s-a gasit cursul"));
        LessonEntity lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Nu s-a gasit Lectia"));

        course.getLessons().add(lesson);

        courseRepository.save(course);
    }



}
