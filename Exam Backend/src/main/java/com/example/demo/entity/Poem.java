package com.example.demo.entity;

import com.example.demo.enums.Categoria;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "poems")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Poem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String content;

    @Enumerated(EnumType.STRING)
    private Categoria category;

    @Lob
    private String image;

    private int likes = 0;

    public void incrementLikes() {
        this.likes++;
    }

    public void decrementLikes() {
        this.likes--;
    }
}
