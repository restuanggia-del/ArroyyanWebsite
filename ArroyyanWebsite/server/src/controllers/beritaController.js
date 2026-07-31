import Berita from "../models/Berita.js";

export const getBerita = async (req, res) => {
  try {
    const filter = { status: "publish" };
    if (req.query.kategori) filter.kategori = req.query.kategori;
    const berita = await Berita.find(filter).sort({ createdAt: -1 });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBeritaAdmin = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ createdAt: -1 });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita)
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBeritaBySlug = async (req, res) => {
  try {
    const berita = await Berita.findOne({ slug: req.params.slug });
    if (!berita)
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBerita = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = `/uploads/${req.file.filename}`;
    const berita = await Berita.create(data);
    res.status(201).json(berita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBerita = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = `/uploads/${req.file.filename}`;
    const berita = await Berita.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!berita)
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    res.json(berita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findByIdAndDelete(req.params.id);
    if (!berita)
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    res.json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
