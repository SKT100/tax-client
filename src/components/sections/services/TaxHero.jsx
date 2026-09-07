// src/components/sections/services/TaxHero.jsx

import { memo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import AsciiArt from "../../ui/AsciiArt";

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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function TaxHero() {
  return (
    <section
      className="relative w-full min-h-[72vh] md:min-h-[80vh] bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 transform-gpu"
      style={{ contain: "paint layout" }}
    >
      {/* High-Contrast Howrah Cantilever ASCII Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <AsciiArt
          imageSrc="/images/howrah-bridge.webp"
          charSize={8}
          contrast={1.55}
          threshold={0.16}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle Center Readability Aura */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        <div className="w-[520px] sm:w-[700px] h-[300px] sm:h-[400px] rounded-full bg-surface-light/40 dark:bg-surface-dark/90 blur-3xl transition-colors duration-300" />
      </div>

      {/* Hero Typography Overlay */}
      <motion.div
        className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold">
            STATUTORY CONSULTANCY &amp; ADVISORY
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:drop-shadow-none"
        >
          Specialized <br />
          <span className="italic font-light opacity-90">Practices</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark mb-6"
        >
          <ShieldCheck className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
          <span>Matrix Tax Solutions • Partha Pratim Halder</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed"
        >
          Delivering rigorous financial architecture across Direct Tax filings, GST lifecycle management, Scrutiny notice defense, and complete statutory business licensing.
        </motion.p>
      </motion.div>

      {/* Clean Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent pointer-events-none z-[2]" />
    </section>
  );
}

export default memo(TaxHero);