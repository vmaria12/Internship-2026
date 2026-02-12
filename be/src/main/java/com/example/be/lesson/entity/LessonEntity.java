package com.example.be.lesson.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@Table(name="lesson")

@Getter
@Setter

@AllArgsConstructor
@NoArgsConstructor
public class LessonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String content;
}
