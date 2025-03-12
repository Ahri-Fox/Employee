import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: 'https://reqres.in/api',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });
  
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  export default api;