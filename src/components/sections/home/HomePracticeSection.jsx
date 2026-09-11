// src/components/sections/home/HomePracticeSection.jsx

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA, PracticeHeader, PracticeCard } from "./practice";

function HomePracticeSection() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const calculateDistance = useCallback(() => {
    if (!trackRef.current || isMobile) return;
    const track = trackRef.current;
    const totalTrackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const targetTravel = totalTrackWidth - viewportWidth + (viewportWidth * 0.06);
    setScrollDistance(Math.max(0, targetTravel));
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    calculateDistance();
    
    const handleResize = () => calculateDistance();
    window.addEventListener("resize", handleResize, { passive: true });
    
    const timer = setTimeout(calculateDistance, 250);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [calculateDistance, isMobile]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0.03, 0.94], [0, -scrollDistance]);

  const x = useSpring(xRaw, {
    stiffness: 170,
    damping: 30,
    mass: 0.12,
    restDelta: 0.001,
  });

  // Mobile View: Native horizontal scroll container with explicit touch-action override
  if (isMobile) {
    return (
      <section className="relative bg-black select-none z-10 py-12 px-margin-mobile">
        <div className="max-w-container-max-width mx-auto flex flex-col space-y-6">
          <PracticeHeader title="Specialized Services" />

          {/* Explicit touch-pan-x touch-pan-y overrides body-level pan-y restrictions */}
          <div
            className="w-full overflow-x-auto flex items-stretch gap-4 pb-4 snap-x snap-mandatory scrollbar-none -mx-margin-mobile px-margin-mobile touch-pan-x touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {SERVICES_DATA.map((item, index) => (
              <div key={item.id || index} className="snap-start shrink-0">
                <PracticeCard item={item} index={index} />
              </div>
            ))}

            {/* Mobile End Directory Card */}
            <Link
              to="/services"
              className="group relative w-[220px] shrink-0 rounded-2xl border border-dashed border-white/20 [@media(hover:hover)]:hover:border-white/50 bg-[#121212] transition-colors duration-300 flex flex-col justify-between p-6 cursor-pointer no-underline snap-start"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 [@media(hover:hover)]:group-hover:text-white/70 transition-colors">
                  MORE SERVICES
                </span>
                <span className="font-mono text-xs text-white/30 font-light">+</span>
              </div>

              <div className="flex flex-col gap-2 my-8">
                <h3 className="font-serif text-xl font-light text-white leading-snug [@media(hover:hover)]:group-hover:text-white/90 transition-colors">
                  Explore Full Directory
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 [@media(hover:hover)]:group-hover:text-white/80 transition-colors inline-flex items-center gap-1.5 pt-2">
                  <span>View All</span>
                  <ArrowRight
                    size={13}
                    className="[@media(hover:hover)]:group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>

              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                ALL INDIA • WB
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Desktop View: Pinned Horizontal Scroll
  return (
    <section
      ref={targetRef}
      className="relative h-[320vh] bg-black select-none z-10"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <PracticeHeader title="Specialized Services" />

        {/* Horizontal Track Viewport */}
        <div className="relative z-10 w-full flex-1 flex items-center overflow-visible mt-2 md:mt-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-0 pl-0 pr-[12vw] w-max shrink-0 h-full py-2 will-change-transform transform-gpu"
          >
            {SERVICES_DATA.map((item, index) => (
              <PracticeCard key={item.id || index} item={item} index={index} />
            ))}

            <Link
              to="/services"
              className="group relative w-[220px] sm:w-[260px] shrink-0 h-full rounded-2xl md:rounded-3xl border border-dashed border-white/20 [@media(hover:hover)]:hover:border-white/50 bg-[#121212] transition-colors duration-300 flex flex-col justify-between p-6 sm:p-8 cursor-pointer ml-4 no-underline"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 [@media(hover:hover)]:group-hover:text-white/70 transition-colors">
                  MORE SERVICES
                </span>
                <span className="font-mono text-xs text-white/30 font-light">+</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug [@media(hover:hover)]:group-hover:text-white/90 transition-colors">
                  Explore Full Directory
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 [@media(hover:hover)]:group-hover:text-white/80 transition-colors inline-flex items-center gap-1.5 pt-2">
                  <span>View All</span>
                  <ArrowRight
                    size={13}
                    className="[@media(hover:hover)]:group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>

              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                ALL INDIA • WB
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(HomePracticeSection);