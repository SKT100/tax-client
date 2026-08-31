// src/components/sections/contact/RegionalReachMap.jsx

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

export default function RegionalReachMap() {
  return (
    <section
      id="locations"
      className="px-margin-mobile md:px-margin-desktop relative z-10 py-20 sm:py-28 md:py-36 transition-colors duration-300"
    >
      <div className="max-w-container-max-width mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 pb-6 border-b border-theme"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark leading-tight"
            >
              Regional Presence
            </motion.h2>
          </div>

          <motion.span
            variants={fadeUp}
            className="font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark"
          >
            SERVING HOOGHLY, KOLKATA & ADJACENT DISTRICTS
          </motion.span>
        </motion.div>

        {/* Chamber Map Card */}
        <ChamberMapCard />
      </div>
    </section>
  );
}