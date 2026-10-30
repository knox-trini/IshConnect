import { create } from "zustand";
import { request } from "./cms-api";

export type EventType = "bootcamp" | "meetup" | "workshop" | "hackathon";

export interface LabEvent {
  id: string;
  type: EventType;
  title: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  link?: string;
}

export const eventsApi = {
  async list(): Promise<LabEvent[]> {
    const result = await request("/events?limit=100");
    return result.data as LabEvent[];
  },
  async create(event: LabEvent): Promise<LabEvent> {
    const result = await request("/events", { method: "POST", body: JSON.stringify(event) }, true);
    return result.data as LabEvent;
  },
  async update(event: LabEvent): Promise<LabEvent> {
    const { id, ...body } = event;
    const result = await request(
      `/events/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(body) },
      true,
    );
    return result.data as LabEvent;
  },
  async remove(id: string): Promise<void> {
    await request(`/events/${encodeURIComponent(id)}`, { method: "DELETE" }, true);
  },
};

export const EVENT_PASSCODE_HASH =
  "2c8d4b0f8f12579076c5a7cd22abcc986aec792d77eea48bd919304468a3b1de";

const STORAGE_KEY = "ishconnect.events.v1";

export const SEED_EVENTS: LabEvent[] = [
  {
    id: "bootcamp-fullstack-2026-08",
    type: "bootcamp",
    title: "Full Stack Engineering Bootcamp — August Intake",
    date: "2026-08-17",
    time: "18:00",
    location: "KG 11 Ave, Kigali (Hybrid)",
    summary:
      "16 weeks, project-based. React, Node.js, PostgreSQL and TypeScript — graduate with a production-ready portfolio.",
    link: "/academy",
  },
  {
    id: "meetup-august-2026",
    type: "meetup",
    title: "Kigali Dev Meetup #12",
    date: "2026-08-29",
    time: "17:00",
    location: "KG 11 Ave, Kigali",
    summary:
      "An evening of lightning talks on scaling AI products in Africa, followed by networking over coffee.",
    link: "https://chat.whatsapp.com/Kg6jU7XWt3JFiMnztbjK1Y",
  },
  {
    id: "hackathon-ai-2026-09",
    type: "hackathon",
    title: "AI for Agriculture Hackathon",
    date: "2026-09-12",
    time: "09:00",
    location: "IshConnect Studio, Kigali",
    summary:
      "48 hours to build machine learning solutions for smallholder farmers. Prizes for the top three teams.",
    link: "/challenges",
  },
  {
    id: "workshop-python-2026-09",
    type: "workshop",
    title: "Python & Automation Workshop",
    date: "2026-09-26",
    time: "10:00",
    location: "Online",
    summary:
      "Hands-on session covering automation scripts, data pipelines, and FastAPI — bring your laptop.",
    link: "/academy",
  },
  {
    id: "bootcamp-mobile-2026-10",
    type: "bootcamp",
    title: "Mobile Development Bootcamp — October Intake",
    date: "2026-10-05",
    time: "18:00",
    location: "KG 11 Ave, Kigali (Hybrid)",
    summary: "12 weeks with React Native and Expo. Ship your app to the stores by graduation.",
    link: "/academy",
  },
];

export function uid(): string {
  return `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function isValidEvent(value: unknown): value is LabEvent {
  if (typeof value !== "object" || value === null) return false;
  const e = value as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    (e.type === "bootcamp" ||
      e.type === "meetup" ||
      e.type === "workshop" ||
      e.type === "hackathon") &&
    typeof e.title === "string" &&
    typeof e.date === "string" &&
    typeof e.time === "string" &&
    typeof e.location === "string" &&
    typeof e.summary === "string"
  );
}

export function loadEvents(): LabEvent[] {
  if (typeof window === "undefined") return SEED_EVENTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_EVENTS;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return SEED_EVENTS;
    const valid = parsed.filter(isValidEvent);
    return valid.length > 0 ? valid : SEED_EVENTS;
  } catch {
    return SEED_EVENTS;
  }
}

export function persistEvents(events: LabEvent[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    /* storage unavailable — ignore */
  }
}

export async function hashText(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPasscode(passcode: string): Promise<boolean> {
  const hash = await hashText(passcode.trim());
  return hash === EVENT_PASSCODE_HASH;
}

export function normalizeDate(date: string): string {
  return date.slice(0, 10);
}

export function compareByDate(a: LabEvent, b: LabEvent): number {
  const ka = `${a.date}T${a.time || "00:00"}`;
  const kb = `${b.date}T${b.time || "00:00"}`;
  return ka < kb ? -1 : ka > kb ? 1 : 0;
}

export function isUpcoming(event: LabEvent, today: Date): boolean {
  const eventDate = new Date(`${event.date}T23:59:59`);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  return eventDate.getTime() >= startOfToday.getTime();
}

interface EventsState {
  events: LabEvent[];
  hydrated: boolean;
  editorOpen: boolean;
  unlocked: boolean;
  hydrate: () => void;
  openEditor: () => void;
  closeEditor: () => void;
  setUnlocked: (value: boolean) => void;
  addEvent: (event: LabEvent) => void;
  updateEvent: (event: LabEvent) => void;
  removeEvent: (id: string) => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: SEED_EVENTS,
  hydrated: false,
  editorOpen: false,
  unlocked: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ events: loadEvents(), hydrated: true });
  },
  openEditor: () => set({ editorOpen: true }),
  closeEditor: () => set({ editorOpen: false }),
  setUnlocked: (value) => set({ unlocked: value }),
  addEvent: (event) => {
    const events = [...get().events, event].sort(compareByDate);
    set({ events });
    persistEvents(events);
  },
  updateEvent: (event) => {
    const events = get()
      .events.map((e) => (e.id === event.id ? event : e))
      .sort(compareByDate);
    set({ events });
    persistEvents(events);
  },
  removeEvent: (id) => {
    const events = get().events.filter((e) => e.id !== id);
    set({ events });
    persistEvents(events);
  },
}));
