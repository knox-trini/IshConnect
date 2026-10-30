import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Shield, ChevronRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/utils";
import { usePageSeo, useSiteContent } from "@/hooks/useSiteContent";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function PolicySection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="scroll-mt-28"
    >
      <div className="rounded-2xl border border-soft-border/50 bg-surface p-8 shadow-soft transition-shadow duration-300 hover:shadow-elevated sm:p-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          Section
        </span>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export function Privacy() {
  const config = usePageSeo("privacy");
  const { privacy: copy, contact } = useSiteContent();
  const sections = copy.sections;
  const activeSection = useActiveSection(sections.map((s) => s.id));

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />

      <div className="pt-28">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF7ED] via-surface to-background pb-16 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#F97316]/10 to-[#FB923C]/5 blur-3xl" />
            <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-[#FB923C]/8 to-[#FFF7ED]/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#F97316]/5 to-transparent blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 pt-16 text-center sm:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {copy.lastUpdated}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
                <Shield className="h-3 w-3 text-primary" />
                {copy.operatedBy}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {copy.title}{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
                {copy.highlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {copy.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-medium text-[#F97316]">
                {copy.registered}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs italic">{copy.agreement}</span>
            </motion.div>
          </div>

          {/* Section divider */}
          <div className="relative mt-12 sm:mt-16">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-soft-border to-transparent" />
          </div>
        </section>

        {/* ── Main Content ── */}
        <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            {/* Table of Contents */}
            <aside className="relative">
              <div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
                <motion.nav
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  aria-label="Table of contents"
                  className="mb-10 rounded-2xl border border-soft-border/40 bg-surface p-5 shadow-soft lg:mb-0"
                >
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {copy.tocTitle}
                  </h2>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => handleTocClick(e, section.id)}
                          className={cn(
                            "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            activeSection === section.id
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        >
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 shrink-0 transition-all duration-200",
                              activeSection === section.id
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-0.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                            )}
                          />
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
            </aside>

            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {sections.map((section, i) => (
                <PolicySection key={section.id} id={section.id} index={i} title={section.title}>
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.id === "contact-information" && (
                    <div className="mt-6 grid gap-4 rounded-xl bg-[#FFF7ED] p-5 sm:grid-cols-2 sm:p-6">
                      <a
                        href={`mailto:${contact.cards.email}`}
                        className="group flex items-center gap-3 rounded-lg bg-surface p-4 text-sm transition-all duration-200 hover:shadow-soft"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{copy.emailLabel}</p>
                          <p className="font-medium text-foreground group-hover:text-primary">
                            {contact.cards.email}
                          </p>
                        </div>
                      </a>
                      <div className="flex items-center gap-3 rounded-lg bg-surface p-4 text-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{copy.locationLabel}</p>
                          <p className="font-medium text-foreground">{copy.location}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </PolicySection>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Footer Note ── */}
        <section className="border-t border-soft-border/60 bg-surface-elevated">
          <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-xl"
            >
              <Shield className="mx-auto h-6 w-6 text-primary/60" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {copy.footerTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {copy.footerText}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">{copy.footerAgreement}</p>
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground/50">
                <Link to="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
                <span>&middot;</span>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
                <span>&middot;</span>
                <span>{copy.footerLocation}</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
