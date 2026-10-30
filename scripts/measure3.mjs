import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.argv[2];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  defaultViewport: null,
});
const page = await browser.newPage();
await page.setViewport({ width: 320, height: 900 });
await page.goto(base, { waitUntil: "networkidle0", timeout: 60000 });
await page.waitForSelector("#initiatives", { timeout: 30000 });
await page.evaluate(() => document.getElementById("initiatives").scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 1200));

const res = await page.evaluate(() => {
  const sec = document.getElementById("initiatives");
  const grid = sec.querySelector("section > div.mt-16");
  const reveal = grid ? grid.children[0] : null;
  const card = reveal ? reveal.firstElementChild : null;
  if (!card) return { err: "not found" };

  const cardW = () => card.getBoundingClientRect().width;

  const results = { full: cardW() };
  const children = Array.from(card.children);
  for (const child of children) {
    const prev = child.style.display;
    child.style.display = "none";
    results[child.className.slice(0, 40) || child.tagName] = cardW();
    child.style.display = prev;
  }

  // drill into pillars grid
  const pillarGrid = card.querySelector('[class*="sm:grid-cols-3"]');
  if (pillarGrid) {
    const pc = Array.from(pillarGrid.children);
    results["pillar-outer"] = pillarGrid.getBoundingClientRect().width;
    for (const ch of pc) {
      const prev = ch.style.display;
      ch.style.display = "none";
      results["hide-pillar:" + (ch.textContent || "").trim().slice(0, 20)] = cardW();
      ch.style.display = prev;
    }
  }

  // drill into stats grid
  const stats = card.querySelector('[class*="rounded-2xl border border-violet-200/60 bg-white/50"]');
  if (stats) {
    const prev = stats.style.display;
    stats.style.display = "none";
    results["hide-stats"] = cardW();
    stats.style.display = prev;
    results["statsW"] = stats.getBoundingClientRect().width;
  }

  const stories = card.querySelector('[class*="pt-7"]');
  if (stories) {
    const prev = stories.style.display;
    stories.style.display = "none";
    results["hide-stories"] = cardW();
    stories.style.display = prev;
  }

  const btn = card.querySelector("a.group\\/btn");
  if (btn) {
    const prev = btn.style.display;
    btn.style.display = "none";
    results["hide-whatsapp"] = cardW();
    btn.style.display = prev;
  }

  const h3 = card.querySelector("h3");
  if (h3) {
    const prev = h3.style.display;
    h3.style.display = "none";
    results["hide-h3"] = cardW();
    h3.style.display = prev;
  }

  return results;
});

console.log(JSON.stringify(res, null, 2));
await browser.close();
