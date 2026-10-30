import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, GraduationCap, Sparkles } from "lucide-react";

import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/Section";
import { ChallengeForm } from "@/components/ChallengeForm";
import { ChallengeModal, type ChallengeDetail } from "@/components/ChallengeModal";
import { getContentIcon } from "@/lib/content-icons";
import { usePageSeo, useSiteContent } from "@/hooks/useSiteContent";

type ChallengeLevel = "Beginner" | "Intermediate" | "Advanced";
type FilterKey = string;

interface Challenge extends ChallengeDetail {
  filter: string;
}

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

function LevelBadge({ level }: { level: ChallengeLevel }) {
  const styles: Record<ChallengeLevel, string> = {
    Beginner: "bg-primary/10 text-primary",
    Intermediate: "bg-foreground/5 text-foreground/80",
    Advanced: "bg-foreground text-background",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

function ChallengeCard({
  challenge,
  index,
  onViewDetails,
}: {
  challenge: Challenge;
  index: number;
  onViewDetails: (challenge: Challenge) => void;
}) {
  const { challenges: copy } = useSiteContent();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col rounded-3xl border border-soft-border/70 bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-foreground">{challenge.title}</h3>
        <LevelBadge level={challenge.level} />
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {challenge.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {challenge.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-soft-border/70 px-2.5 py-1 text-xs text-foreground/70"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-soft-border/60 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {challenge.duration}
        </span>

        <button
          onClick={() => onViewDetails(challenge)}
          className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-all duration-300 hover:gap-1.5 magnetic-btn"
        >
          {copy.viewDetails}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const { challenges: copy } = useSiteContent();
  const hero = copy.hero;
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-soft"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          {hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl md:text-5xl"
        >
          {hero.title}{" "}
          <span className="relative inline-block">
            <span className="text-primary">{hero.highlight}</span>
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
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#challenges"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background magnetic-btn"
          >
            {hero.primaryLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 rounded-full border border-soft-border bg-surface px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
          >
            {hero.secondaryLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { challenges: copy } = useSiteContent();
  return (
    <section
      className="mt-20 border-y border-soft-border/60 bg-surface-elevated"
      aria-label="Challenge program statistics"
    >
      <h2 className="sr-only">Challenge program impact by the numbers</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 sm:py-20 md:grid-cols-4">
        {copy.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} delay={i * 0.12} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ChallengesSection({ onViewDetails }: { onViewDetails: (challenge: Challenge) => void }) {
  const { challenges: copy } = useSiteContent();
  const [activeFilter, setActiveFilter] = useState<FilterKey>(copy.filters[0]?.key ?? "all");

  const filtered =
    activeFilter === "all" ? copy.items : copy.items.filter((c) => c.filter === activeFilter);

  return (
    <Section id="challenges">
      <SectionHeading
        eyebrow={copy.library.eyebrow}
        title={
          <>
            {copy.library.title} <span className="text-primary">{copy.library.highlight}</span>
            {copy.library.suffix}
          </>
        }
        description={copy.library.description}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap gap-2"
      >
        {copy.filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeFilter === f.key
                ? "bg-foreground text-background"
                : "border border-soft-border/60 bg-surface text-foreground/70 hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((challenge, i) => (
          <ChallengeCard
            key={challenge.title}
            challenge={challenge}
            index={i}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">{copy.emptyLabel}</p>
      )}
    </Section>
  );
}

function HowItWorksSection() {
  const { challenges: copy } = useSiteContent();
  return (
    <section className="border-y border-soft-border/60 bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          align="center"
          eyebrow={copy.howItWorks.eyebrow}
          title={
            <>
              {copy.howItWorks.title}{" "}
              <span className="text-primary">{copy.howItWorks.highlight}</span>
              {copy.howItWorks.suffix}
            </>
          }
          description={copy.howItWorks.description}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-5">
          {copy.steps.map((step, i) => {
            const StepIcon = getContentIcon(step.icon);
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <StepIcon className="h-5 w-5" />
                </span>

                <span className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {i + 1}
                </span>

                <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {i < copy.steps.length - 1 && (
                  <div
                    aria-hidden
                    className="mt-4 hidden h-px w-full border-t border-dashed border-soft-border/60 md:block"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SubmissionSection({ selectedChallenge }: { selectedChallenge: string }) {
  const { challenges: copy } = useSiteContent();
  return (
    <Section id="submit">
      <SectionHeading
        align="center"
        eyebrow={copy.submission.eyebrow}
        title={
          <>
            {copy.submission.title}{" "}
            <span className="text-primary">{copy.submission.highlight}</span>
            {copy.submission.suffix}
          </>
        }
        description={copy.submission.description}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-10 max-w-xl"
      >
        <div className="rounded-3xl border border-soft-border/70 bg-surface p-6 shadow-soft sm:p-8">
          <ChallengeForm defaultChallenge={selectedChallenge} />
        </div>
      </motion.div>
    </Section>
  );
}

export function Challenges() {
  const config = usePageSeo("challenges");
  const { challenges: copy } = useSiteContent();
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [modalChallenge, setModalChallenge] = useState<Challenge | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = useCallback((challenge: Challenge) => {
    setModalChallenge(challenge);
    setModalOpen(true);
  }, []);

  const handleStartBuilding = useCallback(() => {
    if (!modalChallenge) return;
    setSelectedChallenge(modalChallenge.title);
    setModalOpen(false);
    setTimeout(() => {
      const el = document.getElementById("submit");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 350);
  }, [modalChallenge]);

  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />

      <div className="pt-6">
        <HeroSection />
        <StatsSection />
        <ChallengesSection onViewDetails={handleViewDetails} />
        <HowItWorksSection />
        <SubmissionSection selectedChallenge={selectedChallenge} />

        <ChallengeModal
          open={modalOpen}
          challenge={modalChallenge}
          onClose={() => setModalOpen(false)}
          onStart={handleStartBuilding}
        />

        {/* Footer note */}
        <section className="border-t border-soft-border/60 bg-background">
          <div className="mx-auto max-w-6xl px-6 py-12 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-4 py-2 shadow-soft">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">
                {copy.footer.before}{" "}
                <Link to="/academy" className="font-medium text-foreground hover:text-primary">
                  {copy.footer.academyLabel}
                </Link>{" "}
                {copy.footer.after}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
