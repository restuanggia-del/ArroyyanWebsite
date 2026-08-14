import express from "express";
import {
  loginAdmin,
  registerAdmin,
  updateProfil,
  gantiPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", protect, registerAdmin);
router.put("/profil", protect, updateProfil);
router.put("/ganti-password", protect, gantiPassword);

export default router;
