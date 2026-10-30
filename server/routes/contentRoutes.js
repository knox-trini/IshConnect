import express from "express";
import { listPublicContent, getPublicContent } from "./content.js";

const router = express.Router();
router.get("/:type", listPublicContent);
router.get("/:type/:slug", getPublicContent);
export default router;
