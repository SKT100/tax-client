// src/components/sections/contact/RegionalReachMap.jsx

import { memo } from "react";
import { motion } from "framer-motion";
import ChamberMapCard from "../../ui/ChamberMapCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function RegionalReachMap() {
  return (
    <section
      id="locations"
      className="px-margin-mobile md:px-margin-desktop relative z-10 py-16 sm:py-24 md:py-32 transition-colors duration-300"
    >
      <div className="max-w-container-max-width mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 pb-6 border-b border-theme"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-2">
              JURISDICTIONAL PRESENCE
            </span>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark tracking-tight leading-tight"
            >
              Regional <span className="italic font-light opacity-90">Presence</span>
            </motion.h2>
          </div>

          <motion.span
            variants={fadeUp}
            className="font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark"
          >
            SERVING HOOGHLY, KOLKATA &amp; ADJACENT DISTRICTS
          </motion.span>
        </motion.div>

        {/* Chamber Map Card */}
        <ChamberMapCard />
      </div>
    </section>
  );
}

export default memo(RegionalReachMap);