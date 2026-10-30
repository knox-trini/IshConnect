import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ContactSection } from "@/components/sections/ContactSection";
import { usePageSeo } from "@/hooks/useSiteContent";

export function Contact() {
  const config = usePageSeo("contact");
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
