// src/components/sections/services/PracticeScrollThread.jsx

import { useEffect, useRef, memo } from "react";
import { useScroll } from "framer-motion";

// Bengali Statutory Maxims with Four-Point Star (✦) Dividers
const BENGALI_STATUTORY_MOTTO =
  "ন্যায্য করদান ও বিধিবদ্ধ দায়বদ্ধতা ✦ রাজস্ব দেশের মেরুদণ্ড ও প্রগতির ভিত্তি ✦ সত্য ও নিষ্ঠার সহিত আর্থিক সমৃদ্ধি ✦ যথাকালে সঠিক কর পরিশোধই উন্নতির চাবিকাঠি ✦ স্বচ্ছ হিসাব ও সুদৃঢ় আইনি প্রতিরক্ষা ✦ সততাই সর্বোত্তম নীতি ও আস্থার প্রতীক ✦ ধর্মেণ সংহৃতং দ্রব্যং প্রজাকল্যাণে যুজ্যতে ✦ ";

const FONT_FAMILY =
  "'Hind Siliguri', 'Noto Sans Bengali', 'Noto Serif Bengali', 'Kalpurush', 'SolaimanLipi', system-ui, -apple-system, sans-serif";

const DESIGN_W = 1440;
const DESIGN_H = 5000;

// Original Start & Placement Coordinates (Starting at Y: 560)
const CURVE_POINTS = [
  { x: -140, y: 560 },
  { cp1x: -40, cp1y: 530, cp2x: 80, cp2y: 590, x: 200, y: 550 },
  { cp1x: 340, cp1y: 510, cp2x: 520, cp2y: 570, x: 700, y: 530 },
  { cp1x: 880, cp1y: 490, cp2x: 1100, cp2y: 540, x: 1240, y: 640 },
  { cp1x: 1360, cp1y: 720, cp2x: 1420, cp2y: 920, x: 1360, y: 1100 },
  { cp1x: 1300, cp1y: 1280, cp2x: 1120, cp2y: 1420, x: 880, y: 1480 },
  { cp1x: 640, cp1y: 1540, cp2x: 320, cp2y: 1620, x: 160, y: 1760 },
  { cp1x: 20, cp1y: 1900, cp2x: 60, cp2y: 2120, x: 300, y: 2260 },
  { cp1x: 560, cp1y: 2400, cp2x: 1020, cp2y: 2340, x: 1260, y: 2540 },
  { cp1x: 1420, cp1y: 2680, cp2x: 1320, cp2y: 2960, x: 980, y: 3100 },
  { cp1x: 680, cp1y: 3240, cp2x: 280, cp2y: 3360, x: 140, y: 3540 },
  { cp1x: 20, cp1y: 3700, cp2x: 160, cp2y: 3940, x: 440, y: 4080 },
  { cp1x: 760, cp1y: 4220, cp2x: 1180, cp2y: 4180, x: 1300, y: 4420 },
  { cp1x: 1400, cp1y: 4620, cp2x: 1120, cp2y: 4860, x: 740, y: 4960 },
  { cp1x: 360, cp1y: 5060, cp2x: 160, cp2y: 5280, x: 260, y: 5420 },
  { cp1x: 400, cp1y: 5540, cp2x: 820, cp2y: 5580, x: 1280, y: 5600 },
];

function splitIntoBengaliGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return (
    text.match(/[\u0980-\u09FF][\u0980-\u09FF\u200D\u200C]*|[^\u0980-\u09FF]/gu) ||
    Array.from(text)
  );
}

function scaleCurvePoints(scaleX, scaleY) {
  return CURVE_POINTS.map((p) => ({
    x: p.x !== undefined ? p.x * scaleX : undefined,
    y: p.y !== undefined ? p.y * scaleY : undefined,
    cp1x: p.cp1x !== undefined ? p.cp1x * scaleX : undefined,
    cp1y: p.cp1y !== undefined ? p.cp1y * scaleY : undefined,
    cp2x: p.cp2x !== undefined ? p.cp2x * scaleX : undefined,
    cp2y: p.cp2y !== undefined ? p.cp2y * scaleY : undefined,
  }));
}

function flattenCurve(points, stepsPerSegment = 40) {
  const pts = [];
  let prev = points[0];
  pts.push({ x: prev.x, y: prev.y });

  for (let i = 1; i < points.length; i++) {
    const seg = points[i];
    for (let s = 1; s <= stepsPerSegment; s++) {
      const t = s / stepsPerSegment;
      const mt = 1 - t;
      const x =
        mt * mt * mt * prev.x +
        3 * mt * mt * t * seg.cp1x +
        3 * mt * t * t * seg.cp2x +
        t * t * t * seg.x;
      const y =
        mt * mt * mt * prev.y +
        3 * mt * mt * t * seg.cp1y +
        3 * mt * t * t * seg.cp2y +
        t * t * t * seg.y;
      pts.push({ x, y });
    }
    prev = seg;
  }
  return pts;
}

function precomputeGlyphs(polyline, text, fontSize, letterSpacing) {
  const cumLen = [0];
  for (let i = 1; i < polyline.length; i++) {
    const dx = polyline[i].x - polyline[i - 1].x;
    const dy = polyline[i].y - polyline[i - 1].y;
    cumLen.push(cumLen[i - 1] + Math.sqrt(dx * dx + dy * dy));
  }
  const totalLen = cumLen[cumLen.length - 1];

  const pointAt = (dist) => {
    if (dist <= 0) return { x: polyline[0].x, y: polyline[0].y, angle: 0 };
    if (dist >= totalLen) {
      const a = polyline[polyline.length - 2];
      const b = polyline[polyline.length - 1];
      return { x: b.x, y: b.y, angle: Math.atan2(b.y - a.y, b.x - a.x) };
    }
    let lo = 0;
    let hi = cumLen.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cumLen[mid] < dist) lo = mid + 1;
      else hi = mid;
    }
    const i = Math.max(1, lo);
    const a = polyline[i - 1];
    const b = polyline[i];
    const segLen = cumLen[i] - cumLen[i - 1] || 1;
    const t = (dist - cumLen[i - 1]) / segLen;
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      angle: Math.atan2(b.y - a.y, b.x - a.x),
    };
  };

  const measureCanvas = document.createElement("canvas");
  const mCtx = measureCanvas.getContext("2d");
  mCtx.font = `600 ${fontSize}px ${FONT_FAMILY}`;

  const clusters = splitIntoBengaliGraphemes(text);
  const glyphs = [];
  let dist = 0;
  let idx = 0;

  while (dist < totalLen) {
    const cluster = clusters[idx % clusters.length];
    const w = mCtx.measureText(cluster).width + letterSpacing;
    const { x, y, angle } = pointAt(dist + w / 2);
    glyphs.push({ ch: cluster, x, y, angle, dist });
    dist += w;
    idx++;
  }
  return { glyphs, totalLen };
}

function PracticeScrollThread({ containerRef }) {
  const canvasRef = useRef(null);
  const dataRef = useRef(null);
  const rafRef = useRef(null);
  const inViewRef = useRef(true);
  const currentProgressRef = useRef(0);
  const lastDrawnProgressRef = useRef(-1);
  const containerDocTopRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, viewportH: 0, fontSize: 14, dpr: 1 });
  const anchorHeightRef = useRef(0);

  const { scrollYProgress } = useScroll(
    containerRef?.current
      ? { target: containerRef, offset: ["start start", "end end"] }
      : { offset: ["start start", "end end"] }
  );

  const measureDocTop = () => {
    if (!containerRef?.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerDocTopRef.current = rect.top + window.scrollY;
  };

  const rebuildCanvasData = () => {
    const canvas = canvasRef.current;
    const container = containerRef?.current || document.body;
    if (!canvas) return;

    measureDocTop();

    const w = window.innerWidth || DESIGN_W;
    const totalH = container.scrollHeight || DESIGN_H;
    const viewportH = window.innerHeight || 900;

    const widthChanged = w !== dimensionsRef.current.width;
    const grew = totalH > anchorHeightRef.current;

    const isMobile = w < 768;
    const fontSize = isMobile ? 12 : 14.5;
    const letterSpacing = isMobile ? 4.0 : 6.0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    dimensionsRef.current = { width: w, viewportH, fontSize, dpr };

    if (!dataRef.current || widthChanged || grew) {
      anchorHeightRef.current = Math.max(totalH, anchorHeightRef.current);
      const scaleX = w / DESIGN_W;
      const scaleY = anchorHeightRef.current / DESIGN_H;

      const scaledPoints = scaleCurvePoints(scaleX, scaleY);
      const polyline = flattenCurve(scaledPoints, 40);
      dataRef.current = precomputeGlyphs(
        polyline,
        BENGALI_STATUTORY_MOTTO,
        fontSize,
        letterSpacing
      );
    }

    const targetW = w * dpr;
    const targetH = viewportH * dpr;
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    lastDrawnProgressRef.current = -1;
  };

  useEffect(() => {
    rebuildCanvasData();
    const ro = new ResizeObserver(() => rebuildCanvasData());
    if (containerRef?.current) ro.observe(containerRef.current);
    window.addEventListener("resize", rebuildCanvasData, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", rebuildCanvasData);
    };
  }, [containerRef]);

  useEffect(() => {
    const target = containerRef?.current;
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!inViewRef.current || !dataRef.current) return;

      const targetProgress = scrollYProgress.get();
      const delta = targetProgress - currentProgressRef.current;

      if (
        Math.abs(delta) < 0.00005 &&
        Math.abs(currentProgressRef.current - lastDrawnProgressRef.current) < 0.00005
      ) {
        return;
      }

      currentProgressRef.current += delta * 0.08;
      const progress = currentProgressRef.current;
      lastDrawnProgressRef.current = progress;

      const { width: w, viewportH, fontSize, dpr } = dimensionsRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx || !w || !viewportH) return;

      const { glyphs, totalLen } = dataRef.current;
      const currentScrollY = window.scrollY;
      const docTop = containerDocTopRef.current;

      // Ensure illumination smoothly tracks through the entire curve length
      const litDistance = Math.max(0, Math.min(1, progress * 1.05)) * totalLen;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, viewportH);

      ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const dimColor = isDark
        ? "rgba(212, 175, 55, 0.22)"
        : "rgba(180, 130, 20, 0.26)";
      const litColor = isDark ? "#FBBF24" : "#D97706";
      const litShadow = isDark
        ? "rgba(251, 191, 36, 0.65)"
        : "rgba(217, 119, 6, 0.45)";

      const dimGlyphs = [];
      const litGlyphs = [];

      // Single-pass collector for all glyphs from start (y: 560) down to the bottom
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        const screenY = docTop + g.y - currentScrollY;

        // Viewport bounds culling
        if (screenY < -80 || screenY > viewportH + 80) continue;

        if (g.dist <= litDistance) {
          litGlyphs.push({ g, screenY });
        } else {
          dimGlyphs.push({ g, screenY });
        }
      }

      // Draw Dim Base Track
      ctx.fillStyle = dimColor;
      ctx.shadowBlur = 0;
      for (let i = 0; i < dimGlyphs.length; i++) {
        const { g, screenY } = dimGlyphs[i];
        ctx.save();
        ctx.translate(g.x, screenY);
        ctx.rotate(g.angle);
        ctx.fillText(g.ch, 0, 0);
        ctx.restore();
      }

      // Draw Illuminated Overlay
      ctx.fillStyle = litColor;
      ctx.shadowColor = litShadow;
      ctx.shadowBlur = isDark ? 6 : 3;
      for (let i = 0; i < litGlyphs.length; i++) {
        const { g, screenY } = litGlyphs[i];
        ctx.save();
        ctx.translate(g.x, screenY);
        ctx.rotate(g.angle);
        ctx.fillText(g.ch, 0, 0);
        ctx.restore();
      }
      ctx.shadowBlur = 0;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scrollYProgress]);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[2] select-none overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default memo(PracticeScrollThread);