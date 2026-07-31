import api from "./api.js";

export const kirimPesanKontak = (data) => api.post("/kontak", data);
