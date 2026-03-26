import { useState, useEffect } from 'react';
import { entrenamientoService } from '../services/api';

function EntrenamientoDetalle({ entrenamiento, onVolver }) {
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    cargarDetalle();
  }, [entrenamiento]);

  const cargarDetalle = async () => {
    const res = await entrenamientoService.getById(entrenamiento.id);
    setDetalle(res.data);
  };

  if (!detalle) return <p className="empty">Cargando...</p>;

  return (
    <div className="detalle-box">
      <h2>Detalle del Entrenamiento</h2>
      <p><strong>Fecha:</strong> {detalle.fecha}</p>
      <p><strong>Notas:</strong> {detalle.notas}</p>
      <h2 style={{ marginTop: '20px' }}>Ejercicios</h2>
      {detalle.ejercicios && detalle.ejercicios.length === 0 && (
        <p className="empty">No hay ejercicios en este entrenamiento.</p>
      )}
      {detalle.ejercicios && detalle.ejercicios.map(e => (
        <div className="ejercicio-item" key={e.id}>
          🏋️ {e.ejercicio.nombre} — {e.series} series x {e.repeticiones} reps — {e.pesoKg}kg
        </div>
      ))}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button className="btn btn-secondary" onClick={onVolver}>← Volver</button>
      </div>
    </div>
  );
}

export default EntrenamientoDetalle;