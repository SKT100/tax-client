import puppeteer from 'puppeteer';
import fs from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || 'screenshot';

(async () => {
  console.log(`Taking screenshot of ${url}...`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });
  
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  const dir = './temporary screenshots';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
  
  const path = `${dir}/${label}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`Screenshot saved to ${path}`);
  
  await browser.close();
})();
