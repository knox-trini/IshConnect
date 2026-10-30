import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { CEOSection } from "@/components/sections/CEOSection";
import { Reveal } from "@/components/Reveal";
import { usePageSeo, useSiteContent } from "@/hooks/useSiteContent";

export function Solutions() {
  const config = usePageSeo("solutions");
  const { solutionsPage: copy } = useSiteContent();
  const services = copy.services;
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      {services.map((s) => (
        <ServiceJsonLd key={s.name} name={s.name} description={s.description} />
      ))}
      <div className="pt-28">
        <SolutionsSection />
        <CEOSection />
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
