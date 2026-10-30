import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import adminContentRoutes from "./routes/adminContentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { HttpError } from "./lib/HttpError.js";
const app = express();
const origins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);
app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || origins.length === 0 || origins.includes(origin)) return cb(null, true);
      return cb(new HttpError(403, "Origin is not allowed."));
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "100kb", strict: true }));
app.use(
  "/api",
  rateLimit({ windowMs: 900000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false }),
);
app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? "ok" : "database unavailable" });
});
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/admin/content", adminContentRoutes);
app.use("/api/events", eventRoutes);
app.use((req, res, next) => next(new HttpError(404, "Route not found.")));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof SyntaxError && Object.hasOwn(error, "body"))
    return res.status(400).json({ error: "Invalid JSON body." });
  if (error?.code === 11000)
    return res.status(409).json({ error: "A record with this id already exists." });
  if (error instanceof mongoose.Error.ValidationError)
    return res.status(400).json({
      error: "Validation failed.",
      details: Object.values(error.errors).map((x) => x.message),
    });
  if (error instanceof mongoose.Error.CastError)
    return res.status(400).json({ error: "Invalid value for " + error.path + "." });
  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: status >= 500 ? "Internal server error." : error.message,
    ...(error.details ? { details: error.details } : {}),
  });
});
export default app;
