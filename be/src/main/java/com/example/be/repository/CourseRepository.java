package com.example.be.repository;

import com.example.be.entity.CoursantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<CoursantEntity, UUID> {
}
