import express from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { createContent, deleteContent, listAdminContent, updateContent } from "./content.js";

const router = express.Router();
router.use(requireAdmin);
router.get("/:type", listAdminContent);
router.post("/:type", createContent);
router.patch("/:type/:id", updateContent);
router.delete("/:type/:id", deleteContent);
export default router;
