import { motion } from "framer-motion";
import { FileCheck2 } from "lucide-react";
import { TAX_CASE_STUDIES } from "../../../data/taxData";
import PrecedentCard from "./PrecedentCard";

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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export default function LandmarkCases() {
  return (
    <section
      id="case-studies"
      className="relative w-full py-16 sm:py-24 md:py-32 transition-colors duration-300 z-10 overflow-hidden"
    >
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4 pb-6 border-b border-theme relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileCheck2 className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark" />
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark">
                TRACK RECORD & RESOLUTIONS
              </span>
            </div>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark tracking-tight leading-[1.1]"
            >
              Statutory Precedents
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="font-body font-light text-xs sm:text-sm md:text-base text-secondary-light dark:text-secondary-dark max-w-sm md:text-right leading-relaxed"
          >
            Representative taxpayer defense, scrutiny quash orders, and audit reconciliations executed across Bengal.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {TAX_CASE_STUDIES.map((matter, idx) => (
            <PrecedentCard key={idx} matter={matter} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}