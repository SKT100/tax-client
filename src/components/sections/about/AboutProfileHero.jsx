// src/components/sections/about/AboutProfileHero.jsx

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { Award } from "lucide-react";

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

const PRACTICE_STANDARDS = [
  "STATUTORY PRECISION",
  "STRICT CONFIDENTIALITY",
  "AUDIT-READY",
];

export default function AboutProfileHero() {
  const portraitRef = useRef(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const radius = useMotionValue(0);

  const lensClipPath = useMotionTemplate`circle(${radius}px at ${mouseX}px ${mouseY}px)`;

  const handleMouseEnter = (e) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    animate(radius, 120, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
  };

  let rAF = null;
  const handleMouseMove = (e) => {
    if (!portraitRef.current) return;
    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      const rect = portraitRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    });
  };

  const handleMouseLeave = () => {
    if (rAF) cancelAnimationFrame(rAF);
    animate(radius, 0, { duration: 0.25, ease: "easeIn" });
  };

  return (
    <section className="relative w-full bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 overflow-hidden pt-12 md:pt-16 lg:pt-20 pb-12">
      
      {/* 🌟 1. Mobile/Tablet Backdrop Portrait (High Priority LCP) */}
      <div className="absolute top-0 right-0 w-full sm:w-[85%] h-[560px] sm:h-[650px] lg:hidden pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/pritam-img.webp"
          alt="Partha Pratim Halder Backdrop"
          width="600"
          height="650"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-[82%_top] filter grayscale contrast-125 brightness-95 opacity-75 dark:opacity-65 dark:brightness-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-light/50 to-surface-light dark:via-surface-dark/50 dark:to-surface-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-light/90 via-surface-light/40 to-transparent dark:from-surface-dark/90 dark:via-surface-dark/40" />
      </div>

      {/* Main Split Container */}
      <motion.div
        className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14 relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Left Column: Narrative & Credentials */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center gap-5 z-20">
          
          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.92] sm:leading-[0.98] font-light tracking-tight text-primary-light dark:text-primary-dark"
          >
            Partha Pratim <br />
            <span className="italic font-light opacity-90">Halder</span>
          </motion.h1>

          {/* Subhead Designation */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark"
          >
            <Award className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
            <span>GST &amp; Tax Consultant — 10+ Years Experience</span>
          </motion.div>

          {/* Strategic Narrative */}
          <motion.div
            variants={fadeUp}
            className="font-body font-light text-base md:text-lg leading-relaxed text-secondary-light dark:text-secondary-dark space-y-3.5 max-w-2xl"
          >
            <p>
              With over a decade of hands-on practice in taxation, bookkeeping, and
              statutory advisory, Partha Pratim Halder founded Matrix Tax Solutions
              to deliver uncompromising accuracy, speed, and complete peace of mind.
            </p>
            <p>
              His practice focuses on end-to-end statutory defense—protecting businesses
              and individuals from procedural non-compliance, securing legitimate input tax
              credits, and optimizing tax liabilities within the letter of the law.
            </p>
          </motion.div>

          {/* Practice Benchmarks */}
          <motion.div
            id="pedigree"
            variants={fadeUp}
            className="pt-4 border-t border-theme max-w-2xl scroll-mt-28"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-secondary-light dark:text-secondary-dark uppercase font-semibold block mb-2">
              STATUTORY BENCHMARKS
            </span>
            <div className="flex items-center gap-2.5 whitespace-nowrap overflow-hidden">
              {PRACTICE_STANDARDS.map((standard, idx) => (
                <span key={idx} className="flex items-center gap-2.5">
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-primary-light dark:text-primary-dark">
                    {standard}
                  </span>
                  {idx < PRACTICE_STANDARDS.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-primary-light/30 dark:bg-primary-dark/30 shrink-0" />
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Practice Badges */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-4 max-w-md pt-2"
          >
            {/* Card 1: GST Practitioner */}
            <div className="relative aspect-square p-5 sm:p-6 rounded-2xl glass-card border border-theme flex flex-col justify-end overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 group">
              <div className="absolute -right-6 -top-6 w-36 h-36 sm:w-40 sm:h-40 opacity-[0.08] dark:opacity-[0.12] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6">
                <img
                  loading="lazy"
                  decoding="async"
                  width="160"
                  height="160"
                  src="/images/seal.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain filter grayscale invert dark:invert-0"
                />
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark block mb-1">
                  INDIRECT TAX STANDING
                </span>
                <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-primary-light dark:text-primary-dark mb-1">
                  GST PRACTITIONER
                </h3>
                <p className="font-body font-light text-[11px] sm:text-xs text-secondary-light dark:text-secondary-dark leading-tight">
                  Authorized E-Filing &amp; SCN Legal Defense
                </p>
              </div>
            </div>

            {/* Card 2: Tax Practitioner */}
            <div className="relative aspect-square p-5 sm:p-6 rounded-2xl glass-card border border-theme flex flex-col justify-end overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 group">
              <div className="absolute -right-6 -top-6 w-36 h-36 sm:w-40 sm:h-40 opacity-[0.08] dark:opacity-[0.12] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-6">
                <img
                  loading="lazy"
                  decoding="async"
                  width="160"
                  height="160"
                  src="/images/seal.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain filter grayscale invert dark:invert-0"
                />
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark block mb-1">
                  DIRECT TAX NETWORK
                </span>
                <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-primary-light dark:text-primary-dark mb-1">
                  TAX PRACTITIONER
                </h3>
                <p className="font-body font-light text-[11px] sm:text-xs text-secondary-light dark:text-secondary-dark leading-tight">
                  Income Tax E-Filing &amp; Scrutiny Management
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile Quote Card */}
          <motion.div
            variants={fadeUp}
            className="lg:hidden glass-card p-5 rounded-2xl border border-theme max-w-md mt-2 shadow-lg"
          >
            <Award className="w-4 h-4 text-primary-light dark:text-primary-dark mb-2" />
            <p className="font-serif italic text-xs sm:text-sm text-primary-light dark:text-primary-dark leading-snug">
              &ldquo;Accurate Advice, Proper Compliance, Complete Peace of Mind.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* 🌟 2. Desktop Interactive Color Lens Portrait */}
        <div className="hidden lg:flex w-full lg:w-[45%] relative min-h-[640px] items-center justify-center">
          <motion.div
            ref={portraitRef}
            variants={fadeUp}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full rounded-3xl overflow-hidden glass-card shadow-2xl cursor-crosshair select-none"
          >
            {/* Base Grayscale Portrait */}
            <img
              loading="lazy"
              decoding="async"
              width="600"
              height="750"
              src="/images/pritam-img.webp"
              alt="Partha Pratim Halder Grayscale"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90"
            />

            {/* Color Lens Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ clipPath: lensClipPath }}
            >
              <img
                loading="lazy"
                decoding="async"
                width="600"
                height="750"
                src="/images/pritam-img.webp"
                alt="Partha Pratim Halder Color Lens"
                className="w-full h-full object-cover object-top filter-none brightness-100 contrast-100"
              />
            </motion.div>

            {/* Dark Mode Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/90 via-surface-dark/30 to-transparent hidden dark:block pointer-events-none z-10" />

            {/* Desktop Quote Badge */}
            <div className="absolute bottom-6 right-6 glass-card p-6 rounded-2xl max-w-xs shadow-2xl z-20 pointer-events-auto border border-theme">
              <Award className="w-5 h-5 text-primary-light dark:text-primary-dark mb-2" />
              <p className="font-serif italic text-sm text-primary-light dark:text-primary-dark leading-snug">
                &ldquo;Accurate Advice, Proper Compliance, Complete Peace of Mind.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}