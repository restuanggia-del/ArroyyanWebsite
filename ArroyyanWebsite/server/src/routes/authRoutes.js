import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", protect, registerAdmin);

export default router;
