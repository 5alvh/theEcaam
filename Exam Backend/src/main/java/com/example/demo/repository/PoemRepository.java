package com.example.demo.repository;

import com.example.demo.entity.Poem;
import com.example.demo.enums.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PoemRepository extends JpaRepository<Poem, Long> {
    List<Poem> findByCategory(Categoria category);
}
