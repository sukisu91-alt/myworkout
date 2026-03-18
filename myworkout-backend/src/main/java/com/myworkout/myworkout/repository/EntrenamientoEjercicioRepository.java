package com.myworkout.myworkout.repository;

import com.myworkout.myworkout.model.EntrenamientoEjercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrenamientoEjercicioRepository extends JpaRepository<EntrenamientoEjercicio, Long> {
}