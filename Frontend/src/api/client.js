import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // API URL
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getCiudadanos() {
    return apiClient.get('/ciudadanos');
  },
  getCiudadano(id) {
    return apiClient.get(`/ciudadanos/${id}`);
  },
  createCiudadano(ciudadano) {
    return apiClient.post('/ciudadanos', ciudadano);
  },
  updateCiudadano(id, ciudadano) {
    return apiClient.put(`/ciudadanos/${id}`, ciudadano);
  },
  searchCiudadanos(query) {
    return apiClient.get('/ciudadanos/buscar', { params: query });
  }
}