// src/components/sections/services/TaxHero.jsx

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import ParticleImage from "../../ui/ParticleImage";

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

export default function TaxHero() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [particleScale, setParticleScale] = useState(0.62);
  const heroRef = useRef(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    const handleResize = () => {
      // Larger footprint across viewports to frame the hero title cleanly
      setParticleScale(window.innerWidth < 768 ? 0.78 : 0.62);
    };

    checkTheme();
    handleResize();

    window.addEventListener("resize", handleResize);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[78vh] md:min-h-[85vh] bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 flex items-center justify-center overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28 transform-gpu"
      style={{ contain: "paint layout" }}
    >
      {/* 🌟 High-Visibility, Low-Overhead Rupee Particle Field */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-95 dark:opacity-90 pointer-events-auto transition-opacity duration-500">
        <ParticleImage
          key={`hero-particle-${particleScale}-${isDarkMode ? "dark" : "light"}`}
          imageSrc="/images/rupee-bg.webp"
          /* 2.2px dot size gives bold definition without needing high particle counts */
          particleSize={2.2}
          density={2.5}
          /* Deep ink-black in light mode, brilliant platinum in dark mode */
          color={isDarkMode ? "#F8FAFC" : "#090A0F"}
          highlightColor={isDarkMode ? "#FBBF24" : "#B45309"}
          scatter={140}
          gatherDuration={1300}
          pointerRepel={40}
          repelRadius={120}
          idleDrift={0.3}
          scalePercent={particleScale}
          /* Capped at 1,100 particles for sub-1ms draw times */
          maxParticles={1100}
          className="w-full h-full cursor-crosshair"
        />
      </div>

      {/* 🌟 Subtle Ambient Under-Glow (Keeps text legible without washing out particles) */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        <div className="w-[520px] sm:w-[680px] h-[320px] sm:h-[420px] rounded-full bg-surface-light/20 dark:bg-[#0F0F12]/75 blur-3xl transition-colors duration-300" />
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
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold">
            STATUTORY CONSULTANCY & ADVISORY
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:drop-shadow-none"
        >
          Specialized <br />
          <span className="italic font-light opacity-90">Practices</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark mb-7"
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