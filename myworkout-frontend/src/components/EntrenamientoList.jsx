import { useState, useEffect } from 'react';
import { entrenamientoService } from '../services/api';

function EntrenamientoList({ onSelect, onNew }) {
  const [entrenamientos, setEntrenamientos] = useState([]);

  useEffect(() => {
    cargarEntrenamientos();
  }, []);

  const cargarEntrenamientos = async () => {
    const res = await entrenamientoService.getAll();
    setEntrenamientos(res.data);
  };

  const eliminar = async (id) => {
    await entrenamientoService.delete(id);
    cargarEntrenamientos();
  };

  return (
    <div>
      <h2>Mis Entrenamientos</h2>
      <button className="btn-new" onClick={onNew}>+ Nuevo Entrenamiento</button>
      {entrenamientos.length === 0 && (
        <p className="empty">No hay entrenamientos todavía. ¡Empieza ahora! 💪</p>
      )}
      {entrenamientos.map(e => (
        <div className="card" key={e.id}>
          <span>📅 {e.fecha} — {e.notas}</span>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={() => onSelect(e)}>Ver</button>
            <button className="btn btn-danger" onClick={() => eliminar(e.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntrenamientoList;