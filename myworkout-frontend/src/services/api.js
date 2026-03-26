import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const ejercicioService = {
  getAll: () => axios.get(`${API_URL}/ejercicios`),
  getById: (id) => axios.get(`${API_URL}/ejercicios/${id}`),
  create: (data) => axios.post(`${API_URL}/ejercicios`, data),
  update: (id, data) => axios.put(`${API_URL}/ejercicios/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/ejercicios/${id}`)
};

export const entrenamientoService = {
  getAll: () => axios.get(`${API_URL}/entrenamientos`),
  getById: (id) => axios.get(`${API_URL}/entrenamientos/${id}`),
  create: (data) => axios.post(`${API_URL}/entrenamientos`, data),
  update: (id, data) => axios.put(`${API_URL}/entrenamientos/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/entrenamientos/${id}`)
};