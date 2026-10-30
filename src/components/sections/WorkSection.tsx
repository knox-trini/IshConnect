import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { PROJECTS, type Project } from "@/lib/projects";
import { usePublicContent } from "@/hooks/usePublicContent";
import { resolveCmsImage } from "@/lib/cms-api";

export function WorkSection({ compact = false }: { compact?: boolean }) {
  const projects = usePublicContent<Project>("projects", PROJECTS);
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected Work"
        title={
          <>
            Products that move <span className="text-primary">markets.</span>
          </>
        }
        description="A handful of recent collaborations across fintech, health, agritech, sustainability and consumer."
      />

      <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-20">
        {(compact ? projects.slice(0, 3) : projects).map((p, i) => (
          <Reveal key={p.slug} variant="fade-up" delay={i * 80} duration={700}>
            <ProjectRow p={p} reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectRow({ p, reverse }: { p: Project; reverse: boolean }) {
  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* IMAGE SIDE */}
      <div className="lg:col-span-7">
        <Link
          to={`/work/${p.slug}`}
          className={`group relative aspect-16/10 overflow-hidden rounded-3xl border border-soft-border/70 bg-linear-to-br ${p.accent} shadow-elevated block`}
        >
          {/* Browser mockup */}
          <div className="absolute inset-3 rounded-2xl bg-surface/95 p-3 shadow-soft sm:inset-4 sm:p-4">
            {/* Top bar */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className="ml-3 truncate text-[10px] text-muted-foreground">
                {p.title.toLowerCase().replace(/\s+/g, "")}.app
              </span>
            </div>

            {/* PROJECT IMAGE */}
            <div className="relative mt-3 h-[calc(100%-28px)] overflow-hidden rounded-2xl border border-soft-border/60 bg-muted">
              <img
                src={resolveCmsImage(p.image)}
                alt={`${p.title} — ${p.category} project screenshot`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent" />
            </div>
          </div>
        </Link>
      </div>

      {/* CONTENT SIDE */}
      <div className="lg:col-span-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
          {p.category}
        </span>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          <Link to={`/work/${p.slug}`} className="hover:text-primary transition-colors">
            {p.title}
          </Link>
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {p.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-soft-border/70 bg-muted px-2.5 py-1 text-xs text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          to={`/work/${p.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          See Work
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
