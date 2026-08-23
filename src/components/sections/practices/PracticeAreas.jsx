import { useCallback, useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PRACTICE_AREAS } from "../../../data/practiceData";
import PracticeListItem from "./PracticeListItem";
import PracticeDetailCard from "./PracticeDetailCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export default function PracticeAreas() {
  const [selectedId, setSelectedId] = useState(PRACTICE_AREAS[0]?.id || "constitutional");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const areaQuery = params.get("area");
    if (areaQuery) {
      const match = PRACTICE_AREAS.find(
        (p) =>
          p.ref?.toLowerCase() === areaQuery.toLowerCase() ||
          p.id === areaQuery
      );
      if (match) setSelectedId(match.id);
    }
  }, [location.search]);

  const handleSelect = useCallback((id) => setSelectedId(id), []);

  const activeIndex = useMemo(
    () => PRACTICE_AREAS.findIndex((p) => p.id === selectedId),
    [selectedId]
  );
  const activePractice = PRACTICE_AREAS[activeIndex] || PRACTICE_AREAS[0];
  const refLabel = activePractice.ref || `REF // 0${activeIndex + 1}`;

  return (
    <section
      id="practice-areas"
      className="px-margin-mobile md:px-margin-desktop relative z-20 py-14 sm:py-20 md:py-28 transition-colors duration-300"
    >
      <div className="max-w-container-max-width mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 md:mb-14 gap-3 pb-5 border-b border-theme relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-1.5">
              JURISDICTIONAL PORTFOLIO
            </span>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark tracking-tight leading-tight"
            >
              Practice Areas
            </motion.h2>
          </div>

          <motion.span
            variants={fadeUp}
            className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark"
          >
            APPELLATE & TRIAL PRACTICE
          </motion.span>
        </motion.div>

        {/* 🌟 1. MOBILE/TABLET: Compact 2-Column Button Matrix (No Horizonal Scrolling) */}
        <div className="lg:hidden mb-5 grid grid-cols-2 sm:grid-cols-3 gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-2xl border border-theme">
          {PRACTICE_AREAS.map((practice, index) => {
            const isSelected = practice.id === selectedId;
            const formattedNum = String(index + 1).padStart(2, "0");
            return (
              <button
                key={practice.id}
                type="button"
                onClick={() => handleSelect(practice.id)}
                className={`relative px-3 py-2.5 rounded-xl text-[11px] font-mono tracking-wider uppercase transition-all duration-200 text-center flex items-center justify-center gap-1.5 z-10 ${
                  isSelected
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-md"
                    : "text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                }`}
              >
                <span className="opacity-40 text-[9px]">{formattedNum}.</span>
                <span className="truncate">{practice.title || practice.name}</span>
              </button>
            );
          })}
        </div>

        {/* 🌟 2. Responsive Side-by-Side Viewport */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* DESKTOP: Vertical Interactive Menu */}
          <motion.div
            variants={fadeUp}
            className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-3 h-full"
          >
            {PRACTICE_AREAS.map((practice, index) => (
              <PracticeListItem
                key={practice.id}
                practice={practice}
                index={index}
                isSelected={practice.id === selectedId}
                onSelect={handleSelect}
              />
            ))}
          </motion.div>

          {/* BOTH BREAKPOINTS: Centered Dossier Card */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 h-full flex flex-col"
          >
            <PracticeDetailCard
              activePractice={activePractice}
              refLabel={refLabel}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}