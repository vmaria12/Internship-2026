package com.example.be.coursant.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private Integer ange;
}
