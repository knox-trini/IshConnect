import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IshConnect OG Image</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      font-family: 'Segoe UI', 'Arial', sans-serif;
      background: linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 30%, #FFF7ED 60%, #FFEDD5 100%);
      overflow: hidden;
      position: relative;
    }
    .grid {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: radial-gradient(circle, #F97316 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .orb-1 {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%);
    }
    .orb-2 {
      position: absolute;
      bottom: -100px;
      left: -60px;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(251,146,60,0.08), transparent 70%);
    }
    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 60px 70px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 100px;
      background: rgba(255,255,255,0.8);
      border: 1px solid rgba(249,115,22,0.15);
      font-size: 14px;
      font-weight: 600;
      color: #F97316;
      width: fit-content;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #F97316;
    }
    h1 {
      font-size: 56px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.08;
      color: #111827;
      margin-top: 20px;
    }
    h1 span {
      color: #F97316;
    }
    .subtitle {
      font-size: 22px;
      font-weight: 400;
      color: #6B7280;
      line-height: 1.4;
      margin-top: 12px;
      max-width: 700px;
    }
    .domain {
      margin-top: 32px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .domain-text {
      font-size: 18px;
      font-weight: 600;
      color: #374151;
      letter-spacing: -0.01em;
    }
    .separator {
      width: 1px;
      height: 20px;
      background: #D1D5DB;
    }
    .location {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
      font-weight: 500;
      color: #9CA3AF;
    }
    .location svg {
      width: 16px;
      height: 16px;
    }
    .right-decoration {
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      width: 240px;
      height: 240px;
      border-radius: 32px;
      background: linear-gradient(135deg, rgba(249,115,22,0.08), rgba(249,115,22,0.02));
      border: 1px solid rgba(249,115,22,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right-decoration-inner {
      text-align: center;
    }
    .right-decoration-inner .big {
      font-size: 64px;
      font-weight: 800;
      color: #F97316;
      letter-spacing: -0.03em;
      line-height: 1;
    }
    .right-decoration-inner .small {
      font-size: 14px;
      font-weight: 500;
      color: #9CA3AF;
      margin-top: 4px;
    }
    .footer-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #F97316, #FB923C, #F97316);
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="orb-1"></div>
  <div class="orb-2"></div>
  <div class="footer-bar"></div>

  <div class="content">
    <div class="badge">
      <div class="badge-dot"></div>
      Software Development & AI Innovation Studio
    </div>

    <h1>IshConnect</h1>

    <p class="subtitle">
      We build web apps, mobile platforms, AI systems,<br>
      and tech training programs from Kigali, Rwanda.
    </p>

    <div class="domain">
      <span class="domain-text">ishconnect.rw</span>
      <div class="separator"></div>
      <div class="location">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Kigali, Rwanda
      </div>
    </div>
  </div>

  <div class="right-decoration">
    <div class="right-decoration-inner">
      <div class="big">500+</div>
      <div class="small">Students Empowered</div>
    </div>
  </div>
</body>
</html>`;

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  process.env.CHROME_BIN,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
].filter(Boolean);

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (p && existsSync(p)) return p;
  }
  return null;
}

const outDir = resolve(process.cwd(), "public");
const outPath = resolve(outDir, "og-image.png");

async function generate() {
  const executablePath = findChrome();
  if (!executablePath) {
    console.warn("[og-image] Chrome not found. Skipping.");
    return;
  }

  try {
    const puppeteer = (await import("puppeteer-core")).default;
    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-gpu"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.screenshot({ path: outPath, type: "png", omitBackground: false });
    await browser.close();
    console.log(`[og-image] Generated -> ${outPath} (1200x630)`);
  } catch (err) {
    console.error("[og-image] Failed:", err.message);
  }
}

generate();
