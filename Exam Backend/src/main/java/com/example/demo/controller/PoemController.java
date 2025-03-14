package com.example.demo.controller;

import com.example.demo.entity.Poem;
import com.example.demo.enums.Categoria;
import com.example.demo.service.PoemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/poem")
@CrossOrigin(origins = "http://localhost:4200")
public class PoemController {

    private final PoemService poemService;

    @Autowired
    public PoemController(PoemService poemService) {
        this.poemService = poemService;
    }
    @PostMapping("/create")
    public ResponseEntity<Poem> createPoem(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam Categoria category,
            @RequestParam String imageUrl) throws IOException {

        Poem poem = new Poem();
        poem.setTitle(title);
        poem.setContent(content);
        poem.setCategory(category);
        poem.setImage(imageUrl);

        return ResponseEntity.ok(poemService.savePoem(poem));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Poem>> getAllPoems() {
        return ResponseEntity.ok(poemService.getAllPoems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poem> obtenerPoema(@PathVariable Long id) {
        return ResponseEntity.ok(poemService.getPoemById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Poem>> listarPorCategoria(@PathVariable Categoria category) {
        return ResponseEntity.ok(poemService.findByCategory(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPoema(@PathVariable Long id) {
        poemService.deletePoem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> darLike(@PathVariable Long id) {
        poemService.incrementLikes(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<Void> darDislike(@PathVariable Long id) {
        poemService.decrementLikes(id);
        return ResponseEntity.ok().build();
    }
}
