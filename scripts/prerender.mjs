// scripts/prerender.mjs

import fs from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, "../dist");
const POSTS_DIR = path.resolve(__dirname, "../src/data/posts");

// Automatically discover blog post JSON files
const blogFiles = existsSync(POSTS_DIR)
  ? readdirSync(POSTS_DIR).filter((file) => file.endsWith(".json"))
  : [];

// Core application routes + municipal chamber desks with custom SEO meta tags
const STATIC_ROUTES = [
  { path: "/", title: "Matrix Tax Solutions | Tax Consultancy & Compliance in West Bengal", description: "Expert tax consultancy, GST compliance, income tax filing, and corporate advisory across Hooghly and Kolkata." },
  { path: "/about", title: "About Us | Matrix Tax Solutions", description: "Learn about Matrix Tax Solutions, founded by Saikat Dutta, delivering premier tax and compliance services in West Bengal." },
  { path: "/services", title: "Tax & Compliance Services | Matrix Tax Solutions", description: "Comprehensive direct tax, GST audit defense, company incorporation, and licensing services." },
  { path: "/compliance", title: "Statutory Due Dates & Compliance Calendar | Matrix Tax Solutions", description: "Stay updated with key income tax, GST, TDS, and ROC statutory filing deadlines." },
  { path: "/locations", title: "Chambers & Regional Desks | Matrix Tax Solutions", description: "Explore our municipal chambers across Baidyabati, Serampore, Chandannagar, and Kolkata." },
  { path: "/schedule", title: "Book a Chamber Consultation | Matrix Tax Solutions", description: "Schedule a 1-on-1 consultation with our tax experts at our Baidyabati chambers or online." },
  { path: "/blog", title: "Tax & Legal Insights | Matrix Tax Solutions", description: "Read expert articles on GST reconciliation, Section 148 notice defense, trade licensing, and ITR filing." },
  { path: "/terms", title: "Terms of Service | Matrix Tax Solutions", description: "Review the terms and conditions for utilizing Matrix Tax Solutions consulting services." },
  { path: "/privacy", title: "Privacy Policy | Matrix Tax Solutions", description: "Learn how Matrix Tax Solutions protects your financial and personal data." },
  { path: "/disclaimer", title: "Legal Disclaimer | Matrix Tax Solutions", description: "Statutory disclaimers regarding professional tax advisory and web platform usage." },
  { path: "/locations/baidyabati-sheoraphuli", title: "Baidyabati & Sheoraphuli Chamber Desk | Matrix Tax Solutions", description: "Local tax and compliance consultancy for Baidyabati and Sheoraphuli commercial establishments." },
  { path: "/locations/serampore-rishra", title: "Serampore & Rishra Chamber Desk | Matrix Tax Solutions", description: "Dedicated corporate tax and GST advisory for Serampore and Rishra industrial units." },
  { path: "/locations/uttarpara-konnagar", title: "Uttarpara & Konnagar Chamber Desk | Matrix Tax Solutions", description: "Professional tax filing and compliance support for Uttarpara and Konnagar." },
  { path: "/locations/chandannagar-chinsurah", title: "Chandannagar & Chinsurah Chamber Desk | Matrix Tax Solutions", description: "Expert tax consultancy and audit defense across Chandannagar and Chinsurah." },
  { path: "/locations/kolkata-metro", title: "Kolkata Metro Regional Desk | Matrix Tax Solutions", description: "Enterprise tax consultancy, company incorporation, and GST filing for Kolkata Metro." },
];

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHtml(templateHtml, { title, description, url, image = "/images/tax.webp", type = "website" }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeUrl = escapeHtml(url);

  const resolvedImage = image.startsWith("http") ? image : `https://matrixtaxx.com${image}`;
  const safeImage = escapeHtml(resolvedImage);

  let html = templateHtml.replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`);

  html = html.replace(/<meta\s+name=["']description["'][^>]*>/gi, "");
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "");
  html = html.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "");

  const metaBlock = `
    <meta name="description" content="${safeDesc}">
    <link rel="canonical" href="${safeUrl}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:url" content="${safeUrl}">
    <meta property="og:type" content="${type}">
    <meta property="og:image" content="${safeImage}">
  </head>`;

  return html.replace("</head>", metaBlock);
}

async function prerender() {
  console.log("🚀 Starting hardened static prerender & sitemap generation...");

  const templatePath = path.join(DIST_DIR, "index.html");
  if (!existsSync(templatePath)) {
    console.error("❌ dist/index.html not found! Ensure 'vite build' ran successfully.");
    process.exit(1);
  }

  const templateHtml = await fs.readFile(templatePath, "utf-8");

  const blogPosts = [];
  for (const file of blogFiles) {
    const slug = file.replace(".json", "");
    try {
      const content = (await fs.readFile(path.join(POSTS_DIR, file), "utf-8")).replace(/^\uFEFF/, "");
      const postData = JSON.parse(content);
      blogPosts.push({ slug, ...postData });
    } catch (e) {
      console.warn(`⚠️ Failed to parse ${file}:`, e);
    }
  }

  for (const route of STATIC_ROUTES) {
    const routeDir = path.join(DIST_DIR, route.path === "/" ? "" : route.path);
    await fs.mkdir(routeDir, { recursive: true });

    const html = buildHtml(templateHtml, {
      title: route.title,
      description: route.description,
      url: `https://matrixtaxx.com${route.path === "/" ? "" : route.path}`,
    });

    await fs.writeFile(path.join(routeDir, "index.html"), html, "utf-8");
  }

  for (const post of blogPosts) {
    const routePath = `/blog/${post.slug}`;
    const routeDir = path.join(DIST_DIR, routePath);
    await fs.mkdir(routeDir, { recursive: true });

    const postTitle = `${post.title} | Matrix Tax Solutions`;
    const postDesc = post.summary || post.excerpt || "Expert tax insight by Matrix Tax Solutions.";

    const html = buildHtml(templateHtml, {
      title: postTitle,
      description: postDesc,
      url: `https://matrixtaxx.com/blog/${post.slug}`,
      image: post.thumbnail || "/images/tax.webp",
      type: "article",
    });

    await fs.writeFile(path.join(routeDir, "index.html"), html, "utf-8");
  }

  const today = new Date().toISOString().split("T")[0];
  const staticUrls = STATIC_ROUTES.map((route) => ({
    loc: `https://matrixtaxx.com${route.path === "/" ? "" : route.path}`,
    lastmod: today,
    priority: route.path === "/" ? "1.0" : route.path.includes("locations") ? "0.85" : "0.8",
    changefreq: "weekly",
  }));

  const blogUrls = blogPosts.map((post) => {
    const dateMatch = post.slug.match(/^(\d{4}-\d{2}-\d{2})/);
    return {
      loc: `https://matrixtaxx.com/blog/${post.slug}`,
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
  console.log(`✅ Successfully generated ${STATIC_ROUTES.length + blogPosts.length} pre-rendered pages and sitemap.xml!`);
}

prerender();