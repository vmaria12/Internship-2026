package com.example.be.lesson.service;

import com.example.be.lesson.dto.CreateLessonDto;
import com.example.be.lesson.dto.LessonDto;
import com.example.be.lesson.dto.UpdateLessonDto;
import com.example.be.lesson.entity.LessonEntity;
import com.example.be.lesson.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    // **************************** CRUD ****************************

    // create lesson
    public void createLesson(CreateLessonDto createLessonDto){
        LessonEntity lessonEntity = new LessonEntity();
        lessonEntity.setContent(createLessonDto.content());
        lessonRepository.save(lessonEntity);
    }
    // get lesson by Id
    public LessonDto getLessonById(UUID id){
        LessonEntity lessonEntity = lessonRepository.findById(id).orElseThrow(()-> new RuntimeException("We cannot found the lesson"));
        return LessonDto.builder()
                .content(lessonEntity.getContent())
                .id(lessonEntity.getId())
                .build();
    }

    // get all lessons
    public List<LessonDto> getAllLessons(){
        List<LessonEntity> lessonEntities = lessonRepository.findAll();
        return lessonEntities.stream().map(lessonEntity ->
                LessonDto.builder()
                        .id(lessonEntity.getId())
                        .content(lessonEntity.getContent())
                        .build()).toList();
    }

    // update lesson
    public void updateLesson(UUID id, UpdateLessonDto updateLessonDto){
        LessonEntity lessonEntity = lessonRepository.findById(id).orElseThrow(()-> new RuntimeException("The lesson cannot be found"));
        if(updateLessonDto.content()!=null){
            lessonEntity.setContent(updateLessonDto.content());
        }
        lessonRepository.save(lessonEntity);
    }

    //delete lesson
    public void deletelesson(UUID id){
        LessonEntity lessonEntity = lessonRepository.findById(id).orElseThrow(()-> new RuntimeException("We cannt found the lesson"));
        lessonRepository.delete(lessonEntity);
    }
}
