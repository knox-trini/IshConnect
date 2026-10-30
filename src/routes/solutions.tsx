import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { CEOSection } from "@/components/sections/CEOSection";
import { Reveal } from "@/components/Reveal";

const config = PAGE_SEO.solutions;
const services = [
  {
    name: "Digital Platform Engineering",
    description:
      "Full-stack web and mobile platforms built with modern tooling for scale and performance.",
  },
  {
    name: "Cloud & DevOps",
    description:
      "Resilient cloud infrastructure, CI/CD pipelines, and automated deployment strategies.",
  },
  {
    name: "Cybersecurity",
    description:
      "Offensive and defensive security services including audit, penetration testing, and compliance.",
  },
  {
    name: "UI / UX Design",
    description:
      "Research-driven interface design, prototyping, and design systems for digital products.",
  },
];

export function Solutions() {
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
                See our work in action
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link to="/work" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background magnetic-btn">
                  View Our Work
                </Link>
                <Link to="/contact" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-soft-border bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary">
                  Start a Project
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
