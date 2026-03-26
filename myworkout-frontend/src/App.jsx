import { useState, useEffect } from 'react';
import { entrenamientoService } from './services/api';

function App() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ejercicios, setEjercicios] = useState([
    { nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }
  ]);
  const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem('nombre') || '');
  const [mostrarBienvenida, setMostrarBienvenida] = useState(!localStorage.getItem('nombre'));
  const [inputNombre, setInputNombre] = useState('');
  const [filtro, setFiltro] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarEntrenamientos();
  }, []);

  const cargarEntrenamientos = async () => {
    const res = await entrenamientoService.getAll();
    const data = Array.isArray(res.data) ? res.data : [];
    setEntrenamientos(data);
  };

  const guardarNombre = () => {
    if (inputNombre.trim()) {
      localStorage.setItem('nombre', inputNombre.trim());
      setNombreUsuario(inputNombre.trim());
      setMostrarBienvenida(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    setNombreUsuario('');
    setInputNombre('');
    setMostrarBienvenida(true);
  };

  const abrirEditar = (e) => {
    setEditando(e);
    setFecha(e.fecha);
    setNotas(e.notas || '');
    setDuracion(e.duracion || '');
    setEjercicios(e.ejercicios?.map(ej => ({
      nombre: ej.ejercicio.nombre,
      series: ej.series,
      repeticiones: ej.repeticiones,
      pesoKg: ej.pesoKg
    })) || [{ nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }]);
    setModalAbierto(true);
  };

  const abrirNuevo = () => {
    setEditando(null);
    setFecha('');
    setNotas('');
    setDuracion('');
    setEjercicios([{ nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }]);
    setModalAbierto(true);
  };

  const eliminar = async (id, e) => {
    e.stopPropagation();
    const confirmar = window.confirm('¿Estás segura de que quieres eliminar este entrenamiento?');
    if (!confirmar) return;
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
      setCargando(true);
      if (editando) {
        await entrenamientoService.update(editando.id, { fecha, notas, duracion });
      } else {
        await entrenamientoService.create({ fecha, notas, duracion, ejercicios });
      }
      setModalAbierto(false);
      setEditando(null);
      setFecha('');
      setNotas('');
      setDuracion('');
      setEjercicios([{ nombre: '', series: 3, repeticiones: 10, pesoKg: 0 }]);
      cargarEntrenamientos();
    } catch (error) {
      console.error('Error al guardar:', error.response?.data || error.message);
    } finally {
      setCargando(false);
    }
  };

  const entrenamientosFiltrados = entrenamientos.filter(e => {
    if (!filtro) return true;
    return (
      e.notas?.toLowerCase().includes(filtro.toLowerCase()) ||
      e.fecha?.includes(filtro)
    );
  });

  const entrenamientosEsteMes = entrenamientos.filter(e => {
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    const fecha = new Date(e.fecha);
    return fecha.getMonth() === mes && fecha.getFullYear() === anio;
  }).length;

  if (mostrarBienvenida) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#1e293b',
          borderRadius: '20px',
          padding: '48px',
          width: '90%',
          maxWidth: '480px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💪</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
            MyWorkout
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
            Tu diario personal de entrenamientos
          </p>
          <div style={{ textAlign: 'left', marginBottom: '24px' }}>
            <label style={{
              display: 'block', color: '#94a3b8', fontSize: '0.85rem',
              fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase'
            }}>
              ¿Cómo te llamas?
            </label>
            <input
              type="text"
              placeholder="Escribe tu nombre..."
              value={inputNombre}
              onChange={(e) => setInputNombre(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && guardarNombre()}
              style={{
                width: '100%', padding: '14px', borderRadius: '10px',
                border: '1px solid #334155', background: '#0f172a',
                color: 'white', fontSize: '1rem', outline: 'none'
              }}
            />
          </div>
          <button onClick={guardarNombre} style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(90deg, #f97316, #ef4444)',
            color: 'white', border: 'none', borderRadius: '10px',
            fontSize: '1rem', fontWeight: '800', cursor: 'pointer'
          }}>
            ¡Empezar! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>💪 MyWorkout</h1>
          <p>¡Hola, <strong>{nombreUsuario}</strong>! Registra tus entrenamientos y alcanza tus objetivos 🔥</p>
        </div>
        <button onClick={cerrarSesion} style={{
          background: 'transparent', border: '1px solid #475569',
          color: '#94a3b8', borderRadius: '8px', padding: '8px 16px',
          cursor: 'pointer', fontSize: '0.85rem'
        }}>
          Cerrar sesión
        </button>
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
          <button className="btn-new" onClick={abrirNuevo}>
            + Nuevo Entrenamiento
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="🔍 Filtrar por tipo o fecha (ej: piernas, 2026-03)..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '10px',
              border: '1px solid #1e293b', background: '#1e293b',
              color: 'white', fontSize: '0.95rem', outline: 'none'
            }}
          />
        </div>

        {entrenamientosFiltrados.length === 0 && (
          <p className="empty">
            {filtro ? 'No hay entrenamientos que coincidan con tu búsqueda.' : 'No hay entrenamientos todavía. ¡Empieza ahora! 💪'}
          </p>
        )}

        <div className="entrenamientos-grid">
          {entrenamientosFiltrados.map(e => (
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
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={() => abrirEditar(e)}
                  style={{
                    flex: 1, background: '#1e3a5f', color: '#60a5fa',
                    border: 'none', borderRadius: '8px', padding: '6px 14px',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700'
                  }}
                >
                  ✏️ Editar
                </button>
                <button className="btn-eliminar" style={{ flex: 1 }}
                  onClick={(ev) => eliminar(e.id, ev)}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editando ? '✏️ Editar Entrenamiento' : 'Nuevo Entrenamiento'}</h2>
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

            {!editando && (
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
                        <input type="number" value={ej.series}
                          onChange={(e) => actualizarEjercicio(index, 'series', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Reps</label>
                        <input type="number" value={ej.repeticiones}
                          onChange={(e) => actualizarEjercicio(index, 'repeticiones', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Peso (kg)</label>
                        <input type="number" value={ej.pesoKg}
                          onChange={(e) => actualizarEjercicio(index, 'pesoKg', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={() => setModalAbierto(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={guardarEntrenamiento} disabled={cargando}>
                {cargando ? 'Guardando...' : editando ? 'Actualizar' : 'Guardar Entrenamiento'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;