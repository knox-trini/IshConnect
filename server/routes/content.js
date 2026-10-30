import { HttpError } from "../lib/HttpError.js";
import { auditEvent } from "../lib/audit.js";
import { contentModels, contentTypes } from "../models/Content.js";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getType(type) {
  const config = contentTypes[type];
  const Model = contentModels[type];
  if (!config || !Model) throw new HttpError(404, "Unknown content type.");
  return { config, Model };
}

function makeSlug(value) {
  return String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function checkUrls(value, key = "") {
  if (typeof value === "string" && /(url|href|link)$/i.test(key) && value && value !== "#") {
    if (!value.startsWith("/") && !/^https?:\/\/\S+$/i.test(value)) {
      throw new HttpError(400, key + " must be an HTTP(S) URL or site-relative path.");
    }
  } else if (Array.isArray(value)) {
    for (const item of value) checkUrls(item, key);
  } else if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) checkUrls(childValue, childKey);
  }
}

function validateRecord(type, body, { partial = false } = {}) {
  const { config } = getType(type);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "Request body must be a JSON object.");
  }
  const unknown = Object.keys(body).filter((key) => !config.fields.includes(key));
  if (unknown.length) throw new HttpError(400, "Unsupported fields: " + unknown.join(", "));

  const result = {};
  for (const [key, value] of Object.entries(body)) {
    if (key === "slug") {
      const slug = makeSlug(value);
      if (!slug || !slugPattern.test(slug)) throw new HttpError(400, "Slug must contain lowercase letters, numbers, and hyphens.");
      result.slug = slug;
      continue;
    }
    if (key === "order") {
      if (!Number.isInteger(value) || value < 0 || value > 100000) throw new HttpError(400, "Order must be a non-negative integer.");
      result.order = value;
      continue;
    }
    if (key === "isPublished" || key === "leadership" || key === "applicationEnabled" || key === "isFeatured") {
      if (typeof value !== "boolean") throw new HttpError(400, key + " must be a boolean.");
      result[key] = value;
      continue;
    }
    if (key === "rating") {
      if (typeof value !== "number" || value < 0 || value > 5) throw new HttpError(400, "Rating must be between 0 and 5.");
      result[key] = value;
      continue;
    }
    if (key === "tags" || key === "highlights" || key === "tech" || key === "features" || key === "seoKeywords") {
      if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
        throw new HttpError(400, key + " must be an array of strings.");
      }
      result[key] = value.map((item) => item.trim()).filter(Boolean).slice(0, 100);
      continue;
    }
    if (key === "stats" || key === "timeline" || key === "faqs" || key === "socialLinks" || key === "footerLinks" || key === "applicationLinks") {
      if (!Array.isArray(value) || value.length > 200 || value.some((item) => !item || typeof item !== "object" || Array.isArray(item))) {
        throw new HttpError(400, key + " must be an array of objects.");
      }
      result[key] = value;
      continue;
    }
    if (typeof value !== "string") throw new HttpError(400, key + " must be a string.");
    const normalized = value.trim();
    if (normalized.length > 30000) throw new HttpError(400, key + " is too long.");
    result[key] = normalized;
  }

  if (!partial) {
    for (const key of config.required) {
      const value = key === "slug" ? result.slug : result[key];
      if (typeof value !== "string" || !value.trim()) throw new HttpError(400, key + " is required.");
    }
  }
  checkUrls(result);
  return result;
}

function serialize(record) {
  return {
    ...record.data,
    slug: record.slug,
    order: record.order,
    isPublished: record.isPublished,
    id: record.slug,
    recordId: record._id?.toString?.() ?? record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export async function listPublicContent(req, res) {
  const { Model } = getType(req.params.type);
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 50));
  const filter = { isPublished: true };
  if (req.query.q) {
    const text = String(req.query.q).trim().slice(0, 100);
    const regex = new RegExp(text.replace(/[.*+?^$()|[\]\\]/g, "\\$&"), "i");
    filter.$or = ["name", "title", "role", "org", "description", "summary", "category"].map((key) => ({
      ["data." + key]: regex,
    }));
  }
  const [records, total] = await Promise.all([
    Model.find(filter).sort({ order: 1, slug: 1 }).skip((page - 1) * limit).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);
  res.json({ data: records.map(serialize), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function getPublicContent(req, res) {
  const { Model } = getType(req.params.type);
  const record = await Model.findOne({ slug: req.params.slug, isPublished: true }).lean();
  if (!record) throw new HttpError(404, "Content not found.");
  res.json({ data: serialize(record) });
}

export async function listAdminContent(req, res) {
  const { Model } = getType(req.params.type);
  const records = await Model.find({}).sort({ order: 1, slug: 1 }).lean();
  res.json({ data: records.map(serialize) });
}

export async function createContent(req, res) {
  const { Model } = getType(req.params.type);
  const data = validateRecord(req.params.type, req.body);
  const { slug, order = 0, isPublished = false, ...fields } = data;
  try {
    const record = await Model.create({ slug, order, isPublished, data: fields });
    auditEvent("content.create", req.params.type + ":" + slug, Object.keys(fields), req.admin.email);
    res.status(201).json({ data: serialize(record.toObject()) });
  } catch (error) {
    if (error?.code === 11000) throw new HttpError(409, "Content with this slug already exists.");
    throw error;
  }
}

export async function updateContent(req, res) {
  const { Model } = getType(req.params.type);
  const changes = validateRecord(req.params.type, req.body, { partial: true });
  if (!Object.keys(changes).length) throw new HttpError(400, "Provide at least one content field to update.");
  const record = await Model.findById(req.params.id);
  if (!record) throw new HttpError(404, "Content not found.");
  const { slug, order, isPublished, ...fields } = changes;
  if (slug !== undefined) record.slug = slug;
  if (order !== undefined) record.order = order;
  if (isPublished !== undefined) record.isPublished = isPublished;
  record.data = { ...record.data, ...fields };
  record.markModified("data");
  try {
    await record.save();
    auditEvent("content.update", req.params.type + ":" + record.slug, Object.keys(changes), req.admin.email);
    res.json({ data: serialize(record.toObject()) });
  } catch (error) {
    if (error?.code === 11000) throw new HttpError(409, "Content with this slug already exists.");
    if (error?.name === "VersionError") throw new HttpError(409, "Content changed during this update. Reload and try again.");
    throw error;
  }
}

export async function deleteContent(req, res) {
  const { Model } = getType(req.params.type);
  const record = await Model.findByIdAndDelete(req.params.id);
  if (!record) throw new HttpError(404, "Content not found.");
  auditEvent("content.delete", req.params.type + ":" + record.slug, [], req.admin.email);
  res.json({ message: "Content deleted.", id: record._id.toString(), slug: record.slug });
}

export const validateContentRecord = validateRecord;

