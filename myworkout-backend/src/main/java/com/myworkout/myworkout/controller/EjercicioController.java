package com.myworkout.myworkout.controller;

import com.myworkout.myworkout.model.Ejercicio;
import com.myworkout.myworkout.service.EjercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ejercicios")
@CrossOrigin(origins = "*")
public class EjercicioController {

    @Autowired
    private EjercicioService ejercicioService;

    @GetMapping
    public List<Ejercicio> getAll() {
        return ejercicioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Ejercicio> getById(@PathVariable Long id) {
        return ejercicioService.findById(id);
    }

    @PostMapping
    public Ejercicio create(@RequestBody Ejercicio ejercicio) {
        return ejercicioService.save(ejercicio);
    }

    @PutMapping("/{id}")
    public Ejercicio update(@PathVariable Long id, @RequestBody Ejercicio ejercicio) {
        ejercicio.setId(id);
        return ejercicioService.save(ejercicio);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ejercicioService.deleteById(id);
    }
}