import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePublicItem } from "@/hooks/usePublicContent";
import { DEFAULT_SITE_CONTENT, mergeSiteContent, type SiteContent } from "@/lib/site-content";
import { PAGE_SEO, type PageSEOConfig } from "@/lib/seo";

const SiteContentContext = createContext<SiteContent>(DEFAULT_SITE_CONTENT);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const record = usePublicItem<{ content?: unknown }>("pages", "site");
  const value = useMemo(() => mergeSiteContent(record?.content), [record]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function usePageSeo(page: string): PageSEOConfig {
  const content = useSiteContent();
  return content.seo[page] || PAGE_SEO[page];
}
