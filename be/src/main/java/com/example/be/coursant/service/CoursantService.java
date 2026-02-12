package com.example.be.coursant.service;

import com.example.be.coursant.dto.CoursantDto;
import com.example.be.coursant.dto.CreateCoursantDto;
import com.example.be.coursant.entity.CoursantEntity;
import com.example.be.coursant.repository.CoursantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CoursantService {
    private final CoursantRepository coursantRepository;

    public CoursantService(CoursantRepository coursantRepository) {
        this.coursantRepository = coursantRepository;
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
                .age(coursantEntity.getAnge())
                .build();
    }

    public List<CoursantDto> getAllCoursant(){
        List<CoursantEntity> coursantEntityList = coursantRepository.findAll();
        return coursantEntityList.stream().map(coursantEntity -> CoursantDto.builder()
                .firstName(coursantEntity.getFirstName())
                        .lastName(coursantEntity.getLastName())
                        .age(coursantEntity.getAnge())
                        .id(coursantEntity.getId())
                        .build()).toList();
    }

    public UUID create(CreateCoursantDto createCoursantDto){
        CoursantEntity coursantEntity = new CoursantEntity();
        coursantEntity.setFirstName(createCoursantDto.firstName());
        coursantEntity.setLastName(createCoursantDto.lastName());
        coursantRepository.save(coursantEntity);
        return coursantEntity.getId();
    }

    public void deleteCoursant(UUID id){
        coursantRepository.deleteById(id);
    }

}