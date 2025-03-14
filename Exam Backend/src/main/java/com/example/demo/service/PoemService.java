package com.example.demo.service;

import com.example.demo.entity.Poem;
import com.example.demo.enums.Categoria;

import java.util.List;

public interface PoemService {
    Poem savePoem(Poem poem);
    List<Poem> getAllPoems();
    Poem getPoemById(Long id);
    void deletePoem(Long id);
    void incrementLikes(Long id);
    void decrementLikes(Long id);
    List<Poem> findByCategory(Categoria category);
}
