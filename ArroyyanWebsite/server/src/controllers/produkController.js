import Produk from "../models/Produk.js";

// @route  GET /api/produk  (publik, dengan filter kategori opsional ?kategori=cup)
export const getProduk = async (req, res) => {
  try {
    const filter = { status: "aktif" };
    if (req.query.kategori) filter.kategori = req.query.kategori;
    if (req.query.unggulan) filter.unggulan = true;

    const produk = await Produk.find(filter).sort({ createdAt: -1 });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/produk/:id  (publik, detail satu produk)
export const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);
    if (!produk) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(produk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/produk  (admin, butuh login)
export const createProduk = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = `/uploads/${req.file.filename}`;

    const produk = await Produk.create(data);
    res.status(201).json(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route  PUT /api/produk/:id  (admin, butuh login)
export const updateProduk = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.gambar = `/uploads/${req.file.filename}`;

    const produk = await Produk.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!produk) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(produk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @route  DELETE /api/produk/:id  (admin, butuh login)
export const deleteProduk = async (req, res) => {
  try {
    const produk = await Produk.findByIdAndDelete(req.params.id);
    if (!produk) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
