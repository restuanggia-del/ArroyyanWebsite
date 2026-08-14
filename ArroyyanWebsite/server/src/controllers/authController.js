import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        nama: admin.nama,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Email atau password salah" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const admin = await Admin.create({ nama, email, password });
    res.status(201).json({
      _id: admin._id,
      nama: admin.nama,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfil = async (req, res) => {
  try {
    const { nama } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({ message: "Nama tidak boleh kosong" });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin tidak ditemukan" });
    }

    admin.nama = nama.trim();
    await admin.save();

    res.json({
      _id: admin._id,
      nama: admin.nama,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const gantiPassword = async (req, res) => {
  try {
    const { sandiLama, sandiBaru } = req.body;

    if (!sandiLama || !sandiBaru) {
      return res
        .status(400)
        .json({ message: "Password saat ini dan password baru wajib diisi" });
    }
    if (sandiBaru.length < 8) {
      return res
        .status(400)
        .json({ message: "Password baru minimal 8 karakter" });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin tidak ditemukan" });
    }

    const cocok = await admin.matchPassword(sandiLama);
    if (!cocok) {
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    admin.password = sandiBaru;
    await admin.save();

    res.json({ message: "Password berhasil diganti" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
