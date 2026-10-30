import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { ContactSection } from "@/components/sections/ContactSection";

const config = PAGE_SEO.contact;

export function Contact() {
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <div className="pt-28">
        <ContactSection />
      </div>
    </>
  );
}
