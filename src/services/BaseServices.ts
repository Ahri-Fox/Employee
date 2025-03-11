import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
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

class BaseService {
  get<T>(url: string, params?: object) {
    return api.get<T>(url, { params });
  }

  post<T>(url: string, data?: object) {
    return api.post<T>(url, data);
  }

  put<T>(url: string, data?: object) {
    return api.put<T>(url, data);
  }

  delete<T>(url: string) {
    return api.delete<T>(url);
  }
}

export default new BaseService();
