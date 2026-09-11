// scripts/prerender.mjs

import fs from "node:fs/promises";
import { existsSync, createReadStream, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, "../dist");
const POSTS_DIR = path.resolve(__dirname, "../src/data/posts");
const PORT = 45678;

// Automatically discover blog post filenames from src/data/posts/*.json
const blogFiles = existsSync(POSTS_DIR)
  ? readdirSync(POSTS_DIR).filter((file) => file.endsWith(".json"))
  : [];

const blogRoutes = blogFiles.map((file) => `/blog/${file.replace(".json", "")}`);

// Core application routes + municipal chamber desks
const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/compliance",
  "/locations",
  "/schedule",
  "/blog",
  "/terms",
  "/privacy",
  "/disclaimer",
  "/locations/baidyabati-sheoraphuli",
  "/locations/serampore-rishra",
  "/locations/uttarpara-konnagar",
  "/locations/chandannagar-chinsurah",
  "/locations/kolkata-metro",
];

// Combine static pages, municipal desks, and individual blog posts
const ROUTES = [...STATIC_ROUTES, ...blogRoutes];

// Automated sitemap generator with strict date extraction from filename prefixes
async function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_ROUTES.map((route) => ({
    loc: `https://matrixtaxx.com${route === "/" ? "" : route}`,
    lastmod: today,
    priority: route === "/" ? "1.0" : route.includes("locations") ? "0.85" : "0.8",
    changefreq: "weekly",
  }));

  const blogUrls = blogFiles.map((file) => {
    const slug = file.replace(".json", "");
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    return {
      loc: `https://matrixtaxx.com/blog/${slug}`,
      lastmod: dateMatch ? dateMatch[1] : today,
      priority: "0.8",
      changefreq: "monthly",
    };
  });

  const allUrls = [...staticUrls, ...blogUrls];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  allUrls.forEach((item) => {
    xml += `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>\n`;
  });
  xml += "</urlset>";

  await fs.writeFile(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
  console.log(`🗺️ Automatically generated sitemap.xml with ${allUrls.length} indexable URLs (using true post date-prefixes for lastmod)!`);
}

function startStaticServer(port) {
  const MIME_TYPES = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };

  const server = createServer(async (req, res) => {
    const cleanUrl = req.url.split("?")[0];
    let filePath = path.join(DIST_DIR, cleanUrl === "/" ? "index.html" : cleanUrl);

    if (!existsSync(filePath) || (await fs.stat(filePath)).isDirectory()) {
      filePath = path.join(DIST_DIR, "index.html");
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || "text/html";

    res.writeHead(200, { "Content-Type": contentType });
    createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  console.log(`🚀 Starting build-time prerender across ${ROUTES.length} target routes...`);
  const server = await startStaticServer(PORT);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
      await page.waitForSelector("#root");

      const html = await page.content();
      const outputDir = path.join(DIST_DIR, route === "/" ? "" : route);

      await fs.mkdir(outputDir, { recursive: true });
      await fs.writeFile(path.join(outputDir, "index.html"), html, "utf-8");
      await page.close();
    }

    // Automatically generate sitemap.xml into dist/ with clean filename-derived lastmod dates
    await generateSitemap();

    console.log("✅ Static HTML prerender and sitemap generation completed successfully!");
  } catch (err) {
    console.error("❌ Prerender execution failed:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

prerender();