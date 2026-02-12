package com.example.be.course.entity;

import com.example.be.coursant.entity.CoursantEntity;
import com.example.be.lesson.entity.LessonEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Lazy;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name="course")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String title;
    private String description;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JoinColumn(name = "course_id") // In lesson ==> FK ="course_id"
    private List<LessonEntity> lessons = new java.util.ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy ="courseList" )
    @ToString.Exclude
    @JsonIgnore
    private List<CoursantEntity> coursantList = new java.util.ArrayList<>();
}
