import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { HttpError } from "../lib/HttpError.js";

export async function requireAdmin(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) return next(new HttpError(503, "Admin authentication is not configured."));
  const match = (req.get("authorization") || "").match(/^Bearer\s+(.+)$/i);
  if (!match) return next(new HttpError(401, "A valid admin JWT is required."));

  let payload;
  try {
    payload = jwt.verify(match[1], secret, {
      algorithms: ["HS256"],
      issuer: "ishconnect-cms",
      audience: "ishconnect-admin",
    });
  } catch {
    return next(new HttpError(401, "The admin JWT is invalid or expired."));
  }

  if (payload.role !== "admin" || typeof payload.sub !== "string" || !Number.isInteger(payload.tokenVersion)) {
    return next(new HttpError(403, "Administrator access is required."));
  }
  const admin = await Admin.findById(payload.sub);
  if (!admin || !admin.active || admin.role !== "admin" || admin.tokenVersion !== payload.tokenVersion) {
    return next(new HttpError(401, "Admin session is invalid or has been revoked."));
  }
  req.admin = admin;
  return next();
}
