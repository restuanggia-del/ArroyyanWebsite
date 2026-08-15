import api from "./api.js";

export const getAllProduk = () => api.get("/produk/admin/all");
export const getProdukById = (id) => api.get(`/produk/${id}`);
export const createProduk = (formData) =>
  api.post("/produk", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduk = (id, formData) =>
  api.put(`/produk/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProduk = (id) => api.delete(`/produk/${id}`);
