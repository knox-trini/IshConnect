import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port = Number(process.env.PORT) || 4000;
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is required.");
  process.exit(1);
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error("JWT_SECRET must contain at least 32 characters.");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const server = app.listen(port, () => console.log("IshConnect CMS API listening on port " + port));

  let shuttingDown = false;
  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log("Received " + signal + "; closing server.");
    const forceExit = setTimeout(() => process.exit(1), 10000);
    forceExit.unref();
    server.close(async (error) => {
      try {
        await mongoose.disconnect();
        clearTimeout(forceExit);
        process.exit(error ? 1 : 0);
      } catch (disconnectError) {
        console.error("Error closing MongoDB connection.", disconnectError);
        process.exit(1);
      }
    });
  };
  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
} catch (error) {
  console.error("Could not connect to MongoDB.", error);
  process.exit(1);
}
