package com.myworkout.myworkout.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "entrenamiento")
public class Entrenamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha;

    private String notas;

    @OneToMany(mappedBy = "entrenamiento", cascade = CascadeType.ALL)
    private List<EntrenamientoEjercicio> ejercicios;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }

    public List<EntrenamientoEjercicio> getEjercicios() { return ejercicios; }
    public void setEjercicios(List<EntrenamientoEjercicio> ejercicios) { this.ejercicios = ejercicios; }
}