import { memo } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const ROMAN_NUMERALS = ["I.", "II.", "III."];

function PrecedentCard({ matter, idx }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass-card border border-theme rounded-2xl md:rounded-3xl p-7 md:p-9 flex flex-col justify-between gap-8 transition-all duration-500 hover:border-black/20 dark:hover:border-white/30 hover:-translate-y-1 group relative overflow-hidden shadow-xl"
    >
      {/* Roman Numeral Watermark */}
      <div className="absolute top-3 right-5 font-serif text-6xl md:text-7xl font-bold text-primary-light/5 dark:text-primary-dark/5 pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-15">
        {ROMAN_NUMERALS[idx] || matter.number}
      </div>

      <div className="relative z-10">
        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark block mb-3">
          {matter.category}
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-light text-primary-light dark:text-primary-dark leading-[1.15] mb-3.5">
          {matter.title}
        </h3>

        <p className="font-body font-light text-sm text-secondary-light dark:text-secondary-dark leading-relaxed">
          {matter.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-theme font-mono text-[10px] sm:text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark flex items-center justify-between relative z-10">
        <span>APPELLATE BENCH</span>
      </div>
    </motion.div>
  );
}

export default memo(PrecedentCard);