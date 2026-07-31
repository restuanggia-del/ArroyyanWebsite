import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Sisipkan token admin secara otomatis di setiap request
api.interceptors.request.use((config) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (admin?.token) {
    config.headers.Authorization = `Bearer ${admin.token}`;
  }
  return config;
});

export default api;
