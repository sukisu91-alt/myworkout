package com.myworkout.myworkout.repository;

import com.myworkout.myworkout.model.Entrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrenamientoRepository extends JpaRepository<Entrenamiento, Long> {
}