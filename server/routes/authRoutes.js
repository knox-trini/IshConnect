import express from "express";
import rateLimit from "express-rate-limit";
import { changePassword, login, logout, me, signup, setupStatus } from "./auth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();
router.get("/setup-status", setupStatus);
router.post("/signup", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}), signup);
router.post("/login", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}), login);
router.get("/me", requireAdmin, me);
router.post("/logout", requireAdmin, logout);
router.post("/change-password", requireAdmin, changePassword);
export default router;
