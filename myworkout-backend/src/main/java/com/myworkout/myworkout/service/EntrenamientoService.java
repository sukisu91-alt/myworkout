package com.myworkout.myworkout.service;

import com.myworkout.myworkout.dto.EntrenamientoDTO;
import com.myworkout.myworkout.dto.EjercicioDTO;
import com.myworkout.myworkout.model.Ejercicio;
import com.myworkout.myworkout.model.Entrenamiento;
import com.myworkout.myworkout.model.EntrenamientoEjercicio;
import com.myworkout.myworkout.repository.EjercicioRepository;
import com.myworkout.myworkout.repository.EntrenamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EntrenamientoService {

    @Autowired
    private EntrenamientoRepository entrenamientoRepository;

    @Autowired
    private EjercicioRepository ejercicioRepository;

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

    public Entrenamiento saveFromDTO(EntrenamientoDTO dto) {
        Entrenamiento entrenamiento = new Entrenamiento();
        entrenamiento.setFecha(LocalDate.parse(dto.getFecha()));
        entrenamiento.setNotas(dto.getNotas());
        entrenamiento.setDuracion(dto.getDuracion());

        List<EntrenamientoEjercicio> lista = new ArrayList<>();

        if (dto.getEjercicios() != null) {
            for (EjercicioDTO ejDTO : dto.getEjercicios()) {
                Ejercicio ejercicio = new Ejercicio();
                ejercicio.setNombre(ejDTO.getNombre());
                ejercicio.setGrupoMuscular("");
                ejercicioRepository.save(ejercicio);

                EntrenamientoEjercicio ee = new EntrenamientoEjercicio();
                ee.setEjercicio(ejercicio);
                ee.setEntrenamiento(entrenamiento);
                ee.setSeries(ejDTO.getSeries());
                ee.setRepeticiones(ejDTO.getRepeticiones());
                ee.setPesoKg(ejDTO.getPesoKg());
                lista.add(ee);
            }
        }

        entrenamiento.setEjercicios(lista);
        return entrenamientoRepository.save(entrenamiento);
    }
}