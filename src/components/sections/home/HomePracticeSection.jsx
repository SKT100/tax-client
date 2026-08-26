import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES_DATA, PracticeHeader, PracticeCard } from "./practice";

export default function HomePracticeSection() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const calculateDistance = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cards = track.children;
    const viewportWidth = window.innerWidth;

    if (cards.length > 0) {
      const lastCard = cards[cards.length - 1];
      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
      const targetTravel =
        lastCardCenter - viewportWidth / 2 + lastCard.offsetWidth * 0.15;
      setScrollDistance(Math.max(0, targetTravel));
    }
  }, []);

  useEffect(() => {
    calculateDistance();
    const handleResize = () => calculateDistance();
    window.addEventListener("resize", handleResize, { passive: true });
    const timer = setTimeout(calculateDistance, 400);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [calculateDistance]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0.02, 0.86], [0, -scrollDistance]);
  const x = useSpring(xRaw, {
    stiffness: 140,
    damping: 28,
    mass: 0.5,
    restDelta: 0.5,
  });

  return (
    <section
      ref={targetRef}
      className="relative h-[280vh] bg-[#000000] select-none z-10"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 max-w-[1440px] mx-auto gpu-layer transform-gpu will-change-transform">
        <PracticeHeader title="Specialized Services" />

        {/* Horizontal Track Viewport */}
        <div className="relative z-10 w-full flex-1 flex items-center overflow-visible mt-2 md:mt-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-0 pl-0 pr-[15vw] w-max shrink-0 h-full py-2 transform-gpu will-change-transform"
          >
            {SERVICES_DATA.map((item, index) => (
              <PracticeCard key={item.id} item={item} index={index} />
            ))}

            {/* 🌟 Minimal Dotted "And More" Card */}
            <Link
              to="/services"
              className="group relative w-[220px] sm:w-[260px] shrink-0 h-full rounded-2xl md:rounded-3xl border border-dashed border-white/20 hover:border-white/60 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 cursor-pointer ml-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">
                  MORE SERVICES
                </span>
                <span className="font-mono text-xs text-white/30 font-light">
                  +
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug group-hover:text-amber-100 transition-colors">
                  Explore Full Directory
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors inline-flex items-center gap-1.5 pt-2">
                  <span>View All</span>
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-1 transition-transform"
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