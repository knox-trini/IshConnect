import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import type { PageSEOConfig } from "@/lib/seo";

interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceTemplateProps {
  config: PageSEOConfig;
  title: string;
  description: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  faqs?: FaqItem[];
}

export function ServiceTemplate({
  config,
  title,
  description,
  features,
  ctaText = "Start a Project",
  ctaLink = "/contact",
  faqs,
}: ServiceTemplateProps) {
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <ServiceJsonLd name={config.title} description={config.description} />
      {faqs && faqs.length > 0 && <FaqJsonLd questions={faqs} />}
      <div className="pt-32 sm:pt-40">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              {description}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Link
              to={ctaLink}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background magnetic-btn"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </Section>
      </div>
    </>
  );
}
