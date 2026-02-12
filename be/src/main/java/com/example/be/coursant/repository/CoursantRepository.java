package com.example.be.coursant.repository;

import com.example.be.coursant.entity.CoursantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CoursantRepository extends JpaRepository<CoursantEntity, UUID> {
}
