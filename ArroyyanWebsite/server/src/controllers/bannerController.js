import Banner from "../models/Banner.js";

export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.find({ aktif: true }).sort({ urutan: 1 });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = `/uploads/${req.file.filename}`;
    const banner = await Banner.create(data);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner tidak ditemukan" });
    res.json({ message: "Banner berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
