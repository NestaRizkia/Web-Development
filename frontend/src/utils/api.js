import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
  ? '/api' // Production: same domain
  : 'http://localhost:5000/api'; // Development: proxy

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
