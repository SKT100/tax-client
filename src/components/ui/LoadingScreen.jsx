import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ stage, progress }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Dynamic theme observer
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (stage === 'idle') return null;

  // Luxury split curtain easing curve
  const curtainEase = [0.76, 0, 0.24, 1];

  // Theme styling
  const bgClass = isDarkMode
    ? "bg-[#0F0F12] text-white border-white/10"
    : "bg-[#FAFDEE] text-[#1A1A1A] border-black/10";

  const barBgClass = isDarkMode ? "bg-white/10" : "bg-black/10";
  const subtextClass = isDarkMode ? "text-white/50" : "text-black/50";
  const accentClass = isDarkMode ? "text-amber-400" : "text-amber-600";

  const isClosed = stage === 'closing' || stage === 'counting' || stage === 'initial';
  const showContent = stage === 'counting' || stage === 'initial';

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden font-sans">
      
      {/* 🌟 1. TOP HALF CURTAIN (Slides DOWN to close, UP to open) */}
      <motion.div
        initial={{ y: stage === 'initial' ? "0%" : "-100%" }}
        animate={{ y: isClosed ? "0%" : "-100%" }}
        transition={{ 
          duration: stage === 'closing' ? 0.45 : 0.8, 
          ease: curtainEase 
        }}
        className={`absolute top-0 left-0 right-0 h-[50vh] ${bgClass} border-b z-20 transform-gpu will-change-transform`}
      />

      {/* 🌟 2. CENTER SEAM PROGRESS BAR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 pointer-events-none w-full"
      >
        <div className={`w-full h-[2px] ${barBgClass} relative overflow-hidden`}>
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.85)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.05 }}
          />
        </div>
      </motion.div>

      {/* 🌟 3. BOTTOM HALF CURTAIN (Slides UP to close, DOWN to open) */}
      <motion.div
        initial={{ y: stage === 'initial' ? "0%" : "100%" }}
        animate={{ y: isClosed ? "0%" : "100%" }}
        transition={{ 
          duration: stage === 'closing' ? 0.45 : 0.8, 
          ease: curtainEase 
        }}
        className={`absolute bottom-0 left-0 right-0 h-[50vh] ${bgClass} border-t flex items-end justify-between p-8 md:p-14 z-20 transform-gpu will-change-transform`}
      >
        {/* Sanskrit Maxim */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className={`font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase ${subtextClass} hidden sm:block`}
        >
          यतो धर्मस्ततो जयः • WHERE THERE IS DHARMA, THERE IS VICTORY
        </motion.div>

        {/* Large Counter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-baseline gap-1 font-serif leading-none ml-auto"
        >
          <span className="text-7xl sm:text-9xl md:text-[11rem] font-light tracking-tighter tabular-nums">
            {progress}
          </span>
          <span className={`font-mono text-xl sm:text-2xl md:text-3xl ${accentClass} font-normal`}>
            %
          </span>
        </motion.div>
      </motion.div>

    </div>
  );
}