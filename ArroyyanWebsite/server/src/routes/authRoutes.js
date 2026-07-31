import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
// router.post("/register", registerAdmin); // sebaiknya dinonaktifkan/dilindungi setelah admin pertama dibuat

export default router;
