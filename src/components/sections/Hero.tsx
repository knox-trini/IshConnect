import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Globe, Award, Activity } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_SETTINGS, type SiteStat } from "@/lib/site-settings";

const STAT_ICONS = [Users, Activity, Globe, Award];

function AnimatedCounter({
  to,
  suffix = "",
  delay = 0,
}: {
  to: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, mv, to, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Hero() {
  const settings = useSiteSettings();
  const primaryUrl = settings.heroPrimaryUrl || "/contact";
  const secondaryUrl = settings.heroSecondaryUrl || "/work";
  const primaryExternal = /^https?:\/\//i.test(primaryUrl);
  const secondaryExternal = /^https?:\/\//i.test(secondaryUrl);
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 pt-28 sm:pt-32">
      {/* Premium gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(249,115,22,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(249,115,22,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_90%,rgba(251,146,60,0.04),transparent)]" />
        <svg
          className="h-full w-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <pattern
              id="hero-grid"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#F97316" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
        {/* Left: Content */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-soft-border/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-soft backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary/75" />
            </span>
            {settings.heroBadge || "African future-tech · est. 2020"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            {settings.heroTitle || "Software Development Company in"}{" "}
            <span className="relative inline-block">
              <span className="relative text-primary">
                {settings.heroHighlight || "Rwanda & Africa"}
                <svg
                  className="absolute -bottom-2 left-0 h-2 w-full text-primary/40"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0 6 Q 50 0 100 4 T 200 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            {settings.heroDescription ||
              "We build web apps, mobile platforms, and AI systems for startups and enterprises across Africa from Kigali."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {primaryExternal ? (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background magnetic-btn min-h-[44px]"
              >
                {settings.heroPrimaryLabel || "Start a Project"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            ) : (
              <Link
                to={primaryUrl}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background magnetic-btn min-h-[44px]"
              >
                {settings.heroPrimaryLabel || "Start a Project"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
            {secondaryExternal ? (
              <a
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-soft-border bg-white/70 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-primary hover:text-primary"
              >
                {settings.heroSecondaryLabel || "Explore Our Work"}
              </a>
            ) : (
              <Link
                to={secondaryUrl}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-soft-border bg-white/70 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm hover:border-primary hover:text-primary"
              >
                {settings.heroSecondaryLabel || "Explore Our Work"}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Right: Premium Dashboard */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <HeroDashboard stats={settings.stats} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroDashboard({ stats }: { stats?: SiteStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const visibleStats = stats?.length ? stats : (DEFAULT_SETTINGS.stats as SiteStat[]);
  const headline = visibleStats[0] || { value: 500, suffix: "+", label: "Students Empowered" };

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-soft-border/70 bg-white shadow-premium-desktop transition-shadow duration-500 hover:shadow-glow"
    >
      {/* Glass header */}
      <div className="flex items-center justify-between border-b border-soft-border/40 bg-white/80 px-5 py-3.5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary">
            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-primary/60" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">ishconnect.rw</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="p-5">
        {/* Active Impact hero metric */}
        <div className="mb-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/5 to-orange-50 px-4 py-3.5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Active Impact
            </p>
            <p className="font-display text-3xl font-bold tracking-tight text-foreground">
              <AnimatedCounter to={headline.value} suffix={headline.suffix} delay={0.3} />
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Growing</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {visibleStats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3 rounded-xl bg-muted/60 px-3.5 py-3 hover:bg-muted/80 transition-colors"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold leading-tight">
                    <AnimatedCounter to={s.value} suffix={s.suffix} delay={0.8 + i * 0.1} />
                  </p>
                  <p className="text-[11px] leading-tight text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live status bar */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-soft-border/30 bg-gradient-to-r from-muted/30 to-muted/10 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
              Live
            </span>
          </div>
          <span className="h-3 w-px bg-soft-border/50" />
          <span className="text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground">99.99%</span> uptime
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>Kigali, Rwanda</span>
          </span>
        </div>
      </div>
    </div>
  );
}
