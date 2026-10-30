import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/JsonLd";
import { PROJECTS, type Project } from "@/lib/projects";
import { usePublicContent } from "@/hooks/usePublicContent";
import { usePageSeo } from "@/hooks/useSiteContent";
import { WorkSection } from "@/components/sections/WorkSection";
import { TrustStats } from "@/components/sections/TrustStats";

export function Work() {
  const config = usePageSeo("work");
  const projects = usePublicContent<Project>("projects", PROJECTS);
  const projectItems = projects.map((p) => ({ name: p.title, url: "/work/" + p.slug }));
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <ItemListJsonLd items={projectItems} />
      <div className="pt-28">
        <WorkSection />
        <TrustStats />
      </div>
    </>
  );
}
