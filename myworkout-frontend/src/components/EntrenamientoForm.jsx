import { useState } from 'react';
import { entrenamientoService } from '../services/api';

function EntrenamientoForm({ onGuardado }) {
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await entrenamientoService.create({ fecha, notas });
    setFecha('');
    setNotas('');
    onGuardado();
  };

  return (
    <div className="form-container">
      <h2>Nuevo Entrenamiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Notas</label>
          <input
            type="text"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Ej: Día de pierna, Fuerza..."
          />
        </div>
        <div className="btn-group" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary">Guardar 💪</button>
          <button type="button" className="btn btn-secondary" onClick={onGuardado}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EntrenamientoForm;