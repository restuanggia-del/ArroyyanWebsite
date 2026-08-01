import express from "express";
import {
  getTestimoni,
  getAllTestimoniAdmin,
  createTestimoni,
  deleteTestimoni,
} from "../controllers/testimoniController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getTestimoni);
router.get("/admin/all", protect, getAllTestimoniAdmin);
router.post("/", protect, upload.single("foto"), createTestimoni);
router.delete("/:id", protect, deleteTestimoni);

export default router;
