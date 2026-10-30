import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowUpRight, CheckCircle, Sparkles, ArrowLeft, ArrowRight, Award } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { usePublicContent } from "@/hooks/usePublicContent";
import { resolveCmsImage } from "@/lib/cms-api";

function ConnectionNetwork({ activeId, onSelect, testimonials }: { activeId: string; onSelect: (id: string) => void; testimonials: Testimonial[] }) {

  const nodePositions = [
    { x: 50, y: 10 },
    { x: 15, y: 40 },
    { x: 85, y: 40 },
    { x: 22, y: 88 },
    { x: 78, y: 88 },
    { x: 50, y: 60 },
  ];

  const hub = { x: 50, y: 50 };

  const lines = testimonials.map((t, i) => {
    const p = nodePositions[i % nodePositions.length];
    return {
      from: hub,
      to: p,
      active: t.id === activeId,
    };
  });

  return (
    <div className="relative mx-auto aspect-[10/11] w-full max-w-md overflow-hidden rounded-[32px] border border-soft-border/70 bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.10),transparent_65%)] shadow-soft">
      {/* Connection lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="conn-active" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.from.x}
            y1={l.from.y}
            x2={l.to.x}
            y2={l.to.y}
            stroke={l.active ? "url(#conn-active)" : "rgba(120,113,108,0.28)"}
            strokeWidth={l.active ? 0.7 : 0.35}
            strokeDasharray="2 1.5"
            vectorEffect="non-scaling-stroke"
            style={{ transition: "stroke 0.3s ease" }}
          />
        ))}
        <circle
          cx={hub.x}
          cy={hub.y}
          r={1.6}
          fill="#f97316"
          vectorEffect="non-scaling-stroke"
          className="animate-pulse"
        />
        <circle
          cx={hub.x}
          cy={hub.y}
          r={0.35}
          fill="#fff"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Nodes */}
      {testimonials.map((t, i) => {
        const p = nodePositions[i % nodePositions.length];
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            aria-label={`${t.name} — ${t.role} at ${t.org}`}
            aria-pressed={active}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className="relative block h-16 w-16 sm:h-20 sm:w-20">
              {active && (
                <span className="absolute -inset-2 rounded-full bg-primary/15" />
              )}
              <span
                className={`relative block h-full w-full overflow-hidden rounded-full border-2 bg-surface shadow-soft transition-all duration-300 group-hover:scale-105 ${
                  active
                    ? "border-primary ring-4 ring-primary/20"
                    : "border-soft-border group-hover:border-primary/50"
                }`}
              >
                <img
                  src={resolveCmsImage(t.image)}
                  alt={`${t.name} — ${t.role} at ${t.org}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </span>
            </span>
            <span
              className={`pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                active ? "bg-primary text-white" : "bg-surface text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {t.categoryLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FeaturedCard({
  testimonial,
  onPrev,
  onNext,
  index,
  total,
}: {
  testimonial: Testimonial;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
}) {
  return (
    <div className="relative flex h-full flex-col justify-center rounded-[32px] border border-soft-border/70 bg-surface p-8 shadow-elevated sm:p-10">
      <div aria-hidden className="pointer-events-none absolute right-6 top-6 text-primary/10">
        <Quote className="h-20 w-20" />
      </div>

      <div className="flex items-center gap-1 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Award key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={testimonial.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-foreground text-pretty sm:text-2xl">
            “{testimonial.quote}”
          </p>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap gap-2">
        {testimonial.highlights.map((h) => (
          <span
            key={h}
            className="inline-flex items-center gap-1 rounded-full border border-soft-border/70 bg-background px-3 py-1 text-xs text-foreground/70"
          >
            <Sparkles className="h-3 w-3 text-primary" /> {h}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4 border-t border-soft-border/60 pt-6">
        <img
          src={resolveCmsImage(testimonial.image)}
          alt={`${testimonial.name} — ${testimonial.role} at ${testimonial.org}`}
          loading="lazy"
          decoding="async"
          className="h-14 w-14 rounded-full border border-soft-border object-cover shadow-soft"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} · {testimonial.org}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-600">
            <CheckCircle className="h-3.5 w-3.5" /> Verified · {testimonial.verified}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection({ compact = false }: { compact?: boolean }) {
  const records = usePublicContent<Testimonial>("testimonials", TESTIMONIALS);
  const sorted = useMemo(() => [...records].sort((a, b) => {
    const rank: Record<string, number> = { founder: 0, educator: 1, student: 2 };
    return (rank[a.category] ?? 9) - (rank[b.category] ?? 9);
  }), [records]);
  const [activeId, setActiveId] = useState(sorted[0]?.id ?? "");
  const currentId = sorted.some((t) => t.id === activeId) ? activeId : sorted[0]?.id ?? "";
  const activeIndex = sorted.findIndex((t) => t.id === currentId);
  const active = sorted[activeIndex] ?? sorted[0];

  const go = useCallback(
    (dir: 1 | -1) => {
      setActiveId((prev) => {
        const idx = sorted.findIndex((t) => t.id === prev);
      return sorted.length ? sorted[(idx + dir + sorted.length) % sorted.length].id : "";
      });
    },
    [sorted],
  );

  return (
    <Section id="testimonials" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-32 bottom-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <SectionHeading
        eyebrow="Testimonials"
        title={
          <>
            Trusted by <span className="text-primary">founders, teachers & students.</span>
          </>
        }
        description="From classrooms to boardrooms, hear what the people building Africa's digital future say about working with IshConnect."
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal variant="fade-right" duration={700} className="lg:col-span-5">
          <ConnectionNetwork activeId={currentId} onSelect={setActiveId} testimonials={sorted} />
        </Reveal>

        <Reveal variant="fade-left" delay={100} duration={700} className="lg:col-span-7">
          {active ? <FeaturedCard
            testimonial={active}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            index={activeIndex}
            total={sorted.length}
          /> : <div className="rounded-[32px] border border-soft-border/70 bg-surface p-10 text-center text-muted-foreground">Testimonials will appear here when published.</div>}
        </Reveal>
      </div>

      {/* Organization marquee */}
      <Reveal variant="fade-up" duration={600}>
        <div className="mt-16 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Voices from across Rwanda
          </p>
        </div>
        <div className="marquee-fade relative mt-6 overflow-hidden">
          <div className="flex items-center gap-3 marquee-track">
            {[...new Set(sorted.map((t) => t.org).filter(Boolean)), ...new Set(sorted.map((t) => t.org).filter(Boolean))].map((org, i) => (
              <span
                key={`${org}-${i}`}
                className="inline-flex shrink-0 items-center rounded-full border border-soft-border/70 bg-surface px-5 py-2.5 text-sm font-medium text-foreground/60"
              >
                <Sparkles className="mr-2 h-3.5 w-3.5 text-primary/60" />
                {org}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {compact && (
        <Reveal variant="fade-up" duration={600}>
          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background magnetic-btn"
            >
              Read All Testimonials
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
