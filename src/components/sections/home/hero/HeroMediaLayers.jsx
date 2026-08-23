import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES } from "../../../../data/heroSlides";
export default function HeroMediaLayers({
  index,
  nextIndex,
  isHoveringHero,
  lensClipPath,
}) {
  return (
    <>
      {" "}
      {HERO_SLIDES.map((slide, slideIdx) => {
        const isCurrent = slideIdx === index;
        const isNext = slideIdx === nextIndex;
        const showPreview = isNext && isHoveringHero;
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
            className={`absolute inset-0 w-full h-full ${opacityClass} ${zIndexClass}`}
            style={
              showPreview
                ? { clipPath: lensClipPath }
                : { clipPath: "circle(100% at 50% 50%)" }
            }
          >
            {" "}
            {slide.type === "video" ? (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-105 contrast-110"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.text}
                className="w-full h-full object-cover filter grayscale brightness-90 contrast-125"
              />
            )}{" "}
            {/* Vignette Gradient for readability of floating cards */}{" "}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-1" />{" "}
          </motion.div>
        );
      })}{" "}
    </>
  );
}
