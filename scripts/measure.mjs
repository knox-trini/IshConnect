import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.argv[2];

const widths = [320, 375, 414, 640, 768, 820, 1024, 1280];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  defaultViewport: null,
});

for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector("#initiatives", { timeout: 30000 });
  await page.evaluate(() => {
    document.getElementById("initiatives").scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const data = await page.evaluate(() => {
    const doc = document.documentElement;
    const i = document.getElementById("initiatives");
    const q = (sel) => {
      const el = i.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) };
    };
    const overflow = doc.scrollWidth - doc.clientWidth;
    const sectionR = i.getBoundingClientRect();
    return {
      vw: doc.clientWidth,
      scrollW: doc.scrollWidth,
      hOverflow: overflow,
      section: { x: Math.round(sectionR.x), w: Math.round(sectionR.width) },
      devqueens: q('[id^="initiatives"] [class*="grid"]') ? null : null,
      dqCard: q("div.group.relative.h-full.overflow-hidden.rounded-\\[32px\\]"),
      wcCard: null,
      pillars: q("[class*='sm:grid-cols-3']"),
      stats: q("[class*='grid-cols-3']"),
      stories: q("[class*='sm:grid-cols-3']"),
    };
  });

  // simpler: measure the two main cards by matching classes
  const cards = await page.evaluate(() => {
    const i = document.getElementById("initiatives");
    const el = i.querySelector("section") || i;
    const all = el.querySelectorAll(":scope > div > div");
    const out = [];
    const direct = i.querySelectorAll('[class*="rounded-[32px]"]');
    direct.forEach((c) => {
      const r = c.getBoundingClientRect();
      out.push({ cls: c.className.slice(0, 80), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) });
    });
    return out;
  });

  console.log(JSON.stringify({ ...data, cards }));
  await page.close();
}

await browser.close();
