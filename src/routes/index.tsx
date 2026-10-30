import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AcademySection } from "@/components/sections/AcademySection";
import { InitiativesSection } from "@/components/sections/InitiativesSection";
import { EventsEditor } from "@/components/events/EventsEditor";
import { BootcampSection } from "@/components/sections/BootcampSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_SETTINGS } from "@/lib/site-settings";

const config = PAGE_SEO.home;

export function Home() {
  const settings = useSiteSettings();
  const faqQuestions = settings.faqs?.length ? settings.faqs : DEFAULT_SETTINGS.faqs || [];
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <FaqJsonLd questions={faqQuestions} />
      <Hero />
      <PartnersSection />
      <SolutionsSection />
      <WorkSection compact />
      <AcademySection />
      <InitiativesSection />
      <TestimonialsSection compact />
      <BootcampSection />
      <EventsEditor />
    </>
  );
}
