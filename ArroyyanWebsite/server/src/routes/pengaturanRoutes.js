import express from "express";
import {
  getPengaturan,
  updatePengaturan,
} from "../controllers/pengaturanController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPengaturan);
router.put("/", protect, updatePengaturan);

export default router;
