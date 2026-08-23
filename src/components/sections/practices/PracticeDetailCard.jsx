import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, ArrowUpRight } from "lucide-react";

// Image mapping based on practice category/ID
const PRACTICE_BG_MAP = {
  constitutional: "/images/Constitutional Law.webp",
  commercial: "/images/Commercial Law.webp",
  civil: "/images/Civil Law.webp",
  appellate: "/images/Appellate Law.webp",
  regulatory: "/images/Regulatory Law.webp",
};

const getPracticeBg = (practice) => {
  if (!practice) return "/images/Constitutional Law.webp";
  const key = practice.id?.toLowerCase() || "";
  for (const [k, src] of Object.entries(PRACTICE_BG_MAP)) {
    if (key.includes(k) || practice.title?.toLowerCase().includes(k)) {
      return src;
    }
  }
  return practice.image || "/images/Constitutional Law.webp";
};

function PracticeDetailCard({ activePractice, refLabel }) {
  const bgImageSrc = getPracticeBg(activePractice);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePractice.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card border border-theme rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl min-h-[520px] flex flex-col justify-between relative overflow-hidden group"
      >
        {/* 🌟 Dynamic Background Service Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img
            key={`img-${activePractice.id}`}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            src={bgImageSrc}
            alt={activePractice.title}
            className="w-full h-full object-cover object-center select-none"
          />

          {/* Deep multi-stop gradient mask for crisp typographic contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-light/95 via-surface-light/85 to-surface-light/70 dark:from-surface-dark/95 dark:via-surface-dark/85 dark:to-surface-dark/70 backdrop-blur-[2px] transition-colors duration-300" />
        </div>

        {/* 🌟 Content Layer */}
        <div className="relative z-10">
          {/* Reference Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-theme">
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-primary-light dark:text-amber-400">
              {refLabel}
            </span>
            <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
              {activePractice.subtitle}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-primary-light dark:text-primary-dark mb-4 leading-[1.08] tracking-tight">
            {activePractice.title}
          </h3>

          <p className="font-body font-light text-sm sm:text-base leading-relaxed text-secondary-light dark:text-secondary-dark max-w-2xl mb-8">
            {activePractice.description}
          </p>

          {/* Key Dockets & Services List */}
          <div className="pt-2">
            <h4 className="font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase text-primary-light dark:text-primary-dark mb-4">
              KEY DOCKETS & SCOPE
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activePractice.keyServices?.map((service, idx) => (
                <li
                  key={idx}
                  className="font-body font-light text-xs sm:text-sm text-secondary-light dark:text-secondary-dark flex items-center gap-2.5 leading-snug"
                >
                  <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 opacity-90" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🌟 Action & Footer Area */}
        <div className="mt-10 pt-6 border-t border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          {/* Schedule Consultation Button */}
          <Link
            to={`/schedule?area=${activePractice.id}`}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary-light text-surface-light dark:bg-amber-500 dark:text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-black/90 dark:hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl group/btn active:scale-98"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>

          {/* Practice Footnote */}
          <div className="flex items-center justify-between sm:justify-end gap-4 font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
            <span>APEX JUDICIAL BENCH</span>
            <span>•</span>
            <span>EST. 1999</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(PracticeDetailCard);