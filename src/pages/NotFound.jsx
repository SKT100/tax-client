// src/pages/NotFound.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ShieldAlert } from "lucide-react";
import PillButton from "../components/ui/PillButton";
import { SITE_CONFIG } from "../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function NotFound() {
  return (
    <div className="relative min-h-[90vh] bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 flex flex-col justify-center items-center overflow-hidden pt-16 sm:pt-20 pb-[30vh] sm:pb-[35vh] md:pb-[42vh]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[420px] sm:w-[600px] h-[300px] rounded-full bg-black/[0.03] dark:bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center max-w-xl mx-auto"
        >
          {/* Eyebrow Label */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-theme mb-4 sm:mb-6"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-secondary-light dark:text-secondary-dark" />
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark">
              ERROR // 404 : DIRECTIVE NOT FOUND
            </span>
          </motion.div>

          {/* Monolith Error Number */}
          <motion.div
            variants={fadeUp}
            className="font-serif text-7xl sm:text-9xl md:text-[10.5rem] font-light leading-none tracking-tighter text-primary-light dark:text-primary-dark mb-2 sm:mb-4 select-none opacity-95"
          >
            404
          </motion.div>

          {/* Primary Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-primary-light dark:text-primary-dark tracking-tight leading-tight mb-3"
          >
            Statutory Record <span className="italic font-light opacity-90">Unavailable</span>
          </motion.h1>

          {/* Contextual Narrative */}
          <motion.p
            variants={fadeUp}
            className="font-body font-light text-xs sm:text-sm md:text-base text-secondary-light dark:text-secondary-dark leading-relaxed max-w-md mb-8 sm:mb-10"
          >
            The requested URL or statutory directive does not exist within the firm's directory or may have been reclassified under an updated compliance index.
          </motion.p>

          {/* Action Row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link to="/" className="w-full sm:w-auto no-underline">
              <PillButton
                variant="auto"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase bg-primary-light text-surface-light dark:bg-primary-dark dark:text-primary-light hover:scale-[1.02] active:scale-[0.98] shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Chambers</span>
              </PillButton>
            </Link>

            <Link to="/services" className="w-full sm:w-auto no-underline">
              <PillButton
                variant="outline"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Directory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </PillButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}