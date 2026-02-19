package com.example.be.course.repository;

import com.example.be.course.dto.CourseDto;
import com.example.be.course.entity.CourseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends  JpaRepository <CourseEntity, UUID>  {
    List<CourseEntity> findCourseEntitiesByDescriptionAndTitle(String description, String title);
    Page<CourseEntity> findAll(Pageable pageable);

}
