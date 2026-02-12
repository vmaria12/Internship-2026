package com.example.be.course.service;

import com.example.be.coursant.dto.CreateCoursantDto;
import com.example.be.course.dto.CourseDto;
import com.example.be.course.dto.CreateCourseDto;
import com.example.be.course.dto.UpdateCourseDto;
import com.example.be.course.entity.CourseEntity;
import com.example.be.course.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    //CRUD
    public UUID createCourse(CreateCourseDto createCourseDto){
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
            .build();
    }

    // get All courses
    public List<CourseDto> getAllCourses() {
        List<CourseEntity> courseEntityList = courseRepository.findAll();
        return courseEntityList.stream().map(courseEntity -> CourseDto.builder()
                .id(courseEntity.getId())
                .title(courseEntity.getTitle())
                .description(courseEntity.getDescription())
                .build()).toList();
    }

    // update a specific course
    public void updateCourse(UUID id, UpdateCourseDto updateCourseDto) {
        var foundedCourse = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("We cannot found the course. Try again"));

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
}
