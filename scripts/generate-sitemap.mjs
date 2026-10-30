import { writeFileSync, existsSync, readFileSync, readdirSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://www.ishconnect.rw";

const STATIC_ROUTES = [
  { loc: "/", priority: 1.0, changefreq: "weekly" },
  { loc: "/about", priority: 0.8, changefreq: "monthly" },
  { loc: "/founder", priority: 0.7, changefreq: "monthly" },
  { loc: "/team", priority: 0.7, changefreq: "monthly" },
  { loc: "/academy", priority: 0.9, changefreq: "weekly" },
  { loc: "/contact", priority: 0.8, changefreq: "monthly" },
  { loc: "/solutions", priority: 0.9, changefreq: "monthly" },
  { loc: "/work", priority: 0.8, changefreq: "weekly" },
  { loc: "/webcare", priority: 0.8, changefreq: "monthly" },
  { loc: "/community", priority: 0.7, changefreq: "monthly" },
  { loc: "/devqueens", priority: 0.7, changefreq: "monthly" },
  { loc: "/challenges", priority: 0.7, changefreq: "monthly" },
  { loc: "/testimonials", priority: 0.7, changefreq: "monthly" },
  { loc: "/privacy", priority: 0.3, changefreq: "yearly" },
  { loc: "/software-development-rwanda", priority: 0.8, changefreq: "monthly" },
  { loc: "/web-development-kigali", priority: 0.8, changefreq: "monthly" },
  { loc: "/mobile-app-development-rwanda", priority: 0.8, changefreq: "monthly" },
  { loc: "/ai-solutions-rwanda", priority: 0.8, changefreq: "monthly" },
  { loc: "/cybersecurity-rwanda", priority: 0.7, changefreq: "monthly" },
  { loc: "/cloud-services-rwanda", priority: 0.7, changefreq: "monthly" },
  { loc: "/tech-training-rwanda", priority: 0.7, changefreq: "monthly" },
];

function getProjectSlugs() {
  const assetsDir = resolve(process.cwd(), "dist", "assets");
  if (!existsSync(assetsDir)) return [];

  try {
    const files = readdirSync(assetsDir);
    const projectFile = files.find((f) => f.startsWith("projects-") && f.endsWith(".js"));
    if (!projectFile) return [];

    const src = readFileSync(resolve(assetsDir, projectFile), "utf-8");
    const matches = src.match(/"slug":"([^"]+)"/g);
    if (!matches) return [];
    return [...new Set(matches.map((m) => m.slice(8, -1)))];
  } catch {
    return [];
  }
}

function generate() {
  const projectSlugs = getProjectSlugs();
  const allRoutes = [...STATIC_ROUTES];

  for (const slug of projectSlugs) {
    allRoutes.push({ loc: `/work/${slug}`, priority: 0.7, changefreq: "monthly" });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes.map((r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  const outPath = resolve(process.cwd(), "dist", "sitemap.xml");
  writeFileSync(outPath, xml);
  console.log(`[sitemap] Generated ${allRoutes.length} URLs -> ${outPath}`);
}

generate();
