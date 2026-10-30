import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.argv[2];
const outDir = process.argv[3];

const widths = [375, 768, 1024, 1280];

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  defaultViewport: null,
});

for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector("#initiatives", { timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));

  // scroll into view so reveal animations run
  await page.evaluate(() => {
    document.getElementById("initiatives").scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1500));

  const el = await page.$("#initiatives");
  await el.screenshot({ path: `${outDir}/init-${w}.png` });
  console.log(`shot ${w}`);
  await page.close();
}

await browser.close();
