import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.argv[2];
const widths = [320, 375];

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

  const offenders = await page.evaluate(() => {
    const sec = document.getElementById("initiatives");
    const bodyWidth = document.body.getBoundingClientRect().width;
    const out = [];
    const walk = (el) => {
      if (!(el instanceof HTMLElement)) return;
      const r = el.getBoundingClientRect();
      const pr = el.parentElement ? el.parentElement.getBoundingClientRect() : null;
      if (pr && r.width > pr.width + 1) {
        out.push({
          tag: el.tagName,
          cls: el.className && String(el.className).slice(0, 110),
          w: Math.round(r.width),
          pw: Math.round(pr.width),
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
      for (const c of el.children) walk(c);
    };
    walk(sec);
    return { bodyWidth, offenders: out.slice(0, 40) };
  });

  console.log("=== vw", w, "===");
  console.log("bodyWidth", offenders.bodyWidth);
  for (const o of offenders.offenders) {
    console.log(`w=${o.w} pw=${o.pw} <${o.tag}> ${o.cls} "${o.text}"`);
  }
  await page.close();
}

await browser.close();
