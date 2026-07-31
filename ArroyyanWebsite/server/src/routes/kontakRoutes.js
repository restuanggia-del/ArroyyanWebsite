import express from "express";
import { createKontak, getKontak } from "../controllers/kontakController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createKontak);
router.get("/", protect, getKontak);

export default router;
