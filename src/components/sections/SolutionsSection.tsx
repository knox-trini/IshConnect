import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getContentIcon } from "@/lib/content-icons";

export function SolutionsSection() {
  const { home } = useSiteContent();
  const copy = home.solutions;

  return (
    <Section id="solutions">
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
        {copy.cards.map((s, i) => {
          const Icon = getContentIcon(s.icon);
          return (
            <Reveal key={s.title} variant="fade-up" delay={i * 60} duration={550}>
              <article className="group relative overflow-hidden rounded-3xl border border-soft-border/70 bg-surface p-6 shadow-soft transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-500 group-hover:bg-primary/15" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <Link
                  to={s.href}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-primary"
                >
                  {copy.linkLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
