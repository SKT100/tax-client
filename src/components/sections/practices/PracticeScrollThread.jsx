import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

// Sacred Legal & Vedic Maxims
const SANSKRIT_MOTTO =
  "यतो धर्मस्ततो जयः /// सत्यमेव जयते नानृतम् /// धर्मो रक्षति रक्षितः /// न हि सत्यात्परो धर्मः /// यदा यदा हि धर्मस्य ग्लानिर्भवति भारत अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् /// परित्राणाय साधूनां विनाशाय च दुष्कृताम् धर्मसंस्थापनार्थाय सम्भवामि युगे युगे /// ";

const FONT_FAMILY =
  "system-ui, -apple-system, 'Noto Sans Devanagari', 'Noto Serif Devanagari', 'Mangal', 'Devanagari MT', sans-serif";

const DESIGN_W = 1440;
const DESIGN_H = 4500;

// Preserved curve points with extended lower terminal down to y: 4450
const CURVE_POINTS = [
  // Hidden behind the left border, just below the marquee band
  { x: -120, y: 900 },
  // Gentle squiggle traveling right
  { cp1x: -20, cp1y: 870, cp2x: 40, cp2y: 930, x: 100, y: 890 },
  { cp1x: 160, cp1y: 850, cp2x: 220, cp2y: 920, x: 280, y: 880 },
  { cp1x: 340, cp1y: 840, cp2x: 400, cp2y: 900, x: 460, y: 875 },
  // Settle, then dip down into the "Practice Areas" heading
  { cp1x: 500, cp1y: 855, cp2x: 520, cp2y: 870, x: 540, y: 900 },
  { cp1x: 720, cp1y: 1180, cp2x: 520, cp2y: 1380, x: 320, y: 1290 },
  { cp1x: 160, cp1y: 1220, cp2x: 180, cp2y: 1480, x: 380, y: 1560 },
  { cp1x: 620, cp1y: 1660, cp2x: 1180, cp2y: 1380, x: 1320, y: 1620 },
  { cp1x: 1440, cp1y: 1840, cp2x: 1240, cp2y: 2120, x: 980, y: 2020 },
  { cp1x: 720, cp1y: 1920, cp2x: 380, cp2y: 2160, x: 260, y: 2320 },
  { cp1x: 140, cp1y: 2460, cp2x: 320, cp2y: 2580, x: 560, y: 2520 },
  { cp1x: 860, cp1y: 2440, cp2x: 1180, cp2y: 2480, x: 1280, y: 2720 },
  { cp1x: 1380, cp1y: 2940, cp2x: 1120, cp2y: 3140, x: 840, y: 3080 },
  { cp1x: 580, cp1y: 3020, cp2x: 240, cp2y: 3300, x: 200, y: 3600 },
  { cp1x: 160, cp1y: 3850, cp2x: 480, cp2y: 3980, x: 660, y: 4050 },
  // 🌟 Extended Lower Sweep (flows right into the footer transition)
  { cp1x: 820, cp1y: 4120, cp2x: 1100, cp2y: 4260, x: 1240, y: 4450 },
];

/**
 * Splits Devanagari text into whole grapheme/syllable clusters
 * Prevents standalone combining marks from rendering with dotted circles (◌)
 */
function splitIntoDevanagariGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("hi", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return (
    text.match(/[\u0900-\u097F][\u0900-\u097F\u200D\u200C]*|[^\u0900-\u097F]/gu) ||
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

function flattenCurve(points, stepsPerSegment = 60) {
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
  mCtx.font = `bold ${fontSize}px ${FONT_FAMILY}`;

  const clusters = splitIntoDevanagariGraphemes(text);
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

function buildDimTrack(glyphs, w, h, fontSize, isDark, dpr) {
  const canvas = document.createElement("canvas");
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = isDark
    ? "rgba(212, 175, 55, 0.25)"
    : "rgba(180, 130, 20, 0.30)";

  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate(g.angle);
    ctx.fillText(g.ch, 0, 0);
    ctx.restore();
  }
  return canvas;
}

export default function PracticeScrollThread({ containerRef }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const dataRef = useRef(null);
  const dimTrackRef = useRef(null);
  const rafRef = useRef(null);
  const inViewRef = useRef(true);
  const currentProgressRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0, fontSize: 16 });

  const { scrollYProgress } = useScroll(
    containerRef?.current
      ? { target: containerRef, offset: ["start 10%", "end 95%"] }
      : { offset: ["start 10%", "end 95%"] }
  );

  const rebuildCanvasData = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const w = rect.width || window.innerWidth || DESIGN_W;
    const h = wrapper.parentElement?.scrollHeight || rect.height || DESIGN_H;

    const scaleX = w / DESIGN_W;
    const scaleY = h / DESIGN_H;

    const isMobile = w < 768;
    const fontSize = isMobile ? 13 : 16;
    const letterSpacing = isMobile ? 4.0 : 6.0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    dimensionsRef.current = { width: w, height: h, fontSize, dpr };

    const scaledPoints = scaleCurvePoints(scaleX, scaleY);
    const polyline = flattenCurve(scaledPoints, 60);

    const computedData = precomputeGlyphs(
      polyline,
      SANSKRIT_MOTTO,
      fontSize,
      letterSpacing
    );
    dataRef.current = computedData;

    const isDark = document.documentElement.classList.contains("dark");
    dimTrackRef.current = buildDimTrack(
      computedData.glyphs,
      w,
      h,
      fontSize,
      isDark,
      dpr
    );

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
  };

  useEffect(() => {
    rebuildCanvasData();

    const resizeObserver = new ResizeObserver(() => rebuildCanvasData());
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    const themeObserver = new MutationObserver(() => {
      const { width: w, height: h, fontSize, dpr } = dimensionsRef.current;
      if (dataRef.current && w && h) {
        const isDark = document.documentElement.classList.contains("dark");
        dimTrackRef.current = buildDimTrack(
          dataRef.current.glyphs,
          w,
          h,
          fontSize,
          isDark,
          dpr
        );
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const target = wrapperRef.current;
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "400px 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!inViewRef.current || !dataRef.current || !dimTrackRef.current)
        return;

      const { width: w, height: h, fontSize, dpr } = dimensionsRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx || !w || !h) return;

      const targetProgress = scrollYProgress.get();
      currentProgressRef.current +=
        (targetProgress - currentProgressRef.current) * 0.06;
      const progress = currentProgressRef.current;

      const { glyphs, totalLen } = dataRef.current;
      const litDistance = Math.max(0, Math.min(1, progress * 1.05)) * totalLen;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // 1. Base Track
      ctx.drawImage(dimTrackRef.current, 0, 0, w, h);

      // 2. Active Illuminated Glyphs
      ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = isDark ? "#FBBF24" : "#D97706";
      ctx.shadowColor = isDark
        ? "rgba(251, 191, 36, 0.75)"
        : "rgba(217, 119, 6, 0.65)";
      ctx.shadowBlur = isDark ? 10 : 5;

      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        if (g.dist > litDistance) break;
        ctx.save();
        ctx.translate(g.x, g.y);
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
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] select-none transform-gpu overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        className="block w-full h-full"
      />
    </div>
  );
}