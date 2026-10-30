import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";

const email = process.env.ADMIN_INITIAL_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_INITIAL_PASSWORD;

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required.");
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Set a valid ADMIN_INITIAL_EMAIL.");
if (!password || password.length < 12 || password.length > 256) throw new Error("ADMIN_INITIAL_PASSWORD must be at least 12 characters.");

await mongoose.connect(process.env.MONGODB_URI);
try {
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists for " + email + "; no account or password was changed.");
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    await Admin.create({ email, passwordHash, role: "admin", active: true });
    console.log("Initial administrator created: " + email);
  }
} finally {
  await mongoose.disconnect();
}
