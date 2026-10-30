import { ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getContentIcon } from "@/lib/content-icons";

export function DevQueensSection() {
  const { academy } = useSiteContent();
  const copy = academy.devqueens;
  return (
    <section id="devqueens" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.pillars.map((p, i) => {
            const Icon = getContentIcon(p.icon);
            return (
              <Reveal key={p.title} variant="fade-up" delay={i * 80} duration={600}>
                <div className="rounded-3xl border border-soft-border/70 bg-surface p-7 shadow-soft h-full">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade-up" duration={600}>
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl border border-soft-border/70 bg-foreground/5 p-6 sm:mx-16 md:mx-32">
            {copy.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="fade-up" duration={600}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={copy.communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#20BD5A]"
            >
              {copy.joinLabel}{" "}
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </Section>
    </section>
  );
}
