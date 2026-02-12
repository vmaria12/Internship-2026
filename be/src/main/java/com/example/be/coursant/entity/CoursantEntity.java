package com.example.be.coursant.entity;

import com.example.be.course.entity.CourseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name="coursant")

@NoArgsConstructor
@AllArgsConstructor

@Getter
@Setter
public class CoursantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String firstName;
    private String lastName;
    private Integer age;

    @ManyToMany(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JoinTable(
            name = "coursant_course",
            joinColumns = @JoinColumn(name = "coursant_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<CourseEntity> courseList = new java.util.ArrayList<>();
}
