import api from "./api.js";

export const getPengaturan = () => api.get("/pengaturan");
export const updatePengaturan = (data) => api.put("/pengaturan", data);
