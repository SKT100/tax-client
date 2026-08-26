import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import DossierCard from "./cards/DossierCard";
import MediaBadge from "./cards/MediaBadge";
import PortraitCard from "./cards/PortraitCard";
import StatBadge from "./cards/StatBadge";

export default function Philosophy() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });

  const textScale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const textOpacity = useTransform(smoothProgress, [0, 0.1, 0.88, 1], [0.5, 1, 1, 0.3]);

  return (
    <section
      ref={targetRef}
      className="relative w-full min-h-[420vh] bg-surface-light dark:bg-surface-dark transition-colors duration-300 z-10"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center gpu-layer transform-gpu will-change-transform">
        
        {/* Center Big Typography */}
        <motion.div
          style={{ scale: textScale, opacity: textOpacity }}
          className="relative z-10 text-center max-w-5xl px-4 pointer-events-none"
        >
          <h2 className="font-serif italic font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-primary-light dark:text-primary-dark tracking-tight leading-[0.92]">
            Turning <br />
            <span className="font-sans font-black uppercase not-italic tracking-[0.05em] text-slate-900 dark:text-white">
              complexity
            </span>{" "}
            <br />
            into clarity.
          </h2>
        </motion.div>

        {/* 4 Floating Shape Cards */}
        <div className="absolute inset-0 z-20 pointer-events-none max-w-[1600px] mx-auto w-full h-full">
          <DossierCard progress={smoothProgress} />
          <MediaBadge progress={smoothProgress} />
          <PortraitCard progress={smoothProgress} />
          <StatBadge progress={smoothProgress} />
        </div>

      </div>
    </section>
  );
}