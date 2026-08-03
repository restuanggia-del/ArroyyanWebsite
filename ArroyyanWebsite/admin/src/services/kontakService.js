import api from "./api.js";

export const getAllKontak = () => api.get("/kontak");
export const toggleDibaca = (id) => api.patch(`/kontak/${id}/dibaca`);
export const deleteKontak = (id) => api.delete(`/kontak/${id}`);
