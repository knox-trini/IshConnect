import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
      unique: true,
      immutable: true,
    },
    type: { type: String, required: true, enum: ["bootcamp", "meetup", "workshop", "hackathon"] },
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 160 },
    date: {
      type: String,
      required: true,
      validate: {
        validator: (v) =>
          /^\d{4}-\d{2}-\d{2}$/.test(v) &&
          !Number.isNaN(Date.parse(v)) &&
          new Date(v + "T00:00:00.000Z").toISOString().slice(0, 10) === v,
        message: "Date must use YYYY-MM-DD.",
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v),
        message: "Time must use HH:mm.",
      },
    },
    location: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
    summary: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 },
    link: {
      type: String,
      trim: true,
      maxlength: 2048,
      validate: {
        validator: (v) => !v || v.startsWith("/") || /^https?:\/\/\S+$/i.test(v),
        message: "Link must be HTTP(S) or site-relative.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: "version",
    id: false,
    optimisticConcurrency: true,
    strict: "throw",
  },
);
eventSchema.index({ date: 1, time: 1 });
export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
