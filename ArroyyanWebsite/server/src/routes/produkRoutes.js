import express from "express";
import {
  getProduk,
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
router.get("/:id", getProdukById);

// Privat (dipakai oleh admin, butuh token)
router.post("/", protect, upload.single("gambar"), createProduk);
router.put("/:id", protect, upload.single("gambar"), updateProduk);
router.delete("/:id", protect, deleteProduk);

export default router;
