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
      className="px-margin-mobile md:px-margin-desktop relative z-10 pt-2 sm:pt-4 md:pt-6 pb-16 md:pb-24 transition-colors duration-300"
    >
      <div className="max-w-container-max-width mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 pb-6 border-b border-theme"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-amber-600 dark:text-amber-400 block mb-2"
            >
              LOCATIONS & COVERAGE
            </motion.span>
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