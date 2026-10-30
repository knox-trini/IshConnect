import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CheckCircle2, Code2, Lightbulb, Target, BookOpen, ChevronRight, ExternalLink } from "lucide-react";

export interface ChallengeDetail {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  skills: string[];
  duration: string;
  whatYouBuild: string;
  keyFeatures: string[];
  outcomes: string[];
  techStack?: string;
}

const levelStyles: Record<string, string> = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-foreground/5 text-foreground/80",
  Advanced: "bg-foreground text-background",
};

export function ChallengeModal({
  open,
  challenge,
  onClose,
  onStart,
}: {
  open: boolean;
  challenge: ChallengeDetail | null;
  onClose: () => void;
  onStart: () => void;
}) {
  if (!challenge) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-foreground/20 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-100 flex items-start justify-end p-0 sm:p-3">
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full w-full flex-col bg-surface shadow-2xl sm:w-[520px] sm:max-w-[90vw] sm:rounded-2xl sm:border sm:border-soft-border/70"
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-soft-border/60 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Challenge Details</p>
                    <p className="text-sm font-semibold text-foreground">{challenge.title}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-soft-border/60 bg-background/80 text-foreground/60 backdrop-blur transition-colors hover:bg-background hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto scrollbar-none">
                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  {/* Hero section */}
                  <div className="rounded-2xl bg-linear-to-br from-primary/[0.07] via-secondary/[0.03] to-transparent p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-3 py-1 text-[11px] font-medium text-foreground/70 shadow-soft sm:text-xs">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {challenge.duration}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium sm:text-xs ${levelStyles[challenge.level]}`}
                      >
                        {challenge.level}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                      {challenge.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-6">
                    {/* What You'll Build */}
                    <div className="rounded-xl border border-soft-border/40 bg-muted/30 p-4 sm:p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Code2 className="h-4 w-4" />
                        </span>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-foreground">
                            What You'll Build
                          </h4>
                          <p className="text-xs text-muted-foreground">Project overview</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                        {challenge.whatYouBuild}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Target className="h-4 w-4" />
                        </span>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-foreground">
                            Key Features
                          </h4>
                          <p className="text-xs text-muted-foreground">What makes this challenge</p>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {challenge.keyFeatures.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack & Skills */}
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Code2 className="h-4 w-4" />
                        </span>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-foreground">
                            Tech Stack & Skills
                          </h4>
                          <p className="text-xs text-muted-foreground">Technologies you'll use</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {challenge.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-lg border border-soft-border/60 bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-soft"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* What You'll Learn */}
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Lightbulb className="h-4 w-4" />
                        </span>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-foreground">
                            What You'll Learn
                          </h4>
                          <p className="text-xs text-muted-foreground">Outcomes & skills gained</p>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {challenge.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="flex shrink-0 items-center justify-between border-t border-soft-border/60 bg-muted/20 px-5 py-4 sm:px-6">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to challenges
                </button>
                <button
                  onClick={onStart}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/25 transition-all duration-300 hover:bg-[#ea580c] hover:shadow-xl hover:shadow-[#f97316]/35 active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Start Building
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
