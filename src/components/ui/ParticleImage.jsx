import { useEffect, useRef, useState } from "react";

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from, to, amount) => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

export default function ParticleImage({
  imageSrc,
  particleSize = 1.6,
  density = 3.0,
  color,
  highlightColor,
  scatter = 140,
  gatherDuration = 1400,
  stagger = 300,
  pointerRepel = 42,
  repelRadius = 110,
  idleDrift = 0.35,
  scalePercent = 0.38,
  maxParticles = 1400,
  className = "",
  style,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const activeColor = color || (isDark ? "#E2E8F0" : "#475569");
  const activeHighlight = highlightColor || "#D4AF37";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles = [];
    let animationFrame = null;
    let inView = true;
    let isSleeping = false;
    let isGathering = true;
    let gatherStart = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let cachedRect = { left: 0, top: 0, width: 0, height: 0 };

    const pointer = { active: false, x: -9999, y: -9999, smoothX: -9999, smoothY: -9999 };
    const repelRadiusSq = repelRadius * repelRadius;

    const updateCachedRect = () => {
      if (container) {
        cachedRect = container.getBoundingClientRect();
      }
    };

    const wakeUp = () => {
      isSleeping = false;
      if (animationFrame === null && inView) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.targetX, p.targetY, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = (now) => {
      if (!inView) {
        animationFrame = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.2;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.2;

      let maxMotion = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let baseX = p.targetX;
        let baseY = p.targetY;
        let progress = 1;

        if (isGathering) {
          const local = (now - gatherStart - p.delay) / Math.max(1, gatherDuration);
          progress = clamp(local, 0, 1);
          const eased = easeOutQuint(progress);
          baseX = p.startX + (p.targetX - p.startX) * eased;
          baseY = p.startY + (p.targetY - p.startY) * eased;
          if (progress < 1) maxMotion += 1;
        } else if (pointer.active && idleDrift > 0) {
          const driftTime = now * 0.001;
          baseX += Math.sin(driftTime + p.seed * 10) * idleDrift * p.depth;
          baseY += Math.cos(driftTime + p.depth * 10) * idleDrift * p.depth;
        }

        if (pointer.active && pointerRepel > 0) {
          const dx = baseX - pointer.smoothX;
          const dy = baseY - pointer.smoothY;
          const distSq = dx * dx + dy * dy;

          if (distSq > 0 && distSq < repelRadiusSq) {
            const distance = Math.sqrt(distSq);
            const force = (1 - distance / repelRadius) * pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const dx = baseX - p.x;
        const dy = baseY - p.y;
        maxMotion += Math.abs(dx) + Math.abs(dy);

        p.x += dx * 0.22;
        p.y += dy * 0.22;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = clamp(0.45 + progress * 0.55, 0, 1) * p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isGathering && maxMotion < 0.5) {
        isGathering = false;
      }

      // If finished gathering and pointer is away, freeze cleanly into sleep mode
      if (!isGathering && !pointer.active && maxMotion < 0.8) {
        drawStatic();
        isSleeping = true;
        animationFrame = null;
        return;
      }

      animationFrame = requestAnimationFrame(render);
    };

    const processImage = (img) => {
      updateCachedRect();
      width = Math.floor(cachedRect.width);
      height = Math.floor(cachedRect.height);
      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const imgAspect = img.naturalWidth / img.naturalHeight || 1;
      const targetW = Math.min(width * scalePercent, 340);
      const drawWidth = Math.floor(targetW);
      const drawHeight = Math.floor(drawWidth / imgAspect);

      offscreen.width = drawWidth;
      offscreen.height = drawHeight;
      offCtx.drawImage(img, 0, 0, drawWidth, drawHeight);

      const imageData = offCtx.getImageData(0, 0, drawWidth, drawHeight);
      const targets = [];
      const step = Math.max(2, Math.floor(density));

      const offsetX = width / 2 - drawWidth / 2;
      const offsetY = height / 2 - drawHeight / 2 - 10;

      for (let y = 0; y < drawHeight; y += step) {
        for (let x = 0; x < drawWidth; x += step) {
          const index = (y * drawWidth + x) * 4;
          const a = imageData.data[index + 3];
          const brightness =
            (imageData.data[index] +
              imageData.data[index + 1] +
              imageData.data[index + 2]) /
            3;

          if (a > 30 && (brightness > 15 || a > 85)) {
            targets.push({
              x: offsetX + x,
              y: offsetY + y,
              alpha: Math.min(1.0, Math.pow(a / 255, 0.65) * 1.25),
            });
          }
        }
      }

      const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
      const filteredTargets = targets.filter((_, i) => i % stride === 0);

      const baseRgb = hexToRgb(activeColor);
      const highlightRgb = hexToRgb(activeHighlight);
      const rand = (index, salt) =>
        (((index * 9301 + salt) * 49297) % 233280) / 233280;

      particles = filteredTargets.map((target, index) => {
        const seed = rand(index, 1);
        const randAngle = seed * Math.PI * 2;
        const randDist = scatter * (0.5 + rand(index, 7919) * 0.8);
        const depth = 0.5 + rand(index, 104729) * 0.5;

        const isGold = seed < 0.18;
        const particleColor = isGold
          ? activeHighlight
          : baseRgb && highlightRgb
          ? rgbToCss(mixRgb(baseRgb, highlightRgb, seed * 0.3))
          : activeColor;

        return {
          x: target.x + Math.cos(randAngle) * randDist,
          y: target.y + Math.sin(randAngle) * randDist,
          startX: target.x + Math.cos(randAngle) * randDist,
          startY: target.y + Math.sin(randAngle) * randDist,
          targetX: target.x,
          targetY: target.y,
          size: particleSize * (0.85 + target.alpha * 0.35),
          baseAlpha: Math.min(1.0, Math.max(0.65, target.alpha)),
          color: particleColor,
          seed,
          depth,
          delay: seed * stagger,
        };
      });

      gatherStart = performance.now();
      isGathering = true;
      wakeUp();
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => processImage(img);
    img.src = imageSrc;

    const handlePointerMove = (e) => {
      pointer.x = e.clientX - cachedRect.left;
      pointer.y = e.clientY - cachedRect.top;
      pointer.active = true;
      wakeUp();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handlePointerEnter = (e) => {
      updateCachedRect();
      handlePointerMove(e);
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth > 0) {
        processImage(img);
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          updateCachedRect();
          wakeUp();
        } else if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [
    imageSrc,
    particleSize,
    density,
    activeColor,
    activeHighlight,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    scalePercent,
    maxParticles,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative block h-full w-full overflow-hidden select-none pointer-events-auto ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}