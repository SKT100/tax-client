// src/components/ui/AsciiArt.jsx

import { useEffect, useRef, useState, memo } from "react";

// Ascending visual density with statutory & currency glyphs
const DENSE_CHARSET = "  ..::--==+*#%@₹§W#8B";

function AsciiArt({
  imageSrc = "/images/howrah-bridge.webp",
  charSize = 8,
  charSet = DENSE_CHARSET,
  contrast = 1.55,
  threshold = 0.16,
  opacity,
  className = "",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    const renderStaticAscii = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      const cols = Math.floor(width / charSize);
      const rows = Math.floor(height / charSize);
      if (cols <= 0 || rows <= 0) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Aspect-ratio cover mapping
      const imgAspect = img.naturalWidth / (img.naturalHeight || 1);
      const canvasAspect = cols / rows;
      let drawW = cols;
      let drawH = rows;
      let drawX = 0;
      let drawY = 0;

      if (imgAspect > canvasAspect) {
        drawW = rows * imgAspect;
        drawX = (cols - drawW) / 2;
      } else {
        drawH = cols / imgAspect;
        drawY = (rows - drawH) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      // Pass 1: Dynamic histogram range calculation
      let minLum = 1.0;
      let maxLum = 0.0;
      const totalPixels = cols * rows;
      const lums = new Float32Array(totalPixels);

      for (let i = 0; i < totalPixels; i++) {
        const idx = i * 4;
        const a = imgData[idx + 3] / 255;
        if (a < 0.1) {
          lums[i] = -1;
          continue;
        }

        const lum = (0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2]) / 255;
        lums[i] = lum;

        if (lum < minLum) minLum = lum;
        if (lum > maxLum) maxLum = lum;
      }

      const lumRange = Math.max(0.01, maxLum - minLum);

      // Pass 2: Single static draw (Zero runtime overhead)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `700 ${charSize}px "Courier New", Courier, monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      const charsLen = charSet.length;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const rawLum = lums[y * cols + x];
          if (rawLum < 0) continue;

          let normalized = (rawLum - minLum) / lumRange;

          // Invert for light mode so dark bridge beams become dense ink
          if (!isDark) {
            normalized = 1.0 - normalized;
          }

          normalized = Math.pow(Math.max(0, Math.min(1, normalized)), contrast);

          // Sky / noise culling
          if (normalized < threshold) continue;

          const charIdx = Math.min(
            charsLen - 1,
            Math.floor(normalized * charsLen)
          );
          const char = charSet[charIdx];

          if (char && char.trim().length > 0) {
            if (isDark) {
              ctx.fillStyle = `rgba(241, 245, 249, ${0.45 + normalized * 0.55})`;
            } else {
              ctx.fillStyle = `rgba(15, 23, 42, ${0.55 + normalized * 0.45})`;
            }

            ctx.fillText(char, x * charSize, y * charSize);
          }
        }
      }
    };

    if (img.complete) {
      renderStaticAscii();
    } else {
      img.onload = renderStaticAscii;
    }

    const resizeObserver = new ResizeObserver(renderStaticAscii);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [imageSrc, charSize, charSet, contrast, threshold, isDark]);

  const effectiveOpacity = opacity ?? (isDark ? 0.55 : 0.75);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity: effectiveOpacity }}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}

export default memo(AsciiArt);