import Kontak from "../models/Kontak.js";

// @route  POST /api/kontak  (publik, dari form kontak di website)
export const createKontak = async (req, res) => {
  try {
    const kontak = await Kontak.create(req.body);
    res.status(201).json({ message: "Pesan berhasil dikirim", kontak });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route  GET /api/kontak  (admin, lihat semua pesan masuk)
export const getKontak = async (req, res) => {
  try {
    const kontak = await Kontak.find().sort({ createdAt: -1 });
    res.json(kontak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
