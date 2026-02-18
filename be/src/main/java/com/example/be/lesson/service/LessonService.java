package com.example.be.lesson.service;

import com.example.be.lesson.dto.CreateLessonDto;
import com.example.be.lesson.dto.LessonDto;
import com.example.be.lesson.dto.UpdateLessonDto;
import com.example.be.lesson.entity.LessonEntity;
import com.example.be.lesson.exception.LessonAlreadyExistsException;
import com.example.be.lesson.exception.NoSuchLessonExistsException;
import com.example.be.lesson.exception.SmallLengthLessonException;
import com.example.be.lesson.repository.LessonRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
        // get lessonBy content
        LessonEntity lessonEntityFounded = lessonRepository.getLessonEntityByContent(createLessonDto.content());
        if(lessonEntityFounded !=null){
            throw new LessonAlreadyExistsException("Exista deja aceasta lectie");
        }
        if(createLessonDto.content().length() <2){
            throw new SmallLengthLessonException("Lungimea este prea mica!! <2 este necesara");
        }
        LessonEntity lessonEntity = new LessonEntity();
        lessonEntity.setContent(createLessonDto.content());
        lessonRepository.save(lessonEntity);
    }


    // get lesson by Id
    public LessonDto getLessonById(UUID id){
        LessonEntity lessonEntity = lessonRepository.findById(id).orElseThrow(()->new NoSuchLessonExistsException("**Nu s-a gasit "));

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

    // --- Paging & Sorting ---
    public Page<LessonDto> getAllLessondPagenated(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("content").ascending());
        Page<LessonEntity> lessonEntityPage = lessonRepository.findAll(pageable);
        return lessonEntityPage.map(lessonEntity -> LessonDto.builder()
                .id(lessonEntity.getId())
                .content(lessonEntity.getContent())
                .build());
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




    //Filter
    public List<LessonDto> getFilteredLessons(String content) {
        // Inițializăm cu o specificație care nu filtrează nimic (1=1)
        Specification<LessonEntity> spec = (root, query, cb) -> cb.conjunction();

        if (content != null && !content.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("content")), "%" + content.toLowerCase() + "%")
            );
        }

        return lessonRepository.findAll(spec).stream()
                .map(lessonEntity -> LessonDto.builder()
                        .id(lessonEntity.getId())
                        .content(lessonEntity.getContent())
                        .build())
                .toList();
    }
}
