import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import ParticleImage from '../../ui/ParticleImage';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

export default function PracticesHero() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[85vh] bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 flex items-center justify-center overflow-hidden pt-36 md:pt-44 pb-24 md:pb-32 transform-gpu"
      style={{ contain: 'paint layout' }}
    >
      {/* 🌟 Full-Screen Particle Monument Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-75 dark:opacity-90 pointer-events-auto">
        <ParticleImage
          imageSrc="/images/pillar-bg.png"
          particleSize={1.9}
          density={3.0}
          color={isDarkMode ? '#E2E8F0' : '#475569'}
          highlightColor="#D4AF37"
          scatter={180}
          gatherDuration={1600}
          pointerRepel={50}
          repelRadius={140}
          idleDrift={0.65}
          scalePercent={1.2}
          className="w-full h-full cursor-crosshair"
        />
      </div>

      {/* 🌟 Circular Soft Highlight Backdrop Mask */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        <div className="w-[620px] sm:w-[780px] h-[380px] sm:h-[460px] rounded-full bg-surface-light/85 dark:bg-[#121212]/85 blur-3xl transition-colors duration-300" />
      </div>

      {/* Hero Typography Overlay (pointer-events-none lets cursor pass through to particles) */}
      <motion.div 
        className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-white/60 font-bold">
            PRACTICE AREAS & DOCKETS
          </span>
        </motion.div>

        <motion.h1 
          variants={fadeUp} 
          className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-6"
        >
          Areas of <br />
          <span className="italic font-light opacity-90">Expertise</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark mb-8">
          <Award className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
          <span>Advocate on Record — Supreme Court of India</span>
        </motion.div>

        <motion.p 
          variants={fadeUp} 
          className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed"
        >
          Delivering rigorous legal architecture across constitutional appeals, commercial arbitrations, public sector representations, and complex appellate litigation before apex judicial bodies.
        </motion.p>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent pointer-events-none z-[2]" />
    </section>
  );
}