import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "../Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_SETTINGS, type SiteStat } from "@/lib/site-settings";

function Counter({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, {
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
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

export function TrustStats() {
  const settings = useSiteSettings();
  const stats = settings.stats?.length ? settings.stats : (DEFAULT_SETTINGS.stats as SiteStat[]);
  return (
    <section
      className="border-y border-soft-border/60 bg-surface-elevated"
      aria-label="IshConnect impact statistics"
    >
      <h2 className="sr-only">
        IshConnect by the numbers — students empowered, projects delivered, countries reached, and
        client satisfaction
      </h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 sm:py-20 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} variant="fade-up" delay={i * 80} duration={600}>
            <div className="text-center">
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} delay={i * 0.12} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
