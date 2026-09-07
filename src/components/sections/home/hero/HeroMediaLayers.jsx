// src/components/sections/home/hero/HeroMediaLayers.jsx

import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HERO_SLIDES } from "../../../../data/heroSlides";

function HeroMediaLayers({ index, nextIndex, lensClipPath }) {
  const videoRefs = useRef({});

  useEffect(() => {
    [index, nextIndex].forEach((idx) => {
      const videoEl = videoRefs.current[idx];
      const slide = HERO_SLIDES[idx];
      if (!videoEl || slide?.type !== "video") return;

      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const forcePlay = () => {
            videoEl.play().catch(() => {});
            window.removeEventListener("pointerdown", forcePlay);
          };
          window.addEventListener("pointerdown", forcePlay, { once: true });
        });
      }
    });

    Object.keys(videoRefs.current).forEach((key) => {
      const numKey = Number(key);
      if (numKey !== index && numKey !== nextIndex && videoRefs.current[numKey]) {
        videoRefs.current[numKey].pause();
      }
    });
  }, [index, nextIndex]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {HERO_SLIDES.map((slide, slideIdx) => {
        const isCurrent = slideIdx === index;
        const isNext = slideIdx === nextIndex;
        const isActive = isCurrent || isNext;

        const zIndex = isNext ? 10 : isCurrent ? 1 : -1;
        const applyLensClip = isNext;

        if (!isActive) return null;

        return (
          <motion.div
            key={slide.id || `slide-media-${slideIdx}`}
            className="absolute inset-0 w-full h-full transform-gpu"
            style={{
              zIndex,
              clipPath: applyLensClip ? lensClipPath : "circle(100% at 50% 50%)",
              WebkitClipPath: applyLensClip ? lensClipPath : "circle(100% at 50% 50%)",
              willChange: "clip-path, -webkit-clip-path",
            }}
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[slideIdx] = el;
                }}
                src={slide.src}
                poster={slide.poster}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover filter brightness-105 contrast-110"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.text || "Matrix Tax Solutions"}
                width="1920"
                height="1080"
                loading={isCurrent ? "eager" : "lazy"}
                fetchPriority={isCurrent ? "high" : "auto"}
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