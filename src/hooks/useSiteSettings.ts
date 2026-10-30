import { usePublicContent } from "@/hooks/usePublicContent";
import { DEFAULT_SETTINGS, mergeSettings, type SiteSettings } from "@/lib/site-settings";

export function useSiteSettings(): SiteSettings {
  const records = usePublicContent<SiteSettings>("settings", [DEFAULT_SETTINGS]);
  const global = records.find((record) => record.slug === "global") || records[0];
  return mergeSettings(global);
}
