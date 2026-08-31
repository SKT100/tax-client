// src/components/sections/home/hero/HeroMediaLayers.jsx

import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HERO_SLIDES } from "../../../../data/heroSlides";

function HeroMediaLayers({
  index,
  nextIndex,
  isHoveringHero,
  isExpanding,
  lensClipPath,
}) {
  const videoRefs = useRef({});

  // Play active slide video, or preview video during hover/expansion
  useEffect(() => {
    HERO_SLIDES.forEach((slide, idx) => {
      const videoEl = videoRefs.current[idx];
      if (!videoEl || slide.type !== "video") return;

      const isRevealing = idx === nextIndex && (isHoveringHero || isExpanding);
      const shouldPlay = idx === index || isRevealing;

      if (shouldPlay) {
        videoEl.play().catch(() => {});
      } else {
        videoEl.pause();
      }
    });
  }, [index, nextIndex, isHoveringHero, isExpanding]);

  return (
    <>
      {HERO_SLIDES.map((slide, slideIdx) => {
        const isCurrent = slideIdx === index;
        const isNext = slideIdx === nextIndex;
        const showPreview = isNext && (isHoveringHero || isExpanding);

        let opacityClass = "opacity-0 pointer-events-none";
        let zIndexClass = "z-0";

        if (isCurrent) {
          opacityClass = "opacity-100 pointer-events-none";
          zIndexClass = "z-0";
        } else if (showPreview) {
          opacityClass = "opacity-100 pointer-events-none";
          zIndexClass = "z-10";
        }

        return (
          <motion.div
            key={`slide-layer-${slideIdx}`}
            className={`absolute inset-0 w-full h-full ${opacityClass} ${zIndexClass} transform-gpu`}
            style={
              showPreview
                ? { clipPath: lensClipPath, willChange: "clip-path" }
                : { clipPath: "circle(100% at 50% 50%)" }
            }
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => (videoRefs.current[slideIdx] = el)}
                src={slide.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover filter brightness-105 contrast-110"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.text || "Matrix Tax Solutions"}
                loading={isCurrent || isNext ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover filter grayscale brightness-90 contrast-125"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-[1]" />
          </motion.div>
        );
      })}
    </>
  );
}

export default memo(HeroMediaLayers);