import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePageSeo, useSiteContent } from "@/hooks/useSiteContent";
import { DEFAULT_SETTINGS, type TimelineItem } from "@/lib/site-settings";

export function About() {
  const config = usePageSeo("about");
  const { about: copy } = useSiteContent();
  const settings = useSiteSettings();
  const timeline = settings.timeline?.length
    ? settings.timeline
    : (DEFAULT_SETTINGS.timeline as TimelineItem[]);
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <div className="pt-28">
        {/* Hero */}
        <Section>
          <div className="max-w-3xl">
            <Reveal variant="fade-up" duration={500}>
              <span className="inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {copy.badge}
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={50} duration={600}>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
                {settings.aboutPageTitle || "Building Africa's"}{" "}
                <span className="text-primary">{settings.aboutHighlight || "digital future."}</span>
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={100} duration={600}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                {settings.aboutPageDescription ||
                  "IshConnect is a Kigali-based technology studio focused on software engineering, AI systems, and tech education. We build digital products that drive economic growth across Africa."}
              </p>
            </Reveal>
          </div>

          {/* Quick links — critical for sitelinks */}
          <Reveal variant="fade-up" delay={150} duration={600}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {copy.quickLinks.map((link) => (
                <Link
                  key={`${link.to}-${link.label}`}
                  to={link.to}
                  className={
                    link.primary
                      ? "inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background magnetic-btn"
                      : "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-soft-border bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm hover:border-primary hover:text-primary"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Mission */}
        <Section>
          <div className="max-w-3xl">
            <Reveal variant="fade-up" duration={500}>
              <span className="inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {copy.missionBadge}
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={50} duration={600}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
                {copy.missionTitle} <span className="text-primary">{copy.missionHighlight}</span>
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={100} duration={600}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                {settings.missionDescription ||
                  "Founded in 2020, IshConnect delivers world-class software development, AI solutions, and technology training to startups, enterprises, and government organizations across Rwanda and the African continent."}
              </p>
            </Reveal>
            <Reveal variant="fade-up" delay={120} duration={600}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
                Through our{" "}
                <Link to="/academy" className="text-primary hover:underline">
                  Academy
                </Link>
                , we train the next generation of African engineers. Our{" "}
                <Link to="/webcare" className="text-primary hover:underline">
                  WebCare
                </Link>{" "}
                service keeps digital products running smoothly, and our{" "}
                <Link to="/academy" className="text-primary hover:underline">
                  DevQueens
                </Link>{" "}
                initiative empowers women in technology.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* Timeline */}
        <Section id="timeline">
          <Reveal variant="fade-up" duration={500}>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {copy.journeyEyebrow}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={50} duration={600}>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{copy.journeyTitle}</h2>
          </Reveal>
          <Reveal variant="fade-up" delay={100} duration={600}>
            <p className="mt-3 max-w-2xl text-sm text-gray-600">{copy.journeyDescription}</p>
          </Reveal>

          <div className="relative mt-14">
            <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gray-200 sm:-translate-x-px" />
            <div className="space-y-14">
              {timeline.map((t, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <Reveal key={t.title} variant="fade-up" delay={i * 50} duration={500}>
                    <div className="relative flex flex-col sm:flex-row sm:items-center">
                      <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-10">
                        <div className="h-3.5 w-3.5 rounded-full bg-primary shadow-sm" />
                      </div>
                      <div
                        className={`ml-12 sm:ml-0 sm:w-[45%] ${isLeft ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"}`}
                      >
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {t.year}
                          </span>
                          <h3 className="mt-3 text-lg font-semibold text-gray-900">{t.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Section>

        {/* CTA Section with internal links for sitelinks */}
        <Section>
          <Reveal variant="fade-up" duration={600}>
            <div className="rounded-3xl border border-soft-border/70 bg-surface p-8 sm:p-12 shadow-soft text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {copy.ctaTitle}
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {copy.ctaLinks.map((link) => (
                  <Link
                    key={`${link.to}-${link.label}`}
                    to={link.to}
                    className={
                      link.primary
                        ? "inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background magnetic-btn"
                        : "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-soft-border bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>
      </div>
    </>
  );
}
