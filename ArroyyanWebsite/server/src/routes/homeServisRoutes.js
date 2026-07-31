import express from "express";
import {
  getHomeServis,
  updateHomeServis,
} from "../controllers/homeServisController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getHomeServis);
router.put("/", protect, updateHomeServis);

export default router;
