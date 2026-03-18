package com.myworkout.myworkout.service;

import com.myworkout.myworkout.model.Entrenamiento;
import com.myworkout.myworkout.repository.EntrenamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EntrenamientoService {

    @Autowired
    private EntrenamientoRepository entrenamientoRepository;

    public List<Entrenamiento> findAll() {
        return entrenamientoRepository.findAll();
    }

    public Optional<Entrenamiento> findById(Long id) {
        return entrenamientoRepository.findById(id);
    }

    public Entrenamiento save(Entrenamiento entrenamiento) {
        return entrenamientoRepository.save(entrenamiento);
    }

    public void deleteById(Long id) {
        entrenamientoRepository.deleteById(id);
    }
}