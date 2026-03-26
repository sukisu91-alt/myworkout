package com.myworkout.myworkout.dto;

import java.util.List;

public class EntrenamientoDTO {
    private String fecha;
    private String notas;
    private String duracion;
    private List<EjercicioDTO> ejercicios;

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }

    public String getDuracion() { return duracion; }
    public void setDuracion(String duracion) { this.duracion = duracion; }

    public List<EjercicioDTO> getEjercicios() { return ejercicios; }
    public void setEjercicios(List<EjercicioDTO> ejercicios) { this.ejercicios = ejercicios; }
}