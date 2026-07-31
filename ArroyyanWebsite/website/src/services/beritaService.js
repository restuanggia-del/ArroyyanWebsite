import api from "./api.js";

export const getAllBerita = (kategori) =>
  api.get("/berita", { params: kategori ? { kategori } : {} });

export const getBeritaBySlug = (slug) => api.get(`/berita/${slug}`);
