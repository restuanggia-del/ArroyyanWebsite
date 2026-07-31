import express from "express";
import { getBanner, createBanner, deleteBanner } from "../controllers/bannerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBanner);
router.post("/", protect, upload.single("gambar"), createBanner);
router.delete("/:id", protect, deleteBanner);

export default router;
