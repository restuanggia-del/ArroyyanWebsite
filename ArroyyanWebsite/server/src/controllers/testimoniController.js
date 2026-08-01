import Testimoni from "../models/Testimoni.js";

export const getTestimoni = async (req, res) => {
  try {
    const testimoni = await Testimoni.find({ aktif: true }).sort({
      createdAt: -1,
    });
    res.json(testimoni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTestimoniAdmin = async (req, res) => {
  try {
    const testimoni = await Testimoni.find().sort({ createdAt: -1 });
    res.json(testimoni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTestimoni = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.foto = `/uploads/${req.file.filename}`;
    const testimoni = await Testimoni.create(data);
    res.status(201).json(testimoni);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTestimoni = async (req, res) => {
  try {
    const testimoni = await Testimoni.findByIdAndDelete(req.params.id);
    if (!testimoni)
      return res.status(404).json({ message: "Testimoni tidak ditemukan" });
    res.json({ message: "Testimoni berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
