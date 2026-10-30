import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Trash2, Check, Clock } from "lucide-react";
import {
  useEventsStore,
  uid,
  compareByDate,
  eventsApi,
  type LabEvent,
  type EventType,
} from "@/lib/events";

const EVENT_TYPES: EventType[] = ["bootcamp", "meetup", "workshop", "hackathon"];

const TYPE_LABELS: Record<EventType, string> = {
  bootcamp: "Bootcamp",
  meetup: "Meetup",
  workshop: "Workshop",
  hackathon: "Hackathon",
};

const emptyForm = {
  type: "bootcamp" as EventType,
  title: "",
  date: "",
  time: "",
  location: "",
  summary: "",
  link: "",
};

function getAdminToken() {
  return typeof sessionStorage === "undefined"
    ? ""
    : sessionStorage.getItem("ishconnect-admin-token") || "";
}

export function EventsEditor() {
  const editorOpen = useEventsStore((s) => s.editorOpen);
  const closeEditor = useEventsStore((s) => s.closeEditor);
  const hasToken = Boolean(getAdminToken());

  if (!editorOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
        onClick={closeEditor}
        role="dialog"
        aria-modal="true"
        aria-label="Events editor"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-soft-border/60 bg-surface p-6 shadow-elevated"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold tracking-tight">Events editor</h3>
            <button
              onClick={closeEditor}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {hasToken ? <EventFormPanel /> : <SignInPrompt />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SignInPrompt() {
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        Sign in with your admin account to add, edit, or remove events.
      </p>
      <Link
        to="/admin/login"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <ShieldCheck className="h-4 w-4" />
        Admin sign in
      </Link>
    </div>
  );
}

function EventFormPanel() {
  const [events, setEvents] = useState<LabEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [savedFlash, setSavedFlash] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const list = await eventsApi.list();
      setEvents([...list].sort(compareByDate));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEvents();
  }, []);

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
  };

  const startEdit = (event: LabEvent) => {
    setEditingId(event.id);
    setForm({
      type: event.type,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      summary: event.summary,
      link: event.link ?? "",
    });
    setError("");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const payload: LabEvent = {
      id: editingId ?? uid(),
      type: form.type,
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      location: form.location.trim(),
      summary: form.summary.trim(),
      link: form.link.trim() || undefined,
    };
    try {
      if (editingId) await eventsApi.update(payload);
      else await eventsApi.create(payload);
      await loadEvents();
      setEditingId(null);
      setForm({ ...emptyForm });
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 1600);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save event.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this event?")) return;
    setBusy(true);
    setError("");
    try {
      await eventsApi.remove(id);
      await loadEvents();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete event.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={startAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white"
        >
          <span className="text-sm leading-none">+</span> Add event
        </button>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-2 text-xs text-foreground/70">
          <Clock className="h-3.5 w-3.5" /> {events.length} events
        </span>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <div className="space-y-2">
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No events yet. Add your first event below.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-soft-border/60 bg-background px-3.5 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {event.date} &middot; {event.time} &middot; {TYPE_LABELS[event.type]}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => startEdit(event)}
                  aria-label="Edit"
                  className="inline-flex h-8 items-center rounded-full border border-soft-border/60 px-2.5 text-xs font-medium text-foreground/70 transition-colors hover:text-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => void remove(event.id)}
                  disabled={busy}
                  aria-label="Delete"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:text-red-600 disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-soft-border/60 bg-background p-4"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Title</span>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Date</span>
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Time</span>
            <input
              required
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Type</span>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as EventType })}
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Location</span>
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Summary</span>
            <textarea
              required
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              Registration link
            </span>
            <input
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
              className="w-full rounded-lg border border-soft-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          {savedFlash ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Changes are saved to the CMS.</span>
          )}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary disabled:opacity-40"
          >
            <Check className="h-4 w-4" />{" "}
            {busy ? "Saving..." : editingId ? "Update event" : "Save event"}
          </button>
        </div>
      </form>
    </div>
  );
}
