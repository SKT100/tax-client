// src/components/ui/LoadingScreen.jsx

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LoadingScreen({ stage, progress }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (stage === "idle") return null;

  const curtainEase = [0.83, 0, 0.17, 1];

  const bgClass = isDarkMode
    ? "bg-[#0F0F12] text-white"
    : "bg-[#F2F1ED] text-slate-900";

  const barTrackClass = isDarkMode ? "bg-white/15" : "bg-black/10";

  const barGradientClass = isDarkMode
    ? "bg-gradient-to-r from-slate-400 via-white to-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
    : "bg-gradient-to-r from-slate-800 via-slate-950 to-black shadow-[0_0_8px_rgba(15,23,42,0.2)]";

  const percentAccentClass = isDarkMode ? "text-white/80" : "text-slate-900/80";
  const mottoSubtextClass = isDarkMode ? "text-white/45" : "text-black/45";
  const logoThemeClass = isDarkMode
    ? "brightness-100 opacity-90"
    : "brightness-0 opacity-85";

  const isClosed = stage === "closing" || stage === "counting" || stage === "initial";
  const showContent = stage === "counting" || stage === "initial";

  // Curtain durations tightened: 0.85s/0.45s -> 0.5s/0.35s.
  // Same wipe motion, same easing curve, just doesn't linger.
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden font-sans">

      {/* 1. TOP HALF CURTAIN */}
      <motion.div
        initial={{ y: stage === "initial" ? "0%" : "-100%" }}
        animate={{ y: isClosed ? "0%" : "-100%" }}
        transition={{
          duration: stage === "closing" ? 0.35 : 0.5,
          ease: curtainEase,
        }}
        className={`absolute top-0 left-0 right-0 h-[50vh] ${bgClass} z-20 flex flex-col justify-between p-8 md:p-14 transform-gpu will-change-transform`}
      >
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center w-full"
            >
              <img
                src="/images/Matrix-tax-logo.svg"
                alt="Matrix Tax Solutions"
                width="160"
                height="48"
                className={`h-8 sm:h-10 md:h-11 w-auto object-contain object-left select-none transition-all duration-300 ${logoThemeClass}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. UNIFIED CENTER SEAM PROGRESS TRACK */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 pointer-events-none w-full"
          >
            <div className={`w-full h-[2px] ${barTrackClass} relative overflow-hidden`}>
              <motion.div
                className={`absolute top-0 left-0 bottom-0 ${barGradientClass}`}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.12,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. BOTTOM HALF CURTAIN */}
      <motion.div
        initial={{ y: stage === "initial" ? "0%" : "100%" }}
        animate={{ y: isClosed ? "0%" : "100%" }}
        transition={{
          duration: stage === "closing" ? 0.35 : 0.5,
          ease: curtainEase,
        }}
        className={`absolute bottom-0 left-0 right-0 h-[50vh] ${bgClass} flex items-end justify-between p-8 md:p-14 z-20 transform-gpu will-change-transform`}
      >
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.15 }}
              className={`font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase ${mottoSubtextClass} hidden sm:flex flex-col gap-1`}
            >
              <span>ন্যায্য করদান • বিধিবদ্ধ দায়বদ্ধতা</span>
              <span className="opacity-60 text-[9px]">WHERE THERE IS DHARMA, THERE IS VICTORY</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="flex items-baseline gap-1.5 font-serif leading-none ml-auto text-primary-light dark:text-primary-dark"
            >
              <span className="text-7xl sm:text-9xl md:text-[10.5rem] font-light tracking-tighter tabular-nums">
                {progress}
              </span>
              <span className={`font-mono text-xl sm:text-2xl md:text-3xl ${percentAccentClass} font-normal`}>
                %
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default memo(LoadingScreen);