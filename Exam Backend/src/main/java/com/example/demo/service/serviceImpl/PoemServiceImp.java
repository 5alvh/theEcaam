package com.example.demo.service.serviceImpl;

import com.example.demo.entity.Poem;
import com.example.demo.enums.Categoria;
import com.example.demo.repository.PoemRepository;
import com.example.demo.service.PoemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoemServiceImp implements PoemService {

    private final PoemRepository poemRepository;

    @Autowired
    public PoemServiceImp(PoemRepository poemRepository) {
        this.poemRepository = poemRepository;
    }

    @Override
    public List<Poem> findByCategory(Categoria category) {
        return poemRepository.findByCategory(category);
    }

    @Override
    public Poem savePoem(Poem poem) {
        return poemRepository.save(poem);
    }

    @Override
    public List<Poem> getAllPoems() {
        return poemRepository.findAll();
    }

    @Override
    public Poem getPoemById(Long id) {
        return poemRepository.findById(id).orElse(null);
    }

    @Override
    public void deletePoem(Long id) {
        poemRepository.deleteById(id);
    }

    @Override
    public void incrementLikes(Long id) {
        Optional<Poem> poemaOpt = poemRepository.findById(id);
        poemaOpt.ifPresent(poema -> {
            poema.incrementLikes();
            poemRepository.save(poema);
        });
    }

    @Override
    public void decrementLikes(Long id) {
        Optional<Poem> poemaOpt = poemRepository.findById(id);
        poemaOpt.ifPresent(poema -> {
            poema.decrementLikes();
            poemRepository.save(poema);
        });
    }

}
