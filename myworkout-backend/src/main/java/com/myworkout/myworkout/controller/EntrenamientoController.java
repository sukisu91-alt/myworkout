package com.myworkout.myworkout.controller;

import com.myworkout.myworkout.model.Entrenamiento;
import com.myworkout.myworkout.service.EntrenamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entrenamientos")
@CrossOrigin(origins = "*")
public class EntrenamientoController {

    @Autowired
    private EntrenamientoService entrenamientoService;

    @GetMapping
    public List<Entrenamiento> getAll() {
        return entrenamientoService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Entrenamiento> getById(@PathVariable Long id) {
        return entrenamientoService.findById(id);
    }

    @PostMapping
    public Entrenamiento create(@RequestBody Entrenamiento entrenamiento) {
        return entrenamientoService.save(entrenamiento);
    }

    @PutMapping("/{id}")
    public Entrenamiento update(@PathVariable Long id, @RequestBody Entrenamiento entrenamiento) {
        entrenamiento.setId(id);
        return entrenamientoService.save(entrenamiento);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        entrenamientoService.deleteById(id);
    }
}