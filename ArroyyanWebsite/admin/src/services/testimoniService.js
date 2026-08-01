import api from "./api.js";

export const getAllTestimoni = () => api.get("/testimoni/admin/all");
export const createTestimoni = (formData) =>
  api.post("/testimoni", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteTestimoni = (id) => api.delete(`/testimoni/${id}`);
