// src/utils/axiosInstance.js
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL, // Auto picks from .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401/403 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      toast.error('⚠️ Please login to continue', {
        position: 'top-center',
      });
      localStorage.removeItem('token'); // clear invalid token
      localStorage.removeItem('role');
      window.location.href = '/login'; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
