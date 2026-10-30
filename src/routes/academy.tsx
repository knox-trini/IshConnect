import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/JsonLd";
import { PROGRAMS } from "@/lib/programs";
import { AcademySection } from "@/components/sections/AcademySection";
import { DevQueensSection } from "@/components/sections/DevQueensSection";
import { Reveal } from "@/components/Reveal";
import { usePageSeo, useSiteContent } from "@/hooks/useSiteContent";

export function Academy() {
  const config = usePageSeo("academy");
  const { academyPage: copy } = useSiteContent();
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      {PROGRAMS.map((program) => (
        <CourseJsonLd key={program.slug} program={program} />
      ))}
      <div className="pt-28">
        <AcademySection />
        <DevQueensSection />
        {/* Internal linking */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
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
        </section>
      </div>
    </>
  );
}
