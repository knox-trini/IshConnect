import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { PROJECTS, type Project } from "@/lib/projects";
import { usePublicContent } from "@/hooks/usePublicContent";
import { WorkSection } from "@/components/sections/WorkSection";
import { TrustStats } from "@/components/sections/TrustStats";

const config = PAGE_SEO.work;

export function Work() {
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


