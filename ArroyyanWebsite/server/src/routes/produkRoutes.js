import express from "express";
import {
  getProduk,
  getAllProdukAdmin,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produkController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Publik (dipakai oleh website)
router.get("/", getProduk);

// Privat (dipakai oleh admin, butuh token) — harus didefinisikan sebelum "/:id"
router.get("/admin/all", protect, getAllProdukAdmin);

router.get("/:id", getProdukById);

// Privat (dipakai oleh admin, butuh token)
router.post("/", protect, upload.single("gambar"), createProduk);
router.put("/:id", protect, upload.single("gambar"), updateProduk);
router.delete("/:id", protect, deleteProduk);

export default router;
