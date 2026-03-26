import { useState, useEffect } from 'react';
import { entrenamientoService } from './services/api';

function App() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ejercicios, setEjercicios] = useState([
    { nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }
  ]);

  useEffect(() => {
    cargarEntrenamientos();
  }, []);

  const cargarEntrenamientos = async () => {
    const res = await entrenamientoService.getAll();
    const data = Array.isArray(res.data) ? res.data : [];
    setEntrenamientos(data);
  };

  const eliminar = async (id, e) => {
    e.stopPropagation();
    await entrenamientoService.delete(id);
    cargarEntrenamientos();
  };

  const agregarEjercicio = () => {
    setEjercicios([...ejercicios, { nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }]);
  };
  const actualizarEjercicio = (index, campo, valor) => {
    const nuevos = [...ejercicios];
    if (campo === 'series' || campo === 'repeticiones') {
      nuevos[index][campo] = valor === '' ? 0 : parseInt(valor) || 0;
    } else if (campo === 'pesoKg') {
      nuevos[index][campo] = valor === '' ? 0 : parseFloat(valor) || 0;
    } else {
      nuevos[index][campo] = valor;
    }
    setEjercicios(nuevos);
  };

 const guardarEntrenamiento = async () => {
    try {
      console.log('Datos a enviar:', { fecha, notas, duracion, ejercicios });
      const res = await entrenamientoService.create({ fecha, notas, duracion, ejercicios });
      console.log('Respuesta:', res);
      setModalAbierto(false);
      setFecha('');
      setNotas('');
      setDuracion('');
      setEjercicios([{ nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }]);
      cargarEntrenamientos();
    } catch (error) {
      console.error('Error al guardar:', error.response?.data || error.message);
    }
  };
  const entrenamientosEsteMes = entrenamientos.filter(e => {
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    const fecha = new Date(e.fecha);
    return fecha.getMonth() === mes && fecha.getFullYear() === anio;
  }).length;

  return (
    <div>
      <div className="header">
        <h1>💪 MyWorkout</h1>
        <p>Registra tus entrenamientos, sigue tu progreso y alcanza tus objetivos fitness</p>
      </div>

      <div className="main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info">
              <p>Entrenamientos este mes</p>
              <h2>{entrenamientosEsteMes}</h2>
              <span>Total registrados: {entrenamientos.length}</span>
            </div>
            <div className="stat-icon icon-orange">📅</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <p>Ejercicios registrados</p>
              <h2>{entrenamientos.reduce((acc, e) => acc + (e.ejercicios?.length || 0), 0)}</h2>
              <span>En todos los entrenamientos</span>
            </div>
            <div className="stat-icon icon-teal">📈</div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <p>Último entrenamiento</p>
              <h2 style={{ fontSize: '1.2rem' }}>
                {entrenamientos.length > 0 ? entrenamientos[entrenamientos.length - 1].fecha : '—'}
              </h2>
              <span>¡Sigue así!</span>
            </div>
            <div className="stat-icon icon-yellow">🎯</div>
          </div>
        </div>

        <div className="historial-header">
          <h2>Historial de Entrenamientos</h2>
          <button className="btn-new" onClick={() => setModalAbierto(true)}>
            + Nuevo Entrenamiento
          </button>
        </div>

        {entrenamientos.length === 0 && (
          <p className="empty">No hay entrenamientos todavía. ¡Empieza ahora! 💪</p>
        )}

        <div className="entrenamientos-grid">
          {entrenamientos.map(e => (
            <div className="entrenamiento-card" key={e.id}>
              <h3>{e.notas || 'Entrenamiento'}</h3>
              <p className="fecha">📅 {e.fecha}</p>
              {e.ejercicios && e.ejercicios.map(ej => (
                <div className="ejercicio-row" key={ej.id}>
                  <span>{ej.ejercicio.nombre}</span>
                  <span>
                    {ej.series}x{ej.repeticiones}
                    {ej.pesoKg > 0 ? ` • ${ej.pesoKg}kg` : ''}
                  </span>
                </div>
              ))}
              {e.duracion && (
                <p className="duracion">📊 Duración: {e.duracion}</p>
              )}
              <button className="btn-eliminar" onClick={(ev) => eliminar(e.id, ev)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Nuevo Entrenamiento</h2>
              <button className="btn-close" onClick={() => setModalAbierto(false)}>✕</button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tipo de Entrenamiento</label>
                <input
                  type="text"
                  placeholder="Ej: Piernas, Pecho y Espalda..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Duración</label>
                <input
                  type="text"
                  placeholder="Ej: 60 min"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="ejercicios-section">
              <div className="ejercicios-header">
                <h3>Ejercicios</h3>
                <button className="btn-add-ejercicio" onClick={agregarEjercicio}>
                  + Agregar ejercicio
                </button>
              </div>

              {ejercicios.map((ej, index) => (
                <div className="ejercicio-form" key={index}>
                  <p>Ejercicio {index + 1}</p>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nombre del ejercicio"
                      value={ej.nombre}
                      onChange={(e) => actualizarEjercicio(index, 'nombre', e.target.value)}
                    />
                  </div>
                  <div className="ejercicio-inputs">
                    <div className="form-group">
                      <label>Series</label>
                      <input
                        type="number"
                        value={ej.series}
                        onChange={(e) => actualizarEjercicio(index, 'series', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Reps</label>
                      <input
                        type="number"
                        value={ej.repeticiones}
                        onChange={(e) => actualizarEjercicio(index, 'repeticiones', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="form-group">
                      <label>Peso (kg)</label>
                      <input
                        type="number"
                        value={ej.pesoKg}
                        onChange={(e) => actualizarEjercicio(index, 'pesoKg', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={() => setModalAbierto(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={guardarEntrenamiento}>Guardar Entrenamiento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;