import mongoose from "mongoose";
import { HttpError } from "../lib/HttpError.js";
import { auditEvent } from "../lib/audit.js";
import { Event } from "../models/Event.js";

const allowedFields = ["type", "title", "date", "time", "location", "summary", "link"];
const eventTypes = new Set(["bootcamp", "meetup", "workshop", "hackathon"]);
const eventIdPattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$/;

function validateId(id) {
  if (typeof id !== "string" || !eventIdPattern.test(id)) {
    throw new HttpError(
      400,
      "Event id must contain only letters, numbers, hyphens, or underscores.",
    );
  }
  return id;
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00.000Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validatePayload(body, creating) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "Request body must be a JSON object.");
  }
  const unknown = Object.keys(body).filter((key) => key !== "id" && !allowedFields.includes(key));
  if (unknown.length) throw new HttpError(400, "Unsupported fields: " + unknown.join(", "));
  if (!creating && Object.hasOwn(body, "id")) {
    throw new HttpError(400, "Event id cannot be changed.");
  }

  const data = {};
  for (const key of allowedFields) {
    if (!Object.hasOwn(body, key)) continue;
    if (typeof body[key] !== "string") throw new HttpError(400, key + " must be a string.");
    data[key] = body[key].trim();
  }

  if (creating) {
    if (typeof body.id !== "string" || !body.id.trim())
      throw new HttpError(400, "Event id is required.");
    data.id = validateId(body.id.trim());
  }
  if (Object.hasOwn(data, "type") && !eventTypes.has(data.type)) {
    throw new HttpError(400, "Unsupported event type.");
  }
  for (const key of ["title", "date", "time", "location", "summary"]) {
    if (creating && !data[key]) throw new HttpError(400, key + " is required.");
    if (Object.hasOwn(data, key) && !data[key]) throw new HttpError(400, key + " cannot be empty.");
  }
  if (Object.hasOwn(data, "date") && !isValidDate(data.date)) {
    throw new HttpError(400, "Date must use a real calendar date in YYYY-MM-DD format.");
  }
  if (Object.hasOwn(data, "time") && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time)) {
    throw new HttpError(400, "Time must use HH:mm format.");
  }
  if (
    Object.hasOwn(data, "link") &&
    data.link &&
    !data.link.startsWith("/") &&
    !/^https?:\/\/\S+$/i.test(data.link)
  ) {
    throw new HttpError(400, "Link must be an HTTP(S) URL or site-relative path.");
  }
  const limits = { title: 160, location: 200, summary: 2000, link: 2048 };
  for (const [key, max] of Object.entries(limits)) {
    if (data[key]?.length > max)
      throw new HttpError(400, key + " must be " + max + " characters or fewer.");
  }
  return data;
}

function serialize(event) {
  return {
    id: event.id,
    type: event.type,
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    summary: event.summary,
    ...(event.link ? { link: event.link } : {}),
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };
}

function escapeRegex(value) {
  return value
    .replace(/[.*+?^$()|[\]\\]/g, "\\$&")
    .replaceAll("{", "\\{")
    .replaceAll("}", "\\}");
}

export async function listEvents(req, res) {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 50));
  const filter = {};

  if (req.query.type) {
    if (!eventTypes.has(req.query.type)) throw new HttpError(400, "Unsupported event type.");
    filter.type = req.query.type;
  }
  if (req.query.from || req.query.to) {
    filter.date = {};
    if (req.query.from) filter.date.$gte = String(req.query.from);
    if (req.query.to) filter.date.$lte = String(req.query.to);
    for (const date of [filter.date.$gte, filter.date.$lte].filter(Boolean)) {
      if (!isValidDate(date)) throw new HttpError(400, "Date filters must use YYYY-MM-DD format.");
    }
  }
  if (req.query.q) {
    const query = String(req.query.q).trim().slice(0, 100);
    if (query) {
      const pattern = new RegExp(escapeRegex(query), "i");
      filter.$or = [{ title: pattern }, { summary: pattern }, { location: pattern }];
    }
  }

  const [events, total] = await Promise.all([
    Event.find(filter)
      .sort({ date: 1, time: 1, id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Event.countDocuments(filter),
  ]);
  res.json({
    data: events.map(serialize),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function getEvent(req, res) {
  const id = validateId(req.params.id);
  const event = await Event.findOne({ id }).lean();
  if (!event) throw new HttpError(404, "Event not found.");
  res.json({ data: serialize(event) });
}

export async function createEvent(req, res) {
  const data = validatePayload(req.body, true);
  try {
    const event = await Event.create(data);
    auditEvent("create", event.id, Object.keys(data), req.admin.email);
    res.status(201).json({ data: serialize(event.toObject()) });
  } catch (error) {
    if (error?.code === 11000) throw new HttpError(409, "An event with this id already exists.");
    throw error;
  }
}

export async function updateEvent(req, res) {
  const id = validateId(req.params.id);
  const data = validatePayload(req.body, false);
  if (!Object.keys(data).length)
    throw new HttpError(400, "Provide at least one event field to update.");

  const event = await Event.findOne({ id });
  if (!event) throw new HttpError(404, "Event not found.");
  try {
    event.set(data);
    await event.save();
    auditEvent("update", event.id, Object.keys(data), req.admin.email);
    res.json({ data: serialize(event.toObject()) });
  } catch (error) {
    if (error instanceof mongoose.Error.VersionError) {
      throw new HttpError(409, "Event changed during this update. Reload it and try again.");
    }
    throw error;
  }
}

export async function deleteEvent(req, res) {
  const id = validateId(req.params.id);
  const event = await Event.findOneAndDelete({ id });
  if (!event) throw new HttpError(404, "Event not found.");
  auditEvent("delete", event.id, [], req.admin.email);
  res.json({ message: "Event deleted.", id: event.id });
}
