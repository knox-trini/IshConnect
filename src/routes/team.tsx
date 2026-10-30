import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { TeamSection } from "@/components/sections/TeamSection";
import { Reveal } from "@/components/Reveal";

const config = PAGE_SEO.team;

export function Team() {
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <div className="pt-28">
        <TeamSection />
        {/* Internal linking */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Reveal variant="fade-up" duration={600}>
            <div className="rounded-3xl border border-soft-border/70 bg-surface p-8 sm:p-12 shadow-soft text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Explore more of IshConnect
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link to="/founder" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background magnetic-btn">
                  Meet the Founder
                </Link>
                <Link to="/about" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-soft-border bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary">
                  About IshConnect
                </Link>
                <Link to="/work" className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-soft-border bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary">
                  Our Work
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
