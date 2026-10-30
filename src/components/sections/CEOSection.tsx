import { Calendar, MapPin, Lightbulb, Quote } from "lucide-react";
import { Reveal } from "../Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";
import { resolveCmsImage } from "@/lib/cms-api";

import ceoImage from "@/assets/team/ceo.jpeg";

export function CEOSection() {
  const { founder: copy } = useSiteContent();
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="fade-left" duration={700} className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] border border-soft-border/70 bg-[#FFF7ED] shadow-elevated">
            <img
              src={resolveCmsImage(copy.image) || ceoImage}
              alt={`${copy.name} — ${copy.role}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#111827] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
              {copy.badge}
            </div>
            <div className="absolute bottom-4 right-4 rounded-2xl bg-[#111827] px-3 py-2 text-white shadow-lg">
              <p className="text-[10px] uppercase tracking-wider opacity-70">{copy.basedInLabel}</p>
              <p className="text-xs font-semibold">{copy.basedIn}</p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade-right" delay={100} duration={700} className="lg:col-span-7">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7ED] text-[#F97316] shadow-soft">
            <Quote className="h-7 w-7" />
          </div>

          <blockquote className="mt-6 font-display text-3xl font-medium leading-snug tracking-tight text-balance sm:text-4xl md:text-[2.6rem]">
            "{copy.quote}
            <span className="text-[#F97316]"> {copy.quoteHighlight}</span>"
          </blockquote>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {copy.intro}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {copy.bio}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-soft-border/60 bg-surface p-4 shadow-soft">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {copy.foundedLabel}
                </p>
                <p className="text-sm font-medium text-foreground">{copy.founded}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-soft-border/60 bg-surface p-4 shadow-soft">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {copy.locationLabel}
                </p>
                <p className="text-sm font-medium text-foreground">{copy.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-soft-border/60 bg-surface p-4 shadow-soft sm:col-span-2">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {copy.missionLabel}
                </p>
                <p className="text-sm font-medium text-foreground">{copy.mission}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-soft-border" />
            <div className="text-right">
              <p className="font-display text-2xl italic tracking-tight text-[#111827]">
                {copy.name}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {copy.role}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
