import { Heart, Sparkles, Users, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Mentorship",
    text: "1:1 guidance from senior women engineers shipping at top companies.",
  },
  {
    icon: Users,
    title: "Community",
    text: "A safe, ambitious sisterhood of builders, founders and creators.",
  },
  {
    icon: Heart,
    title: "Empowerment",
    text: "Scholarships, devices, and pathways into world-class tech careers.",
  },
];

const STATS = [
  { v: "120+", l: "Mentees" },
  { v: "32", l: "Mentors" },
  { v: "9", l: "Cities" },
];

export function DevQueensSection() {
  return (
    <section id="devqueens" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Section>
        <SectionHeading
          eyebrow="DevQueens"
          title={
            <>
              Empowering the Next Generation of{" "}
              <span className="text-primary">Women in Technology</span>.
            </>
          }
          description="Closing the gender gap in African tech through mentorship, community, and ambition."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} variant="fade-up" delay={i * 80} duration={600}>
              <div className="rounded-3xl border border-soft-border/70 bg-surface p-7 shadow-soft h-full">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade-up" duration={600}>
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl border border-soft-border/70 bg-foreground/5 p-6 sm:mx-16 md:mx-32">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-2xl font-semibold text-foreground">{s.v}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="fade-up" duration={600}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://chat.whatsapp.com/BIyl1UovWjzLwcGw6vtcUJ"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#20BD5A]"
            >
              Join Our Community <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </Section>
    </section>
  );
}
