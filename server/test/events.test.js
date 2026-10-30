import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { after, before, test } from "node:test";
import mongoose from "mongoose";

const databaseUri = process.env.MONGODB_TEST_URI || "mongodb://127.0.0.1:27017/ishconnect_test";
const databaseName = decodeURIComponent(new URL(databaseUri).pathname.replace(/^\//, ""));
if (!databaseName.toLowerCase().includes("test")) {
  throw new Error("MONGODB_TEST_URI must target a database whose name contains test.");
}

const adminEmail = "test-admin@example.com";
const adminPassword = "test-only-password-123";
const changedPassword = "test-only-password-456";
const jwtSecret = "test-only-jwt-secret-at-least-32-characters";
process.env.JWT_SECRET = jwtSecret;
process.env.CORS_ORIGIN = "http://localhost:5173";

const [{ default: app }, { Event }, { Admin }, { contentModels }] = await Promise.all([
  import("../app.js"),
  import("../models/Event.js"),
  import("../models/Admin.js"),
  import("../models/Content.js"),
]);

let server;
let baseUrl;
let adminToken;
const eventId = "integration-test-event";
const auditEntries = [];
const originalConsoleInfo = console.info;

before(async () => {
  console.info = (entry) => auditEntries.push(JSON.parse(entry));
  await mongoose.connect(databaseUri, { serverSelectionTimeoutMS: 5000 });
  await mongoose.connection.dropDatabase();
  await Promise.all([
    Event.init(),
    Admin.init(),
    ...Object.values(contentModels).map((Model) => Model.init()),
  ]);
  server = app.listen(0);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.once("listening", resolve);
  });
  baseUrl = "http://127.0.0.1:" + server.address().port;
});

after(async () => {
  console.info = originalConsoleInfo;
  if (mongoose.connection.readyState === 1) await mongoose.connection.dropDatabase();
  if (server) await new Promise((resolve) => server.close(resolve));
  await mongoose.disconnect();
});

async function request(method, path, body, authorization = true) {
  const headers = { "content-type": "application/json" };
  if (authorization === true && adminToken) headers.authorization = "Bearer " + adminToken;
  else if (typeof authorization === "string") headers.authorization = "Bearer " + authorization;
  const response = await fetch(baseUrl + path, {
    method,
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  return { status: response.status, data };
}

const validEvent = {
  id: eventId,
  type: "meetup",
  title: "Integration Test Meetup",
  date: "2026-11-14",
  time: "17:00",
  location: "Kigali",
  summary: "Initial event summary",
  link: "/academy",
};

test("health, CORS, auth, events, and content API contract", async (t) => {
  await t.test("reports healthy database connection and enforces CORS", async () => {
    const response = await request("GET", "/health");
    assert.equal(response.status, 200);
    assert.equal(response.data.status, "ok");
    const allowedOrigin = await fetch(baseUrl + "/health", {
      headers: { origin: "http://localhost:5173" },
    });
    assert.equal(allowedOrigin.headers.get("access-control-allow-origin"), "http://localhost:5173");
    const blockedOrigin = await fetch(baseUrl + "/health", {
      headers: { origin: "https://attacker.invalid" },
    });
    assert.equal(blockedOrigin.status, 403);
  });

  await t.test("provisions the first administrator and blocks public signup", async () => {
    const status = await request("GET", "/api/auth/setup-status");
    assert.equal(status.status, 200);
    assert.equal(status.data.hasAdmin, false);

    assert.equal(
      (await request("POST", "/api/auth/signup", { email: adminEmail, password: "short" })).status,
      400,
    );
    const signup = await request("POST", "/api/auth/signup", {
      email: adminEmail,
      password: adminPassword,
    });
    assert.equal(signup.status, 201);
    assert.equal(signup.data.admin.email, adminEmail);
    assert.equal(signup.data.admin.role, "admin");
    assert.equal(signup.data.tokenType, "Bearer");
    assert.equal(signup.data.expiresIn, 900);
    assert.equal(jwt.verify(signup.data.token, jwtSecret).role, "admin");

    assert.equal(
      (
        await request("POST", "/api/auth/signup", {
          email: "second@example.com",
          password: adminPassword,
        })
      ).status,
      403,
    );
    assert.equal((await request("GET", "/api/auth/setup-status")).data.hasAdmin, true);
    assert.ok(await Admin.findOne({ email: adminEmail }).lean());
  });

  await t.test("authenticates admins and rejects invalid login or JWTs", async () => {
    assert.equal((await request("POST", "/api/auth/login", { email: adminEmail })).status, 400);
    assert.equal(
      (await request("POST", "/api/auth/login", { email: adminEmail, password: "wrong-password" }))
        .status,
      401,
    );
    assert.equal(
      (
        await request("POST", "/api/auth/login", {
          email: adminEmail,
          password: adminPassword,
          role: "superadmin",
        })
      ).status,
      400,
    );

    const login = await request("POST", "/api/auth/login", {
      email: adminEmail,
      password: adminPassword,
    });
    assert.equal(login.status, 200);
    assert.equal(login.data.admin.email, adminEmail);
    assert.equal(login.data.tokenType, "Bearer");
    adminToken = login.data.token;

    const me = await request("GET", "/api/auth/me");
    assert.equal(me.status, 200);
    assert.equal(me.data.admin.email, adminEmail);
    assert.equal((await request("GET", "/api/auth/me", undefined, false)).status, 401);

    assert.equal((await request("POST", "/api/events", validEvent, false)).status, 401);
    assert.equal((await request("POST", "/api/events", validEvent, "not-a-jwt")).status, 401);
    const nonAdminToken = jwt.sign({ role: "user" }, jwtSecret, {
      issuer: "ishconnect-cms",
      audience: "ishconnect-admin",
      subject: "someone-else",
      expiresIn: "15m",
    });
    assert.equal((await request("POST", "/api/events", validEvent, nonAdminToken)).status, 403);
  });

  await t.test("rejects malformed and invalid event data", async () => {
    assert.equal(
      (await request("POST", "/api/events", { ...validEvent, date: "2026-02-31" })).status,
      400,
    );
    assert.equal(
      (await request("POST", "/api/events", { ...validEvent, id: "bad id" })).status,
      400,
    );
    assert.equal(
      (await request("POST", "/api/events", { ...validEvent, isAdmin: true })).status,
      400,
    );

    const malformed = await fetch(baseUrl + "/api/events", {
      method: "POST",
      headers: { authorization: "Bearer " + adminToken, "content-type": "application/json" },
      body: "{",
    });
    assert.equal(malformed.status, 400);
  });

  await t.test("creates a persisted event, audits the write, and rejects duplicates", async () => {
    const created = await request("POST", "/api/events", validEvent);
    assert.equal(created.status, 201);
    assert.equal(created.data.data.id, eventId);
    assert.ok(created.data.data.createdAt);
    assert.equal((await Event.findOne({ id: eventId }).lean()).title, validEvent.title);
    assert.ok(
      auditEntries.some(
        (entry) =>
          entry.action === "create" && entry.eventId === eventId && entry.actor === adminEmail,
      ),
    );
    assert.equal((await request("POST", "/api/events", validEvent)).status, 409);
  });

  await t.test("reads details and searchable, filtered, paginated lists", async () => {
    const detail = await request("GET", "/api/events/" + eventId);
    assert.equal(detail.status, 200);
    assert.equal(detail.data.data.title, validEvent.title);

    const list = await request(
      "GET",
      "/api/events?q=Integration%20Test&type=meetup&page=1&limit=1",
    );
    assert.equal(list.status, 200);
    assert.equal(list.data.data.length, 1);
    assert.equal(list.data.data[0].id, eventId);
    assert.equal(list.data.pagination.total, 1);
    assert.equal((await request("GET", "/api/events?type=unknown")).status, 400);
    assert.equal((await request("GET", "/api/events/nonexistent-event")).status, 404);
    assert.equal((await request("GET", "/api/events/bad%20id")).status, 400);
  });

  await t.test("updates partial and full event fields without erasing omitted values", async () => {
    const partial = await request("PATCH", "/api/events/" + eventId, {
      summary: "Patched summary",
    });
    assert.equal(partial.status, 200);
    assert.equal(partial.data.data.summary, "Patched summary");
    assert.equal(partial.data.data.title, validEvent.title);

    const full = await request("PUT", "/api/events/" + eventId, {
      title: "Updated Integration Meetup",
      date: "2026-11-15",
      time: "18:30",
      link: "https://example.com/events",
    });
    assert.equal(full.status, 200);
    assert.equal(full.data.data.title, "Updated Integration Meetup");
    assert.equal(full.data.data.summary, "Patched summary");
    assert.equal(full.data.data.date, "2026-11-15");
    assert.equal(full.data.data.time, "18:30");
    assert.equal(full.data.data.link, "https://example.com/events");

    const persisted = await Event.findOne({ id: eventId }).lean();
    assert.equal(persisted.title, "Updated Integration Meetup");
    assert.equal(persisted.summary, "Patched summary");
    assert.ok(
      auditEntries.some(
        (entry) =>
          entry.action === "update" &&
          entry.eventId === eventId &&
          entry.changedFields.includes("summary"),
      ),
    );
    assert.equal(
      (await request("PATCH", "/api/events/missing-event", { title: "No upsert" })).status,
      404,
    );
    assert.equal(
      (await request("PATCH", "/api/events/" + eventId, { id: "changed-id" })).status,
      400,
    );
    assert.equal((await request("PATCH", "/api/events/" + eventId, {})).status, 400);
    assert.equal((await request("DELETE", "/api/events/" + eventId, undefined, false)).status, 401);
  });

  await t.test("manages CMS content for every frontend content type", async () => {
    for (const type of [
      "team",
      "testimonials",
      "partners",
      "programs",
      "projects",
      "websites",
      "settings",
    ]) {
      const publicList = await request("GET", "/api/content/" + type);
      assert.equal(publicList.status, 200, type + " public list");
      assert.deepEqual(publicList.data.data, []);
      const adminList = await request("GET", "/api/admin/content/" + type);
      assert.equal(adminList.status, 200, type + " admin list");
      assert.deepEqual(adminList.data.data, []);
    }

    assert.equal((await request("GET", "/api/content/unknown")).status, 404);

    const settings = await request("POST", "/api/admin/content/settings", {
      slug: "global",
      isPublished: true,
      heroTitle: "Software Development Company in",
      heroHighlight: "Rwanda & Africa",
      bootcampTitle: "IshConnect Summer",
      stats: [{ value: 500, suffix: "+", label: "Students Empowered" }],
      timeline: [{ year: "2020", title: "Founded", text: "Started in Kigali." }],
      faqs: [{ question: "What is IshConnect?", answer: "A Kigali technology studio." }],
      applicationLinks: [
        {
          key: "start-project",
          label: "Start a Project",
          url: "/contact",
          enabled: true,
          openInNewTab: false,
        },
      ],
    });
    assert.equal(settings.status, 201);
    const settingsId = settings.data.data.recordId;
    assert.equal(settings.data.data.heroHighlight, "Rwanda & Africa");
    const updatedSettings = await request("PATCH", "/api/admin/content/settings/" + settingsId, {
      heroTitle: "Custom Hero Title",
      bootcampStartDate: "1 September 2026",
    });
    assert.equal(updatedSettings.status, 200, JSON.stringify(updatedSettings.data));
    assert.equal(updatedSettings.data.data.heroTitle, "Custom Hero Title");
    const publicSettings = await request("GET", "/api/content/settings/global", undefined, false);
    assert.equal(publicSettings.status, 200);
    assert.equal(publicSettings.data.data.heroTitle, "Custom Hero Title");
    assert.equal(publicSettings.data.data.stats[0].value, 500);
    assert.equal(
      (await request("DELETE", "/api/admin/content/settings/" + settingsId)).status,
      200,
    );

    assert.equal(
      (await request("POST", "/api/admin/content/team", { slug: "x", name: "X", role: "R" }, false))
        .status,
      401,
    );
    assert.equal(
      (await request("POST", "/api/admin/content/team", { name: "Missing Slug", role: "R" }))
        .status,
      400,
    );
    assert.equal(
      (
        await request("POST", "/api/admin/content/team", {
          slug: "bad-field",
          name: "Bad",
          role: "R",
          unknown: "nope",
        })
      ).status,
      400,
    );

    const created = await request("POST", "/api/admin/content/team", {
      slug: "Test Engineer",
      name: "Test Engineer",
      role: "Engineer",
      leadership: true,
      order: 2,
      isPublished: false,
    });
    assert.equal(created.status, 201);
    assert.equal(created.data.data.slug, "test-engineer");
    assert.equal(created.data.data.isPublished, false);

    assert.equal((await request("GET", "/api/content/team")).data.data.length, 0);
    assert.equal((await request("GET", "/api/content/team/test-engineer")).status, 404);
    assert.equal((await request("GET", "/api/admin/content/team")).data.data.length, 1);
    assert.equal(
      (
        await request("POST", "/api/admin/content/team", {
          slug: "test-engineer",
          name: "Duplicate",
          role: "Engineer",
        })
      ).status,
      409,
    );

    const recordId = created.data.data.recordId;
    const updated = await request("PATCH", "/api/admin/content/team/" + recordId, {
      slug: "lead-engineer",
      role: "Lead Engineer",
      isPublished: true,
    });
    assert.equal(updated.status, 200);
    assert.equal(updated.data.data.slug, "lead-engineer");
    assert.equal(updated.data.data.role, "Lead Engineer");
    assert.equal(updated.data.data.name, "Test Engineer");

    const publicList = await request("GET", "/api/content/team?q=Lead");
    assert.equal(publicList.status, 200);
    assert.equal(publicList.data.data.length, 1);
    assert.equal(publicList.data.data[0].slug, "lead-engineer");

    const publicItem = await request("GET", "/api/content/team/lead-engineer");
    assert.equal(publicItem.status, 200);
    assert.equal(publicItem.data.data.name, "Test Engineer");

    assert.equal((await request("PATCH", "/api/admin/content/team/" + recordId, {})).status, 400);
    assert.equal(
      (await request("PATCH", "/api/admin/content/team/000000000000000000000000", { role: "X" }))
        .status,
      404,
    );

    const removed = await request("DELETE", "/api/admin/content/team/" + recordId);
    assert.equal(removed.status, 200);
    assert.equal(removed.data.slug, "lead-engineer");
    assert.equal((await request("GET", "/api/content/team/lead-engineer")).status, 404);
  });

  await t.test("deletes the selected event, audits it, and handles repeat deletes", async () => {
    const deleted = await request("DELETE", "/api/events/" + eventId);
    assert.equal(deleted.status, 200);
    assert.equal(deleted.data.id, eventId);
    assert.ok(auditEntries.some((entry) => entry.action === "delete" && entry.eventId === eventId));
    assert.equal((await request("GET", "/api/events/" + eventId)).status, 404);
    assert.equal((await request("DELETE", "/api/events/" + eventId)).status, 404);
    const list = await request("GET", "/api/events?q=Integration%20Test");
    assert.equal(
      list.data.data.some((event) => event.id === eventId),
      false,
    );
  });

  await t.test("changes the password, revokes old sessions, and signs in again", async () => {
    const changed = await request("POST", "/api/auth/change-password", {
      currentPassword: adminPassword,
      newPassword: changedPassword,
    });
    assert.equal(changed.status, 200);
    assert.equal((await request("GET", "/api/auth/me")).status, 401);

    assert.equal(
      (await request("POST", "/api/auth/login", { email: adminEmail, password: adminPassword }))
        .status,
      401,
    );
    const login = await request("POST", "/api/auth/login", {
      email: adminEmail,
      password: changedPassword,
    });
    assert.equal(login.status, 200);
    adminToken = login.data.token;

    assert.equal((await request("POST", "/api/auth/logout")).status, 204);
    assert.equal((await request("GET", "/api/auth/me")).status, 401);
  });
});
