// src/components/sections/home/hero/HeroMediaLayers.jsx

import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HERO_SLIDES } from "../../../../data/heroSlides";

function HeroMediaLayers({ index, nextIndex, lensClipPath }) {
  const videoRefs = useRef({});

  // Continuously play all muted background videos so GPU frames remain warm
  useEffect(() => {
    HERO_SLIDES.forEach((slide, idx) => {
      const videoEl = videoRefs.current[idx];
      if (!videoEl || slide.type !== "video") return;

      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.play().catch(() => {});
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. Base Active Slide Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        {HERO_SLIDES[index].type === "video" ? (
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={HERO_SLIDES[index].src}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter brightness-105 contrast-110"
          />
        ) : (
          <img
            src={HERO_SLIDES[index].src}
            alt={HERO_SLIDES[index].text || "Matrix Tax Solutions"}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter grayscale brightness-90 contrast-125"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-[1]" />
      </div>

      {/* 2. Upcoming Slide Lens Layer (Always Opacity: 1, Clipped to cursor lens) */}
      <motion.div
        key={`preview-lens-${nextIndex}`}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none transform-gpu"
        style={{
          clipPath: lensClipPath,
          willChange: "clip-path",
        }}
      >
        {HERO_SLIDES[nextIndex].type === "video" ? (
          <video
            ref={(el) => (videoRefs.current[nextIndex] = el)}
            src={HERO_SLIDES[nextIndex].src}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter brightness-105 contrast-110"
          />
        ) : (
          <img
            src={HERO_SLIDES[nextIndex].src}
            alt={HERO_SLIDES[nextIndex].text || "Matrix Tax Solutions"}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter grayscale brightness-90 contrast-125"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-[1]" />
      </motion.div>
    </div>
  );
}

export default memo(HeroMediaLayers);