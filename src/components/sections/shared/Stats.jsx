import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS_DATA, StatCard } from "./stats/index";

export default function Stats() {
  const ref = useRef(null);
  // Adjusted margin so animations trigger reliably on smaller mobile viewports
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto mt-14 sm:mt-20 md:mt-24 mb-16 sm:mb-24 md:mb-32 relative"
    >
      {/* Animated Top Border Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-[1px] bg-obsidian/20 dark:bg-wireframe origin-left"
      />

      {/* 🌟 Responsive Grid: 2×2 on Mobile, 4-column on Desktop */}
      <div className="border-x border-b border-obsidian/10 dark:border-wireframe bg-obsidian/10 dark:bg-wireframe grid grid-cols-2 lg:grid-cols-4 gap-[1px] transition-colors duration-300">
        {STATS_DATA.map((stat, idx) => (
          <StatCard key={idx} stat={stat} idx={idx} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}