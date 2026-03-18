package com.myworkout.myworkout.service;

import com.myworkout.myworkout.model.Ejercicio;
import com.myworkout.myworkout.repository.EjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EjercicioService {

    @Autowired
    private EjercicioRepository ejercicioRepository;

    public List<Ejercicio> findAll() {
        return ejercicioRepository.findAll();
    }

    public Optional<Ejercicio> findById(Long id) {
        return ejercicioRepository.findById(id);
    }

    public Ejercicio save(Ejercicio ejercicio) {
        return ejercicioRepository.save(ejercicio);
    }

    public void deleteById(Long id) {
        ejercicioRepository.deleteById(id);
    }
}