import api from "./api.js";

export const getAllBerita = () => api.get("/berita");
export const createBerita = (formData) =>
  api.post("/berita", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateBerita = (id, formData) =>
  api.put(`/berita/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteBerita = (id) => api.delete(`/berita/${id}`);
