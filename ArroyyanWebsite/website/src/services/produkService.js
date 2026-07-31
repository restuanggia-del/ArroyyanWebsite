import api from "./api.js";

// Ambil semua produk, opsional filter kategori: "cup" | "botol" | "galon"
export const getAllProduk = (kategori) =>
  api.get("/produk", { params: kategori ? { kategori } : {} });

// Ambil produk unggulan untuk ditampilkan di Beranda
export const getProdukUnggulan = () =>
  api.get("/produk", { params: { unggulan: true } });

// Ambil detail satu produk
export const getProdukById = (id) => api.get(`/produk/${id}`);
