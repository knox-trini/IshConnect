# IshConnect

Official website for **IshConnect** — a Kigali-based technology studio building web products, digital training, and community initiatives for Africa. Includes the **DevQueens** women-in-tech initiative and the **WebCare** web development service.

## Tech Stack

- **React 19** + **Vite 7** + **TypeScript**
- **Tailwind CSS 4** (via `@tailwindcss/vite`) + `tw-animate-css`
- **React Router 6** (TanStack Router-style route layout)
- **Framer Motion** for animations
- **Zustand** for lightweight state (events editor)
- **react-day-picker** for date picking
- **EmailJS** for contact / enrollment / challenge forms
- **react-helmet-async** for SEO meta tags
- **vite-plugin-pwa** for offline PWA support
- **puppeteer-core** for prerendering static pages at build time

## Getting Started

```bash
npm install
npm run dev        # start dev server
npm run build      # typecheck + build + sitemap + prerender all routes
npm run preview    # preview production build
npm run lint       # ESLint
npm run format     # Prettier
```

> **Note:** the `build` script runs `tsc -b`, `vite build`, `generate-sitemap.mjs` and `prerender.mjs`. Prerendering launches a local server + headless Chrome, so it takes a little longer than a plain Vite build.

## Project Structure

```
src/
├── assets/
│   ├── projects/        # project screenshots (iconnbook.png, agrilink.png, …)
│   ├── team/            # team photos
│   └── testimonials/    # real testimonial photos (Tresor.jpeg, Yazzid.png, …)
├── components/
│   ├── events/EventsEditor.tsx   # static events editor (passcode-locked)
│   ├── sections/                 # Hero, Academy, Initiatives, Testimonials, Events, …
│   └── ui/                       # Radix UI components
├── lib/
│   ├── events.ts        # static seed events + Zustand store (localStorage)
│   ├── testimonials.ts  # static testimonial data + real photos
│   └── projects.ts      # case studies / portfolio data
├── routes/              # /, /about, /academy, /contact, /solutions, /work,
│                        # /testimonials, /challenges, /privacy, /services/*
└── main.tsx             # app entry
```

## Features

- **Academy** — training programs with enrollment modal.
- **DevQueens** — women-in-tech initiative panel with mentorship/community/empowerment pillars, count-up stats, WhatsApp join CTA, and clickable **Success Stories** modals.
- **WebCare** — web development service card featuring the iConnBook build (screenshot + description) and a "Websites We've Built" link list.
- **Testimonials** — connection-network animation + featured carousel using real photos from `src/assets/testimonials/`.
- **Events** — event listings seeded with static data, plus a passcode-gated editor.
- **Challenges** — challenges page with detail modal and EmailJS submission.
- **SEO & PWA** — per-route meta/JSON-LD, sitemap generation, prerendered routes, installable PWA.

## Events Editor (STATIC — do not modify)

The events system is **fully static**: seed events live in `src/lib/events.ts` (`SEED_EVENTS`), there is **no backend**. The editor is unlocked with a passcode (SHA-256 hash stored in `events.ts`), and any edits persist **only in the current browser** via `localStorage`.

**Editor passcode:** `ish143`

To keep the site's default events stable for all visitors, **do not change** the seed data or the editor behavior. The complete source of `src/components/events/EventsEditor.tsx` is reproduced below for reference:

```tsx
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Trash2, Check, Clock } from "lucide-react";
import { useEventsStore, verifyPasscode, uid, type LabEvent, type EventType } from "@/lib/events";

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

export function EventsEditor() {
  const editorOpen = useEventsStore((s) => s.editorOpen);
  const closeEditor = useEventsStore((s) => s.closeEditor);
  const unlocked = useEventsStore((s) => s.unlocked);
  const setUnlocked = useEventsStore((s) => s.setUnlocked);

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

          {unlocked ? <EventFormPanel /> : <PasscodeGate onUnlock={setUnlocked} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PasscodeGate({ onUnlock }: { onUnlock: (value: boolean) => void }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const ok = await verifyPasscode(passcode);
    setBusy(false);
    if (ok) {
      onUnlock(true);
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        Enter your editor passcode to add, edit, or remove events.
      </p>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Passcode
        </span>
        <input
          type="password"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            setError(false);
          }}
          autoFocus
          className="w-full rounded-xl border border-soft-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
      </label>
      {error && <p className="text-xs font-medium text-red-600">Incorrect passcode.</p>}
      <button
        type="submit"
        disabled={busy || !passcode.trim()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity disabled:opacity-40"
      >
        <ShieldCheck className="h-4 w-4" />
        Unlock editor
      </button>
    </form>
  );
}

function EventFormPanel() {
  const events = useEventsStore((s) => s.events);
  const addEvent = useEventsStore((s) => s.addEvent);
  const updateEvent = useEventsStore((s) => s.updateEvent);
  const removeEvent = useEventsStore((s) => s.removeEvent);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [savedFlash, setSavedFlash] = useState(false);

  const startAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
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
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
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
    if (editingId) updateEvent(payload);
    else addEvent(payload);
    setEditingId(null);
    setForm({ ...emptyForm });
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
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

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-soft-border/60 bg-background px-3.5 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
              <p className="text-xs text-muted-foreground">
                {event.date} · {event.time} · {TYPE_LABELS[event.type]}
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
                onClick={() => {
                  if (window.confirm("Delete this event?")) removeEvent(event.id);
                }}
                aria-label="Delete"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-soft-border/60 bg-background p-4">
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
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Registration link</span>
            <input
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://…"
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
            <span className="text-xs text-muted-foreground">Changes persist in this browser.</span>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            <Check className="h-4 w-4" /> Save event
          </button>
        </div>
      </form>
    </div>
  );
}
```

## Deployment

1. `npm run build` produces `dist/` with prerendered HTML for every route plus `sitemap.xml`.
2. Serve `dist/` from any static host (Vercel, Netlify, Cloudflare Pages, Nginx).
3. Configure SPA fallback so deep links (e.g. `/testimonials`) resolve to the prerendered pages.
