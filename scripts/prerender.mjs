// scripts/prerender.mjs

import fs from "node:fs/promises";
import { existsSync, readdirSync, createReadStream, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, "../dist");
const POSTS_DIR = path.resolve(__dirname, "../src/data/posts");

// Core application routes, statutory services, and municipal chamber desks
const STATIC_ROUTES = [
  { path: "/", title: "Matrix Tax Solutions | Tax Consultancy & Compliance in West Bengal", description: "Expert tax consultancy, GST compliance, income tax filing, and corporate advisory across Hooghly and Kolkata." },
  { path: "/about", title: "About Us | Matrix Tax Solutions", description: "Learn about Matrix Tax Solutions, founded by Partha Pratim Halder, delivering premier tax and compliance services in West Bengal." },
  { path: "/services", title: "Tax & Compliance Services | Matrix Tax Solutions", description: "Comprehensive direct tax, GST audit defense, company incorporation, and licensing services." },
  
  // Tier-1 Practice Area Routes
  { path: "/services/income-tax", title: "Income Tax Advisory & Filing Services | Matrix Tax Solutions", description: "ITR filing, Section 148 notice representation, tax audit defense, and capital gains planning." },
  { path: "/services/gst-compliance", title: "GST Registration, Returns & DRC-01 Defense | Matrix Tax Solutions", description: "Monthly GSTR-1 & 3B filing, GSTR-2B ITC reconciliation, DRC-01 show cause notice defense, and LUT exports." },
  { path: "/services/tds-payroll", title: "TDS Returns, Payroll & PF-ESIC Compliance | Matrix Tax Solutions", description: "Quarterly 24Q/26Q TDS returns, TRACES default resolution, EPF/ESIC monthly ECR, and WB P-Tax." },
  { path: "/services/company-registration", title: "Company Incorporation & ROC Compliance | Matrix Tax Solutions", description: "MCA SPICe+ Private Limited registration, LLP formation, Partnership deeds, and annual ROC filing." },
  { path: "/services/licences-advisory", title: "Trade Licenses, DGFT IEC & NGO 12AB Registration | Matrix Tax Solutions", description: "Municipal trade licenses, Import Export Code (IEC), Trust registration, 12AB/80G tax exemptions, and Class 3 DSC." },
  { path: "/services/accounts-audit", title: "Accounting, Bookkeeping & Statutory Tax Audit | Matrix Tax Solutions", description: "Day-to-day Tally Prime bookkeeping, financial statement finalization, Section 44AB tax audit, and internal checks." },

  { path: "/compliance", title: "Statutory Due Dates & Compliance Calendar | Matrix Tax Solutions", description: "Stay updated with key income tax, GST, TDS, and ROC statutory filing deadlines." },
  { path: "/locations", title: "Chambers & Regional Desks | Matrix Tax Solutions", description: "Explore our municipal chambers across Baidyabati, Serampore, Chandannagar, and Kolkata." },
  { path: "/schedule", title: "Book a Chamber Consultation | Matrix Tax Solutions", description: "Schedule a 1-on-1 consultation with our tax experts at our Baidyabati chambers or online." },
  { path: "/blog", title: "Tax & Legal Insights | Matrix Tax Solutions", description: "Read expert articles on GST reconciliation, Section 148 notice defense, trade licensing, and ITR filing." },
  { path: "/terms", title: "Terms of Service | Matrix Tax Solutions", description: "Review the terms and conditions for utilizing Matrix Tax Solutions consulting services." },
  { path: "/privacy", title: "Privacy Policy | Matrix Tax Solutions", description: "Learn how Matrix Tax Solutions protects your financial and personal data." },
  { path: "/disclaimer", title: "Legal Disclaimer | Matrix Tax Solutions", description: "Statutory disclaimers regarding professional tax advisory and web platform usage." },
  
  // Regional Chamber Desks
  { path: "/locations/baidyabati-sheoraphuli", title: "Baidyabati & Sheoraphuli Chamber Desk | Matrix Tax Solutions", description: "Local tax and compliance consultancy for Baidyabati and Sheoraphuli commercial establishments." },
  { path: "/locations/serampore-rishra", title: "Serampore & Rishra Chamber Desk | Matrix Tax Solutions", description: "Dedicated corporate tax and GST advisory for Serampore and Rishra industrial units." },
  { path: "/locations/uttarpara-konnagar", title: "Uttarpara & Konnagar Chamber Desk | Matrix Tax Solutions", description: "Professional tax filing and compliance support for Uttarpara and Konnagar." },
  { path: "/locations/chandannagar-chinsurah", title: "Chandannagar & Chinsurah Chamber Desk | Matrix Tax Solutions", description: "Expert tax consultancy and audit defense across Chandannagar and Chinsurah." },
  { path: "/locations/kolkata-metro", title: "Kolkata Metro Regional Desk | Matrix Tax Solutions", description: "Enterprise tax consultancy, company incorporation, and GST filing for Kolkata Metro." },
];

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function startLocalServer(port = 45678) {
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve({ server, port }));
  });
}

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
  console.log("🚀 Starting Puppeteer DOM-capture prerender & sitemap pipeline...");

  const templatePath = path.join(DIST_DIR, "index.html");
  if (!existsSync(templatePath)) {
    console.error("❌ dist/index.html not found! Ensure 'vite build' ran successfully.");
    process.exit(1);
  }

  // Discover blog post JSON files
  const blogFiles = existsSync(POSTS_DIR)
    ? readdirSync(POSTS_DIR).filter((file) => file.endsWith(".json"))
    : [];

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

  // Start temporary local server to serve SPA build
  const PORT = 45678;
  const { server } = await startLocalServer(PORT);
  console.log(`🌐 Local HTTP server listening on port ${PORT}`);

  // Launch Puppeteer instance
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Combine static and dynamic blog routes
  const allPrerenderItems = [
    ...STATIC_ROUTES.map((route) => ({
      path: route.path,
      title: route.title,
      description: route.description,
      image: "/images/tax.webp",
      type: "website",
    })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: `${post.title} | Matrix Tax Solutions`,
      description: post.summary || post.excerpt || "Expert tax insight by Matrix Tax Solutions.",
      image: post.thumbnail || "/images/tax.webp",
      type: "article",
    })),
  ];

  for (const item of allPrerenderItems) {
    const targetUrl = `http://localhost:${PORT}${item.path}`;
    try {
      await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 15000 });
      
      // Wait for React hydration signal
      await page.waitForSelector('[data-prerender-ready="true"]', { timeout: 10000 });
    } catch (e) {
      console.warn(`⚠️ Timeout waiting for data-prerender-ready on ${item.path}, capturing current DOM state.`);
    }

    // Capture hydrated body HTML from Puppeteer
    let capturedHtml = await page.content();

    // Standardize head metadata (canonical, title, OpenGraph)
    capturedHtml = buildHtml(capturedHtml, {
      title: item.title,
      description: item.description,
      url: `https://matrixtaxx.com${item.path === "/" ? "" : item.path}`,
      image: item.image,
      type: item.type,
    });

    const routeDir = path.join(DIST_DIR, item.path === "/" ? "" : item.path);
    await fs.mkdir(routeDir, { recursive: true });
    await fs.writeFile(path.join(routeDir, "index.html"), capturedHtml, "utf-8");
    console.log(`   ✓ Rendered & Saved: ${item.path}`);
  }

  await browser.close();
  server.close();
  console.log("🔒 Closed Puppeteer browser and local HTTP server.");

  // Dynamic Sitemap Generation
  const today = new Date().toISOString().split("T")[0];
  const staticUrls = STATIC_ROUTES.map((route) => {
    let priority = "0.8";
    if (route.path === "/") priority = "1.0";
    else if (route.path.startsWith("/services/")) priority = "0.9";
    else if (route.path.startsWith("/locations")) priority = "0.85";

    return {
      loc: `https://matrixtaxx.com${route.path === "/" ? "" : route.path}`,
      lastmod: today,
      priority,
      changefreq: route.path === "/" ? "weekly" : "monthly",
    };
  });

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
  console.log(`✅ Successfully generated ${allPrerenderItems.length} static HTML pages and updated sitemap.xml!`);
}

prerender();