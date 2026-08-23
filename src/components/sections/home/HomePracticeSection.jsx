import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PRACTICE_AREAS, PracticeHeader, PracticeCard } from "./practice";

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
      const targetTravel = lastCardCenter - viewportWidth / 2 + lastCard.offsetWidth * 0.15;
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
  const x = useSpring(xRaw, { stiffness: 140, damping: 28, mass: 0.5, restDelta: 0.5 });

  return (
    <section
      ref={targetRef}
      className="relative h-[280vh] bg-[#000000] select-none z-10"
    >
      {/* pt-24 md:pt-28 ensures 96px-112px buffer below fixed navbar */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 max-w-[1440px] mx-auto gpu-layer transform-gpu will-change-transform">
        <PracticeHeader title="Specialized Benches" />

        {/* Horizontal Track Viewport */}
        <div className="relative z-10 w-full flex-1 flex items-center overflow-visible mt-2 md:mt-4">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-0 pl-0 pr-[15vw] w-max shrink-0 h-full py-2 transform-gpu will-change-transform"
          >
            {PRACTICE_AREAS.map((item, index) => (
              <PracticeCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}