import express from "express";
import { getTentang, updateTentang } from "../controllers/tentangController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getTentang);
router.put("/", protect, upload.single("foto"), updateTentang);

export default router;
