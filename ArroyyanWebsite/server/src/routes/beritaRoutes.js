import express from "express";
import {
  getBerita,
  getBeritaBySlug,
  createBerita,
  updateBerita,
  deleteBerita,
} from "../controllers/beritaController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBerita);
router.get("/:slug", getBeritaBySlug);

router.post("/", protect, upload.single("gambar"), createBerita);
router.put("/:id", protect, upload.single("gambar"), updateBerita);
router.delete("/:id", protect, deleteBerita);

export default router;
