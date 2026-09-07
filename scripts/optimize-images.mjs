// scripts/optimize-images.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.resolve(__dirname, "../public/images");

const SVG_TARGETS = [
  { svg: "location-bg.svg", out: "location-bg.webp", width: 900, quality: 50 },
  { svg: "footer-img.svg", out: "footer-img.webp", width: 900, quality: 65 },
];

async function convertHeavySvgsToWebp() {
  console.log("🚀 Converting background SVGs to lightweight WebPs...\n");

  for (const item of SVG_TARGETS) {
    const svgPath = path.join(IMAGES_DIR, item.svg);
    const outPath = path.join(IMAGES_DIR, item.out);

    if (!fs.existsSync(svgPath)) {
      console.warn(`⚠️ Skipped (not found): ${item.svg}`);
      continue;
    }

    const originalSize = fs.statSync(svgPath).size;
    const svgBuffer = fs.readFileSync(svgPath);

    const webpBuffer = await sharp(svgBuffer)
      .resize({ width: item.width, withoutEnlargement: true })
      .webp({ quality: item.quality, effort: 6 })
      .toBuffer();

    fs.writeFileSync(outPath, webpBuffer);
    const newSize = webpBuffer.length;
    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

    console.log(
      `✓ ${item.svg.padEnd(18)} ➔ ${item.out.padEnd(18)} | ${(originalSize / 1024).toFixed(0)} KB ➔ ${(newSize / 1024).toFixed(0)} KB (-${reduction}%)`
    );
  }
}

convertHeavySvgsToWebp()
  .then(() => console.log("\n🎉 Background conversions finished!"))
  .catch((err) => console.error("❌ Failed:", err));