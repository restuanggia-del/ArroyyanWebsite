import Kontak from "../models/Kontak.js";

export const createKontak = async (req, res) => {
  try {
    const kontak = await Kontak.create(req.body);
    res.status(201).json({ message: "Pesan berhasil dikirim", kontak });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getKontak = async (req, res) => {
  try {
    const kontak = await Kontak.find().sort({ createdAt: -1 });
    res.json(kontak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleDibaca = async (req, res) => {
  try {
    const kontak = await Kontak.findById(req.params.id);
    if (!kontak)
      return res.status(404).json({ message: "Pesan tidak ditemukan" });

    kontak.dibaca = !kontak.dibaca;
    await kontak.save();
    res.json(kontak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteKontak = async (req, res) => {
  try {
    const kontak = await Kontak.findByIdAndDelete(req.params.id);
    if (!kontak)
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    res.json({ message: "Pesan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
