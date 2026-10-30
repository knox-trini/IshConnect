import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { HttpError } from "../lib/HttpError.js";

const jwtOptions = { issuer: "ishconnect-cms", audience: "ishconnect-admin" };

export async function setupStatus(req, res) {
  const count = await Admin.countDocuments({});
  res.json({ hasAdmin: count > 0 });
}

export async function signup(req, res) {
  const count = await Admin.countDocuments({});
  if (count > 0) throw new HttpError(403, "Admin account already exists. Use sign in.");
  const body = req.body ?? {};
  if (Object.keys(body).some((key) => !["email", "password"].includes(key))) throw new HttpError(400, "Unsupported signup fields.");
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 256) {
    throw new HttpError(400, "Valid email and password of at least 12 characters are required.");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await Admin.create({ email, passwordHash, role: "admin", active: true, tokenVersion: 0 });
  const token = jwt.sign(
    { role: "admin", tokenVersion: admin.tokenVersion },
    process.env.JWT_SECRET,
    { ...jwtOptions, subject: admin.id, expiresIn: "15m", algorithm: "HS256" },
  );
  res.status(201).json({ token, tokenType: "Bearer", expiresIn: 900, admin: { id: admin.id, email: admin.email, role: admin.role } });
}

export async function login(req, res) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new HttpError(400, "Request body must be a JSON object.");
  if (Object.keys(body).some((key) => !["email", "password"].includes(key))) throw new HttpError(400, "Unsupported login fields.");
  if (typeof body.email !== "string" || typeof body.password !== "string" || body.email.length > 254 || body.password.length < 1 || body.password.length > 256) {
    throw new HttpError(400, "Email and password are required.");
  }

  const admin = await Admin.findOne({ email: body.email.trim().toLowerCase() }).select("+passwordHash");
  const hash = admin?.passwordHash || "$2b$12$C6UzMDM.H6dfI/f/IKcEe.6vBWhj9TK6pJ8VxI9W2UB1Vq9Xz7ORe";
  const validPassword = await bcrypt.compare(body.password, hash);
  if (!admin || !admin.active || !validPassword) throw new HttpError(401, "Invalid email or password.");

  admin.lastLoginAt = new Date();
  await admin.save();
  const token = jwt.sign(
    { role: "admin", tokenVersion: admin.tokenVersion },
    process.env.JWT_SECRET,
    { ...jwtOptions, subject: admin.id, expiresIn: "15m", algorithm: "HS256" },
  );
  res.json({ token, tokenType: "Bearer", expiresIn: 900, admin: { id: admin.id, email: admin.email, role: admin.role } });
}

export async function me(req, res) {
  res.json({ admin: { id: req.admin.id, email: req.admin.email, role: req.admin.role } });
}

export async function logout(req, res) {
  req.admin.tokenVersion += 1;
  await req.admin.save();
  res.status(204).end();
}

export async function changePassword(req, res) {
  const body = req.body ?? {};
  if (Object.keys(body).some((key) => !["currentPassword", "newPassword"].includes(key))) throw new HttpError(400, "Unsupported password-change fields.");
  const { currentPassword, newPassword } = body;
  if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 12 || newPassword.length > 256) {
    throw new HttpError(400, "Current password and a new password of at least 12 characters are required.");
  }
  const admin = await Admin.findById(req.admin.id).select("+passwordHash");
  if (!admin || !await bcrypt.compare(currentPassword, admin.passwordHash)) throw new HttpError(401, "Current password is incorrect.");
  admin.passwordHash = await bcrypt.hash(newPassword, 12);
  admin.tokenVersion += 1;
  await admin.save();
  res.json({ message: "Password updated. Sign in again with the new password." });
}

export const adminJwtOptions = jwtOptions;
