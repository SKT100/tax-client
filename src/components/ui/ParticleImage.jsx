import { useEffect, useRef, useState } from 'react';

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '').trim();
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

const LAYER_BANDS = [
  { until: 0.35, dir: 'diagonal', jitter: 0.25, label: 'pediment' },
  { until: 0.45, dir: 'horizontal', jitter: 0.15, label: 'entablature' },
  { until: 0.85, dir: 'vertical', jitter: 0.20, label: 'columns' },
  { until: 1.01, dir: 'horizontal', jitter: 0.20, label: 'base' },
];

const getBandForT = (t) =>
  LAYER_BANDS.find((band) => t <= band.until) || LAYER_BANDS[LAYER_BANDS.length - 1];

export default function ParticleImage({
  imageSrc,
  particleSize = 2.1,
  density = 3.0,
  color,
  highlightColor,
  scatter = 190,
  gatherDuration = 1700,
  stagger = 420,
  pointerRepel = 48,
  repelRadius = 145,
  idleDrift = 0.7,
  trigger = 'mount',
  scalePercent = 1.15,
  glow = true,
  className = '',
  style,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  const hasGatheredRef = useRef(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const activeColor = color || (isDark ? '#F5D77F' : '#B45309');
  const activeHighlight = highlightColor || (isDark ? '#FFF2CE' : '#D97706');

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let particles = [];
    let animationFrame = null;
    let resizeFrame = null;
    let buildId = 0;
    let gathering = false;
    let gatherStart = 0;
    let reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    // Assume hidden until the real IntersectionObserver reports back — avoids
    // rendering/gathering while off-screen based on a guess, and the stale
    // bounding-rect issues that guess caused on first scroll-into-view.
    let inView = false;
    let loadedImg = null;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cachedRect = container.getBoundingClientRect();

    const pointer = { active: false, x: 0, y: 0, smoothX: 0, smoothY: 0 };
    const repelRadiusSq = repelRadius * repelRadius;

    const computeLaunchPosition = (particle, spread) => {
      const band = particle.band;
      let baseAngle = 0;

      if (band.dir === 'diagonal') {
        baseAngle = particle.side < 0 ? -Math.PI * 0.75 : -Math.PI * 0.25;
      } else if (band.dir === 'horizontal') {
        baseAngle = particle.side < 0 ? Math.PI : 0;
      } else if (band.dir === 'vertical') {
        baseAngle = particle.seed < 0.5 ? -Math.PI / 2 : Math.PI / 2;
      }

      const angle = baseAngle + (particle.rand1 - 0.5) * Math.PI * band.jitter;
      const distance = spread * (0.6 + particle.rand2 * 1.4 + particle.depth * 0.5);
      const perpAngle = angle + Math.PI / 2;
      const perpSpread = spread * band.jitter * (particle.rand3 - 0.5) * 1.5;

      return {
        x: particle.targetX + Math.cos(angle) * distance + Math.cos(perpAngle) * perpSpread,
        y: particle.targetY + Math.sin(angle) * distance + Math.sin(perpAngle) * perpSpread,
      };
    };

    const startGather = (fromScatter = true) => {
      if (!particles.length) return;
      const now = performance.now();
      const spread = reducedMotion ? 0 : scatter;

      particles.forEach((particle) => {
        if (fromScatter) {
          const launch = computeLaunchPosition(particle, spread);
          particle.x = launch.x;
          particle.y = launch.y;
        }
        particle.startX = particle.x;
        particle.startY = particle.y;
        particle.delay = reducedMotion ? 0 : particle.bandStagger + particle.seed * stagger;
      });

      gatherStart = now;
      gathering = true;
      hasGatheredRef.current = true;
      ensureRenderLoop();
    };

    const drawParticle = (particle) => {
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (now) => {
      if (!inView) {
        animationFrame = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.18;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.18;

      let complete = true;

      particles.forEach((particle) => {
        let baseX = particle.targetX;
        let baseY = particle.targetY;
        let progress = 1;

        if (gathering) {
          const local = (now - gatherStart - particle.delay) / Math.max(1, reducedMotion ? 1 : gatherDuration);
          progress = clamp(local, 0, 1);
          const eased = easeOutQuint(progress);
          baseX = particle.startX + (particle.targetX - particle.startX) * eased;
          baseY = particle.startY + (particle.targetY - particle.startY) * eased;
          if (progress < 1) complete = false;
        } else if (!reducedMotion && idleDrift > 0) {
          const driftTime = now * 0.001;
          baseX += Math.sin(driftTime * 0.85 + particle.seed * 10) * idleDrift * particle.depth;
          baseY += Math.cos(driftTime * 0.70 + particle.depth * 10) * idleDrift * particle.depth;
        }

        if (pointer.active && !reducedMotion && pointerRepel > 0) {
          const dx = baseX - pointer.smoothX;
          const dy = baseY - pointer.smoothY;
          const distSq = dx * dx + dy * dy;

          if (distSq > 0 && distSq < repelRadiusSq) {
            const distance = Math.sqrt(distSq);
            const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const follow = reducedMotion ? 1 : 0.20;
        particle.x += (baseX - particle.x) * follow;
        particle.y += (baseY - particle.y) * follow;

        ctx.globalAlpha = clamp(0.45 + progress * 0.55, 0, 1) * particle.baseAlpha;
        drawParticle(particle);
      });

      if (gathering && complete) gathering = false;

      if (gathering || !reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = null;
      }
    };

    const ensureRenderLoop = () => {
      if (animationFrame === null && inView) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const processImageAndSample = () => {
      if (!loadedImg) return;
      const currentBuild = ++buildId;

      cachedRect = container.getBoundingClientRect();
      width = Math.floor(cachedRect.width);
      height = Math.floor(cachedRect.height);

      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const imgAspect = loadedImg.naturalWidth / loadedImg.naturalHeight || 1.1;
      const maxAllowedW = width * 0.98;
      const targetW = Math.min(width * 0.70 * scalePercent, maxAllowedW);
      const drawWidth = Math.floor(targetW);
      const drawHeight = Math.floor(drawWidth / imgAspect);

      offscreen.width = drawWidth;
      offscreen.height = drawHeight;

      offCtx.clearRect(0, 0, drawWidth, drawHeight);
      offCtx.drawImage(loadedImg, 0, 0, drawWidth, drawHeight);

      if (currentBuild !== buildId) return;

      const imageData = offCtx.getImageData(0, 0, drawWidth, drawHeight);
      const targets = [];
      const step = Math.max(2, Math.floor(density));

      const offsetX = width / 2 - drawWidth / 2;
      const offsetY = height / 2 - drawHeight / 2 - 12;

      for (let y = 0; y < drawHeight; y += step) {
        for (let x = 0; x < drawWidth; x += step) {
          const index = (y * drawWidth + x) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          const a = imageData.data[index + 3];

          const brightness = (r + g + b) / 3;

          if (a > 30 && (brightness > 15 || a > 85)) {
            const normalizedAlpha = Math.min(1.0, Math.pow(a / 255, 0.65) * 1.25);
            targets.push({
              x: offsetX + x,
              y: offsetY + y,
              t: y / drawHeight,
              side: (x - drawWidth / 2) / (drawWidth / 2),
              alpha: normalizedAlpha,
            });
          }
        }
      }

      const MAX_PARTICLES = 6500;
      const stride = Math.max(1, Math.ceil(targets.length / MAX_PARTICLES));
      const filteredTargets = targets.filter((_, i) => i % stride === 0);

      const baseRgb = hexToRgb(activeColor);
      const highlightRgb = hexToRgb(activeHighlight);
      const rand = (index, salt) => (((index * 9301 + salt) * 49297) % 233280) / 233280;

      particles = filteredTargets.map((target, index) => {
        const seed = rand(index, 1);
        const rand1 = rand(index, 7919);
        const rand2 = rand(index, 104729);
        const rand3 = rand(index, 15485863);
        const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;

        const blend =
          baseRgb && highlightRgb
            ? clamp(target.x / Math.max(1, width) + (seed - 0.5) * 0.35, 0, 1)
            : 0;
        const particleColor =
          baseRgb && highlightRgb
            ? rgbToCss(mixRgb(baseRgb, highlightRgb, blend))
            : activeColor;

        const band = getBandForT(target.t);
        const bandIndex = LAYER_BANDS.indexOf(band);
        const bandStagger = (bandIndex / LAYER_BANDS.length) * stagger * 1.6;

        return {
          x: target.x,
          y: target.y,
          startX: target.x,
          startY: target.y,
          targetX: target.x,
          targetY: target.y,
          size: particleSize * (0.85 + target.alpha * 0.35),
          baseAlpha: Math.min(1.0, Math.max(0.65, target.alpha)),
          color: particleColor,
          seed,
          rand1,
          rand2,
          rand3,
          depth,
          side: target.side,
          band,
          bandStagger,
          delay: seed * stagger,
        };
      });

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;

      if (reducedMotion || hasGatheredRef.current) {
        // If already assembled once, stay assembled in place
        particles.forEach((particle) => {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.startX = particle.targetX;
          particle.startY = particle.targetY;
          particle.delay = 0;
        });
        gathering = false;
      } else {
        startGather(trigger === 'mount');
      }

      ensureRenderLoop();
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedImg = img;
      processImageAndSample();
    };
    img.src = imageSrc;

    if (img.complete && img.naturalWidth > 0) {
      loadedImg = img;
      processImageAndSample();
    }

    const queueSample = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(processImageAndSample);
    };

    const updateCachedRect = () => {
      if (container) cachedRect = container.getBoundingClientRect();
    };

    const handlePointerMove = (event) => {
      // Always read the live rect here rather than a cached one — cheap for a
      // single element, and guarantees correct coordinates even if the page
      // layout shifted (fonts/images loading above) since the last cache.
      cachedRect = container.getBoundingClientRect();
      pointer.x = event.clientX - cachedRect.left;
      pointer.y = event.clientY - cachedRect.top;
      pointer.active = true;
      ensureRenderLoop();
    };

    const handlePointerLeave = () => { pointer.active = false; };
    const handlePointerEnter = (event) => {
      handlePointerMove(event);
      if (trigger === 'hover' && !hasGatheredRef.current) startGather(true);
    };
    const handleClick = () => {
      if (trigger === 'click') startGather(true);
    };

    const reduceMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const handleReduceMotionChange = (event) => {
      reducedMotion = event.matches;
      processImageAndSample();
    };

    reduceMotionQuery?.addEventListener('change', handleReduceMotionChange);
    window.addEventListener('scroll', updateCachedRect, { passive: true });
    window.addEventListener('resize', updateCachedRect, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('click', handleClick);

    const resizeObserver = new ResizeObserver(queueSample);
    resizeObserver.observe(container);

    // Sleep RAF loop when off-screen; awaken when entering without resetting particle state
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          updateCachedRect();
          ensureRenderLoop();
        } else {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
        }
      },
      { rootMargin: '150px' }
    );
    intersectionObserver.observe(container);

    return () => {
      buildId += 1;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reduceMotionQuery?.removeEventListener('change', handleReduceMotionChange);
      window.removeEventListener('scroll', updateCachedRect);
      window.removeEventListener('resize', updateCachedRect);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
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
    trigger,
    scalePercent,
    glow,
  ]);

  const glowClass = glow
    ? 'drop-shadow-[0_0_8px_rgba(245,215,127,0.4)] dark:drop-shadow-[0_0_12px_rgba(212,175,55,0.65)]'
    : '';

  return (
    <div
      ref={containerRef}
      className={`relative block h-full w-full overflow-hidden select-none pointer-events-auto ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 block h-full w-full transition-shadow duration-300 ${glowClass}`}
        aria-hidden="true"
      />
    </div>
  );
}