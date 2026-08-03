import express from "express";
import {
  createKontak,
  getKontak,
  toggleDibaca,
  deleteKontak,
} from "../controllers/kontakController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createKontak);
router.get("/", protect, getKontak);
router.patch("/:id/dibaca", protect, toggleDibaca);
router.delete("/:id", protect, deleteKontak);

export default router;
