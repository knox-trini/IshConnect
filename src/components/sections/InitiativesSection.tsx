import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Globe,
  ArrowUpRight,
  ExternalLink,
  Quote,
  Award,
  GraduationCap,
  X,
} from "lucide-react";
import iconnbookImg from "@/assets/projects/iconnbook.png";
import { usePublicContent } from "@/hooks/usePublicContent";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getContentIcon } from "@/lib/content-icons";
import { resolveCmsImage } from "@/lib/cms-api";
import { WEBSITES, type Website } from "@/lib/websites";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import type { SiteContent } from "@/lib/site-content";

export type SuccessStory = SiteContent["home"]["initiatives"]["devqueens"]["stories"][number];

function ConstellationLines() {
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dq-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path
        d="M 90 260 C 300 120, 420 260, 600 260 S 900 400, 1110 260"
        fill="none"
        stroke="url(#dq-line)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        className="conn-line"
      />
      <path
        d="M 90 260 C 300 400, 420 260, 600 260 S 900 120, 1110 260"
        fill="none"
        stroke="url(#dq-line)"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        className="conn-line"
      />
      <circle cx="600" cy="260" r="6" fill="#f97316" opacity="0.9" className="animate-pulse" />
      <circle cx="600" cy="260" r="3" fill="#fff" />
    </svg>
  );
}

function DevQueensAchievement({
  achievement,
}: {
  achievement: SiteContent["home"]["initiatives"]["devqueens"]["achievement"];
}) {
  const font = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-violet-200/60 bg-linear-to-br from-violet-500/10 via-white/60 to-secondary/10 p-6 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-violet-300/30 blur-2xl" />
        <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-secondary/30 blur-2xl" />
      </div>

      <svg viewBox="0 0 640 210" className="relative mx-auto w-full max-w-3xl" aria-hidden="true">
        <defs>
          <linearGradient id="dq-ach-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="dq-ach-violet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <radialGradient id="dq-ach-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* glow + orbit rings */}
        <circle cx="320" cy="105" r="88" fill="url(#dq-ach-glow)" />
        <circle
          cx="320"
          cy="105"
          r="70"
          fill="none"
          stroke="url(#dq-ach-violet)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="3 9"
        />
        <circle
          cx="320"
          cy="105"
          r="88"
          fill="none"
          stroke="url(#dq-ach-gold)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="2 12"
        />

        {/* sparkles */}
        <path
          d="M168 42 l2.6 6.2 6.2 2.6 -6.2 2.6 -2.6 6.2 -2.6 -6.2 -6.2 -2.6 6.2 -2.6 Z"
          fill="#fbbf24"
        />
        <path d="M478 34 l2 4.8 4.8 2 -4.8 2 -2 4.8 -2 -4.8 -4.8 -2 4.8 -2 Z" fill="#a78bfa" />
        <path
          d="M560 122 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 Z"
          fill="#fbbf24"
        />
        <path
          d="M104 150 l2 4.8 4.8 2 -4.8 2 -2 4.8 -2 -4.8 -4.8 -2 4.8 -2 Z"
          fill="#7c3aed"
          opacity="0.7"
        />
        <path
          d="M298 26 l1.6 3.8 3.8 1.6 -3.8 1.6 -1.6 3.8 -1.6 -3.8 -3.8 -1.6 3.8 -1.6 Z"
          fill="#fbbf24"
        />
        <circle cx="592" cy="66" r="2.5" fill="#f59e0b" opacity="0.8" />
        <circle cx="96" cy="92" r="2.5" fill="#8b5cf6" opacity="0.8" />
        <circle cx="86" cy="40" r="2" fill="#fbbf24" opacity="0.7" />
        <circle cx="556" cy="178" r="2.5" fill="#8b5cf6" opacity="0.8" />

        {/* floating medal badges */}
        <circle cx="250" cy="62" r="13" fill="url(#dq-ach-violet)" />
        <path
          d="M246 62 l2.8 2.8 5.4 -5.6"
          stroke="#fff"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="390" cy="62" r="13" fill="url(#dq-ach-violet)" />
        <path
          d="M386 62 l2.8 2.8 5.4 -5.6"
          stroke="#fff"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* trophy */}
        <path
          d="M320 34 l2.8 6.6 6.6 2.8 -6.6 2.8 -2.8 6.6 -2.8 -6.6 -6.6 -2.8 6.6 -2.8 Z"
          fill="#fbbf24"
        />
        <rect x="286" y="54" width="68" height="7" rx="3.5" fill="url(#dq-ach-gold)" />
        <path d="M288 61 h64 v15 a32 32 0 0 1 -64 0 Z" fill="url(#dq-ach-gold)" />
        <path d="M296 65 a22 22 0 0 1 48 0 Z" fill="#fff" opacity="0.35" />
        <path
          d="M288 64 a11 11 0 0 0 0 15"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M352 64 a11 11 0 0 1 0 15"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="316.5" y="76" width="7" height="18" rx="2" fill="#f59e0b" />
        <path d="M303 94 h34 l-3 11 h-28 Z" fill="url(#dq-ach-gold)" />

        {/* milestone chips */}
        <g fontFamily={font}>
          <g>
            <rect
              x="164"
              y="163"
              width="98"
              height="26"
              rx="13"
              fill="#fff"
              stroke="#ddd6fe"
              strokeWidth="1"
            />
            <circle cx="190" cy="176" r="3.5" fill="url(#dq-ach-gold)" />
            <text x="202" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#4c1d95">
              {achievement.mentees}
            </text>
          </g>
          <g>
            <rect
              x="271"
              y="163"
              width="98"
              height="26"
              rx="13"
              fill="#fff"
              stroke="#ddd6fe"
              strokeWidth="1"
            />
            <circle cx="297" cy="176" r="3.5" fill="url(#dq-ach-violet)" />
            <text x="309" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#4c1d95">
              {achievement.mentors}
            </text>
          </g>
          <g>
            <rect
              x="378"
              y="163"
              width="98"
              height="26"
              rx="13"
              fill="#fff"
              stroke="#ddd6fe"
              strokeWidth="1"
            />
            <circle cx="404" cy="176" r="3.5" fill="url(#dq-ach-gold)" />
            <text x="416" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#4c1d95">
              {achievement.cities}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

function SuccessStoryModal({
  story,
  onClose,
}: {
  story: SuccessStory | null;
  onClose: () => void;
}) {
  const StoryIcon = story ? getContentIcon(story.icon) : Quote;
  return (
    <AnimatePresence>
      {story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${story.name} success story`}
          className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-soft-border/70 bg-surface shadow-elevated sm:max-w-lg"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-soft-border/70 bg-background/80 text-foreground/70 backdrop-blur transition-colors hover:text-foreground sm:right-4 sm:top-4 sm:h-9 sm:w-9"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-soft-border/60 bg-linear-to-br from-violet-500/10 via-secondary/5 to-transparent px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-primary/15 font-display text-base font-semibold text-violet-700 sm:h-16 sm:w-16">
                  {story.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-violet-700">{story.role}</p>
                  <h3 className="mt-0.5 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {story.name}
                  </h3>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                    <StoryIcon className="h-3 w-3" /> {story.meta}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 sm:px-6 sm:py-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700">
                <Quote className="h-3 w-3" /> Their story
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {story.text}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InitiativesSection() {
  const { home } = useSiteContent();
  const copy = home.initiatives;
  const devqueens = copy.devqueens;
  const webcare = copy.webcare;
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);
  const websites = usePublicContent<Website>("websites", WEBSITES);
  const orderedWebsites = [...websites].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featuredWebsite = websites.find((website) => website.isFeatured);

  return (
    <section id="initiatives" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <Section>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.title} <span className="text-primary">{copy.highlight}</span>
              {copy.suffix}
            </>
          }
          description={copy.description}
        />

        <div className="relative mt-16">
          <ConstellationLines />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* ---------------- DEVQUEENS ---------------- */}
            <Reveal variant="fade-right" duration={700} className="lg:col-span-2">
              <div className="group relative h-full overflow-hidden rounded-[32px] border border-violet-200/70 bg-gradient-to-br from-violet-50 via-surface to-surface p-8 shadow-elevated transition-all duration-500 hover:-translate-y-1 sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.14),transparent_55%)]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-200/40 blur-2xl transition-transform duration-700 group-hover:scale-125"
                />

                <div className="relative flex h-full flex-col">
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <Quote className="h-3 w-3" /> {devqueens.badge}
                  </span>

                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl">
                    {devqueens.title} <span className="text-violet-600">{devqueens.highlight}</span>
                    {devqueens.suffix}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {devqueens.description}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {devqueens.pillars.map((p, i) => {
                      const Icon = getContentIcon(p.icon);
                      return (
                        <motion.div
                          key={p.title}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="rounded-2xl border border-violet-200/60 bg-white/70 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h4 className="mt-3 text-sm font-semibold text-foreground">{p.title}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {p.text}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-violet-200/60 bg-white/50 p-5 backdrop-blur">
                    {devqueens.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                          {s.value}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://chat.whatsapp.com/Kg6jU7XWt3JFiMnztbjK1Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#20BD5A]"
                  >
                    {devqueens.joinLabel}{" "}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>

                  {/* Success stories */}
                  <div className="mt-10 border-t border-violet-200/60 pt-7">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-xs font-medium text-violet-700">
                        <Award className="h-3.5 w-3.5" /> {devqueens.successLabel}
                      </span>
                      <div className="h-px flex-1 bg-violet-200/50" />
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      {devqueens.stories.map((s, i) => {
                        const StoryIcon = getContentIcon(s.icon);
                        return (
                          <motion.button
                            key={s.name}
                            type="button"
                            onClick={() => setActiveStory(s)}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group/card w-full rounded-2xl border border-violet-200/60 bg-white/70 p-4 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                          >
                            <div className="flex items-center gap-3">
                              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 to-primary/15 font-display text-xs font-semibold text-violet-700">
                                {s.initials}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-foreground">
                                  {s.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">{s.role}</p>
                              </div>
                            </div>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                              <StoryIcon className="h-3 w-3" /> {s.meta}
                            </p>
                            <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-violet-700 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                              {devqueens.readStory} <ArrowUpRight className="h-3 w-3" />
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <DevQueensAchievement achievement={devqueens.achievement} />
                </div>
              </div>
            </Reveal>

            {/* ---------------- WEBCARE ---------------- */}
            <Reveal variant="fade-left" delay={100} duration={700}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-orange-200/70 bg-gradient-to-b from-orange-50 via-surface to-surface p-7 shadow-elevated transition-all duration-500 hover:-translate-y-1">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_55%)]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl transition-transform duration-700 group-hover:scale-125"
                />

                <div className="relative flex flex-1 flex-col">
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
                    <Globe className="h-3 w-3" /> {webcare.badge}
                  </span>

                  <h3 className="mt-5 font-display text-xl font-semibold leading-tight tracking-tight text-balance">
                    {webcare.title} <span className="text-primary">{webcare.highlight}</span>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {webcare.description}{" "}
                    <strong className="text-foreground">{webcare.descriptionStrong}</strong>
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {webcare.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-orange-200/60 pt-5">
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-orange-700">
                      <Globe className="h-3 w-3" /> {webcare.websitesLabel}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {orderedWebsites.map((w) => (
                        <li key={w.slug}>
                          <a
                            href={w.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-orange-100/60 hover:text-foreground"
                          >
                            <span>{w.name}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t border-orange-200/60 pt-5">
                    {featuredWebsite && (
                      <>
                        <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-orange-700">
                          <GraduationCap className="h-3 w-3" /> {webcare.featuredPrefix} ·{" "}
                          {featuredWebsite.name}
                        </p>

                        <a
                          href={featuredWebsite.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/img mt-3 block overflow-hidden rounded-2xl border border-orange-200/60 bg-orange-50 shadow-soft transition-all duration-300 hover:shadow-elevated"
                        >
                          <span className="block aspect-[16/10] w-full overflow-hidden">
                            <img
                              src={resolveCmsImage(featuredWebsite.image) || iconnbookImg}
                              alt={featuredWebsite.name + " website preview"}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                            />
                          </span>
                        </a>

                        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                          {featuredWebsite.description}
                        </p>

                        <a
                          href={featuredWebsite.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                        >
                          {webcare.viewPrefix} {featuredWebsite.name}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <SuccessStoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </section>
  );
}
