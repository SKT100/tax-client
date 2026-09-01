// src/components/sections/home/hero/HeroMediaLayers.jsx

import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HERO_SLIDES } from "../../../../data/heroSlides";

function HeroMediaLayers({ index, nextIndex, lensClipPath }) {
  const videoRefs = useRef({});

  useEffect(() => {
    HERO_SLIDES.forEach((slide, idx) => {
      const videoEl = videoRefs.current[idx];
      if (!videoEl || slide.type !== "video") return;

      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;
      videoEl.setAttribute("playsinline", "");
      videoEl.setAttribute("webkit-playsinline", "true");

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback: start playback upon first touch or click
          const enablePlayback = () => {
            videoEl.play().catch(() => {});
            window.removeEventListener("pointerdown", enablePlayback);
            window.removeEventListener("touchstart", enablePlayback);
          };
          window.addEventListener("pointerdown", enablePlayback, { once: true });
          window.addEventListener("touchstart", enablePlayback, { once: true });
        });
      }
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {HERO_SLIDES.map((slide, slideIdx) => {
        const isCurrent = slideIdx === index;
        const isNext = slideIdx === nextIndex;

        let zIndex = 0;
        let isVisible = false;
        let applyLensClip = false;

        if (isCurrent) {
          zIndex = 1;
          isVisible = true;
          applyLensClip = false;
        } else if (isNext) {
          zIndex = 10;
          isVisible = true;
          applyLensClip = true;
        }

        return (
          <motion.div
            key={slide.id || `slide-${slideIdx}`}
            className="absolute inset-0 w-full h-full transform-gpu"
            style={{
              zIndex,
              opacity: isVisible ? 1 : 0,
              WebkitClipPath: applyLensClip ? lensClipPath : "none",
              clipPath: applyLensClip ? lensClipPath : "none",
              willChange: applyLensClip ? "clip-path, -webkit-clip-path" : "auto",
              visibility: isVisible ? "visible" : "hidden",
            }}
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[slideIdx] = el;
                }}
                src={slide.src}
                muted
                autoPlay
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                className="w-full h-full object-cover filter brightness-105 contrast-110"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.text || "Matrix Tax Solutions"}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover filter grayscale brightness-90 contrast-125"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-[1]" />
          </motion.div>
        );
      })}
    </div>
  );
}

export default memo(HeroMediaLayers);