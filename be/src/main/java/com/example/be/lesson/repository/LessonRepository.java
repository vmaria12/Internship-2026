package com.example.be.lesson.repository;

import com.example.be.lesson.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, UUID>, JpaSpecificationExecutor<LessonEntity> {
    LessonEntity getLessonEntityByContent(String content);
}
