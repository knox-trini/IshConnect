import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cmsAdmin, type CmsRecord } from "@/lib/cms-api";

const TYPES = [
  "team",
  "testimonials",
  "partners",
  "programs",
  "projects",
  "websites",
  "pages",
  "settings",
] as const;
type Type = (typeof TYPES)[number];
const blank: Record<Exclude<Type, "settings" | "pages">, Record<string, unknown>> = {
  team: {
    slug: "new-team-member",
    name: "New team member",
    role: "Role",
    leadership: false,
    order: 0,
    isPublished: false,
  },
  testimonials: {
    slug: "new-testimonial",
    name: "Name",
    role: "Role",
    org: "Organization",
    quote: "",
    highlights: [],
    verified: "",
    category: "student",
    order: 0,
    isPublished: false,
  },
  partners: {
    slug: "new-partner",
    name: "Partner name",
    href: "",
    channelUrl: "",
    order: 0,
    isPublished: false,
  },
  programs: {
    slug: "new-program",
    title: "Program title",
    duration: "",
    summary: "",
    tags: [],
    applyUrl: "",
    applicationEnabled: false,
    order: 0,
    isPublished: false,
  },
  projects: {
    slug: "new-project",
    title: "Project title",
    category: "",
    description: "",
    heroSummary: "",
    tech: [],
    features: [],
    repoUrl: "",
    liveUrl: "",
    order: 0,
    isPublished: false,
  },
  websites: {
    slug: "new-website",
    name: "Website name",
    href: "https://",
    description: "",
    image: "",
    isFeatured: false,
    order: 0,
    isPublished: false,
  },
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [type, setType] = useState<Type>("team");
  const [records, setRecords] = useState<CmsRecord[]>([]);
  const [selected, setSelected] = useState<CmsRecord | null>(null);
  const [json, setJson] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [adminEmail, setAdminEmail] = useState("");
  const refresh = useCallback(async () => {
    const [admin, rows] = await Promise.all([cmsAdmin.me(), cmsAdmin.list(type)]);
    setAdminEmail(admin.email);
    setRecords(rows);
    setSelected(null);
    setJson("");
  }, [type]);
  useEffect(() => {
    refresh().catch(() => navigate("/admin/login", { replace: true }));
  }, [refresh, navigate]);
  function edit(record: CmsRecord) {
    setSelected(record);
    const { id, recordId, createdAt, updatedAt, version, ...editable } = record;
    void id;
    void createdAt;
    void updatedAt;
    void version;
    setJson(JSON.stringify(editable, null, 2));
  }
  function add() {
    if (type === "settings") {
      setMessage("Site settings are seeded as the global record. Select it to edit.");
      return;
    }
    if (type === "pages") {
      setMessage("Website content is seeded as the site record. Select it to edit.");
      return;
    }
    setSelected(null);
    setJson(JSON.stringify(blank[type], null, 2));
  }
  async function save() {
    setBusy(true);
    setMessage("");
    try {
      const data = JSON.parse(json) as Record<string, unknown>;
      const saved = selected
        ? await cmsAdmin.update(type, selected.recordId, data)
        : await cmsAdmin.create(type, data);
      await refresh();
      setMessage(`Saved ${saved.slug}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }
  async function remove(record: CmsRecord) {
    if (!window.confirm(`Permanently remove “${record.slug}”?`)) return;
    try {
      await cmsAdmin.remove(type, record.recordId);
      await refresh();
      setMessage("Content removed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Remove failed.");
    }
  }
  async function togglePublished(record: CmsRecord) {
    try {
      await cmsAdmin.update(type, record.recordId, { isPublished: !record.isPublished });
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    }
  }
  async function logout() {
    await cmsAdmin.logout();
    navigate("/admin/login", { replace: true });
  }
  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    try {
      await cmsAdmin.changePassword(passwords.currentPassword, passwords.newPassword);
      await cmsAdmin.logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Password update failed.");
    }
  }
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            ISHCONNLAB CMS
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Content management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {adminEmail}</p>
        </div>
        <button
          onClick={() => void logout()}
          className="rounded-full border border-soft-border px-5 py-2 text-sm"
        >
          Sign out
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {TYPES.map((item) => (
          <button
            key={item}
            onClick={() => setType(item)}
            className={`rounded-full px-4 py-2 text-sm capitalize ${type === item ? "bg-primary text-white" : "border border-soft-border bg-surface"}`}
          >
            {item}
          </button>
        ))}
      </div>
      {message && (
        <p role="status" className="mt-4 text-sm text-primary">
          {message}
        </p>
      )}
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-2xl border border-soft-border/70 bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold capitalize">{type} records</h2>
            <button
              onClick={add}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {records.map((record) => (
              <div
                key={record.recordId}
                className="flex items-center gap-2 rounded-xl border border-soft-border/60 p-3"
              >
                <button onClick={() => edit(record)} className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-sm font-medium">
                    {record.name || record.title || record.slug}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {record.isPublished ? "Published" : "Draft"} · order {record.order}
                  </span>
                </button>
                <button
                  onClick={() => void togglePublished(record)}
                  className="text-xs text-primary"
                >
                  {record.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => void remove(record)}
                  aria-label={`Remove ${record.slug}`}
                  className="px-1 text-sm text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            {records.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No records yet.</p>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-soft-border/70 bg-surface p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              {selected
                ? `Edit ${selected.slug}`
                : `Create ${type === "settings" ? "settings" : "record"}`}
            </h2>
            <span className="text-xs text-muted-foreground">JSON fields</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit all content fields, links, image paths, arrays, publication status, and display
            order.
          </p>
          <textarea
            aria-label="Content record JSON"
            spellCheck={false}
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="mt-4 min-h-[480px] w-full rounded-xl border border-soft-border bg-background p-4 font-mono text-xs leading-relaxed"
          />
          <div className="mt-3 flex justify-end">
            <button
              disabled={!json || busy}
              onClick={() => void save()}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save content"}
            </button>
          </div>
        </div>
      </div>
      <form
        onSubmit={changePassword}
        className="mt-8 rounded-2xl border border-soft-border/70 bg-surface p-5"
      >
        <h2 className="font-semibold">Change administrator password</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input
            required
            type="password"
            autoComplete="current-password"
            aria-label="Current password"
            placeholder="Current password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            className="rounded-xl border border-soft-border bg-background px-4 py-3 text-sm"
          />
          <input
            required
            minLength={12}
            type="password"
            autoComplete="new-password"
            aria-label="New password"
            placeholder="New password (12+ characters)"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="rounded-xl border border-soft-border bg-background px-4 py-3 text-sm"
          />
          <button className="rounded-full border border-soft-border px-4 py-3 text-sm">
            Update password
          </button>
        </div>
      </form>
    </section>
  );
}
