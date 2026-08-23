# AGENT.md — Antigravity Directives & High-Craft Standards

## 1. TOKEN MINIMIZATION & GRAPHIFY-FIRST DIRECTIVE
To minimize token consumption and context window overhead, enforce the following graph-first workflow:

- **Graph-First Code Exploration:** NEVER grep across multiple directories or read multiple full source files to understand architecture.
- **Query the Knowledge Graph:**
  - Before reading source files, execute: `graphify query "<question>"`
  - To understand connections between components/styles: `graphify path "<NodeA>" "<NodeB>"`
  - To inspect a specific component or utility: `graphify explain "<ComponentName>"`
- **Targeted File Access:** Only read raw `.html`, `.js`, or `.css` files when you are actively modifying them or performing visual diff fixes.

---

## 2. Session Initialization & Active Skill Enforcement
Before writing or modifying frontend code, execute these pre-flight checks:

- **Context & Graph Check:** Check `graphify-out/GRAPH_REPORT.md`, `@design.md`, `@skill.md`, and `brand_assets/`.
- **Skill Invocations (`.agents/skills/`):**
  - **Layout & Craft:** Consult `emil-design-eng` and `apple-design` for UI guidelines.
  - **Component Primitives:** Consult `pick-ui-library` before building new interactive elements.
  - **Motion Strategy:** Run `find-animation-opportunities` to decide *where* motion is needed.
  - **Motion Timing:** Use `animation-vocabulary` to structure spring curves and durations.
  - **QA & Audits:** Run `review-animations` during visual verification passes.

---

## 3. Design System Blueprint (Patreon-Inspired Legal Portfolio)
- **Palette Rules:**
  - *Primary Canvas:* Warm Ivory / Cream (`#FBF9F5` or `#F7F5F0`) — **NEVER pure `#FFFFFF`**.
  - *Primary Text & Dark Surfaces:* Rich Charcoal (`#1A1A1A` or `#121212`) — **NEVER pure `#000000`**.
  - *Luxury Accents:* Muted Warm Bronze / Copper (`#9A7B56` or `#8C6D46`).
  - *Card Surfaces:* Soft frosted glass (`bg-white/40 backdrop-blur-md border border-black/5`).
- **Typography Pairing:**
  - *Headings:* Display Serif (`Playfair Display`, `Cormorant Garamond`, or `Instrument Serif`). Tight tracking (`tracking-tight` / `-0.03em`).
  - *Body / UI:* Clean sans-serif (`Inter`, `Plus Jakarta Sans`). Generous line height (`leading-relaxed` / `1.7`).
- **Depth & Texture:**
  - Use subtle background radial gradients or noise textures for organic depth.
  - Use semi-transparent, color-tinted layered shadows instead of harsh solid outlines.

---

## 4. Motion & Animation Standards (Design Engineer Rules)
- **Strict Prohibition:** **NEVER use `transition-all`**. Animate only `transform` and `opacity`.
- **Easing Dynamics:**
  - *Enter Animations:* `ease-out` or custom spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - *Exit Animations:* `ease-in`.
  - *Hover / Click:* Instant response (`100ms–150ms`).
- **Tactile Feedback:** Every interactive element must feature explicit `:hover`, `:focus-visible`, and `:active` states.

---

## 5. Local Development & Visual QA Workflow

### Step A: Dev Server
- **Localhost Execution:** Run the site on `http://localhost:3000`. Do not use `file:///` URLs.
- Server Start Command: `node serve.mjs` (only if port 3000 is inactive).

### Step B: Screenshot QA Loop
- Capture output: `node screenshot.mjs http://localhost:3000 [label]`.
- Outputs save to `./temporary screenshots/screenshot-N.png`.
- Inspect screenshots with visual tools and run a minimum of **2 verification passes** against design specs.
- Note specific pixel/spacing fixes (e.g., *"Card padding is 16px, specification calls for 28px"*).

---

## 6. Hard Enforcement Rules
- **DO NOT** read large sets of raw files when `graphify query` can provide the contextual subgraph.
- **DO NOT** alter approved sections from `@design.md`.
- **DO NOT** use `transition-all` or default Tailwind blue/indigo palettes.
- **DO NOT** conclude a task without running a visual screenshot QA pass.