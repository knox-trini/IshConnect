import { createRequire } from "module";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, extname, resolve } from "path";

const require = createRequire(import.meta.url);
const DIST = resolve(process.cwd(), "dist");

function getProjectSlugs() {
  const assetsDir = resolve(DIST, "assets");
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

function buildRoutes() {
  const staticRoutes = [
    "/",
    "/about",
    "/academy",
    "/contact",
    "/solutions",
    "/work",
    "/challenges",
    "/privacy",
    "/testimonials",
    "/software-development-rwanda",
    "/web-development-kigali",
    "/mobile-app-development-rwanda",
    "/ai-solutions-rwanda",
    "/cybersecurity-rwanda",
    "/cloud-services-rwanda",
    "/tech-training-rwanda",
  ];
  const projectSlugs = getProjectSlugs();
  return [...staticRoutes, ...projectSlugs.map((s) => `/work/${s}`)];
}

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === "/" ? "index.html" : req.url);
      if (!existsSync(filePath) || extname(filePath) === "") {
        filePath = join(DIST, "index.html");
      }
      const ext = extname(filePath);
      const contentType = MIME[ext] || "application/octet-stream";
      try {
        const content = readFileSync(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(0, () => {
      const port = server.address().port;
      console.log(`[prerender] Server started on port ${port}`);
      resolve({ server, port });
    });
  });
}

async function findChrome() {
  if (process.platform === "linux") {
    try {
      const chromium = require("@sparticuz/chromium");
      const execPath = await chromium.executablePath();
      if (execPath && existsSync(execPath)) {
        return execPath;
      }
    } catch {
      // @sparticuz/chromium not available, continue
    }
  }

  const knownPaths = [
    process.env.CHROME_PATH,
    process.env.CHROME_BIN,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    ...(process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
          `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
        ]
      : process.platform === "darwin"
        ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
        : [
            "/usr/bin/google-chrome",
            "/usr/bin/chromium-browser",
            "/usr/bin/chromium",
            "/snap/bin/chromium",
            "/usr/bin/google-chrome-stable",
          ]),
  ];

  for (const p of knownPaths) {
    if (p && existsSync(p)) return p;
  }

  return null;
}

async function prerender() {
  console.log("[prerender] Starting prerender...");

  const executablePath = await findChrome();
  if (!executablePath) {
    console.warn("[prerender] Chrome/Chromium not found. Skipping prerender. SPA will still work.");
    return;
  }

  console.log(`[prerender] Chrome found at: ${executablePath}`);

  const { server, port } = await startServer();
  let browser;

  try {
    const puppeteer = require("puppeteer-core");
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
    });
    console.log("[prerender] Browser launched");

    const routes = buildRoutes();
    for (const route of routes) {
      const url = `http://localhost:${port}${route}`;
      console.log(`[prerender] Rendering ${route}...`);

      const page = await browser.newPage();

      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        await page.waitForSelector("#main-content", { timeout: 15000 });
        await new Promise((r) => setTimeout(r, 3000));

        const html = await page.content();
        const outputDir = join(DIST, route === "/" ? "" : route);
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
        writeFileSync(join(outputDir, "index.html"), html);
        console.log(`[prerender] ✓ ${route} -> ${join(outputDir, "index.html")}`);
      } catch (err) {
        console.warn(`[prerender] ✗ ${route} failed: ${err.message}`);
      } finally {
        await page.close();
      }
    }

    console.log("[prerender] All routes processed");
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.warn("[prerender] Skipped:", err.message);
  process.exit(0);
});
