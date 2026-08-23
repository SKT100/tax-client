import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { Award } from "lucide-react";
import { HERO_CREDENTIALS } from "../../../data/aboutData";

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
      
      {/* 🌟 1. HIGH-CONTRAST MOBILE/TABLET BACKDROP PORTRAIT (< lg screens) */}
      <div className="absolute top-0 right-0 w-full sm:w-[85%] h-[560px] sm:h-[650px] lg:hidden pointer-events-none z-0 overflow-hidden">
        <img
          loading="eager"
          decoding="async"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZqLAqmbMJopceJbPHX8Q7xaYObaUAuC6yopOEg3OOXo6SbxIBD6k_pDjKPSBudIOHs3rX3JzYGPJKrCMCrOhPQFNUfw0kt0wMXa9pjb-LhYQJurlqCtsZRtvCN2BY-BvcuD_OiQq43U80pCUCLn9ZAutDWppJ2R8IPcGM921bgnbH0ATxg_T0_CoiZ0VCD_2LHMZUM7Kls1pGVPmjaZB3SWF0X-G70CVCcx8yxWxeQJzl27iZmJNr"
          alt="Satyendra Agrawal Backdrop"
          className="w-full h-full object-cover object-[82%_top] filter grayscale contrast-125 brightness-95 opacity-75 dark:opacity-65 dark:brightness-90 transition-opacity duration-300"
        />
        
        {/* Calibrated Multi-Stop Fades for Text Legibility in Both Modes */}
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
        {/* LEFT COLUMN: Narrative & Credentials */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center gap-5 z-20">
          
          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.92] sm:leading-[0.98] font-light tracking-tight text-primary-light dark:text-primary-dark"
          >
            Satyendra <br />
            <span className="italic font-light opacity-90">Agrawal</span>
          </motion.h1>

          {/* Subhead Designation */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark"
          >
            <Award className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
            <span>Advocate on Record — Supreme Court of India</span>
          </motion.div>

          {/* Strategic Narrative */}
          <motion.div
            variants={fadeUp}
            className="font-body font-light text-base md:text-lg leading-relaxed text-secondary-light dark:text-secondary-dark space-y-3.5 max-w-2xl"
          >
            <p>
              With over 25 years at the Bar, Satyendra Agrawal has cultivated a
              practice defined by meticulous research and strategic foresight.
              As an Advocate on Record at the Supreme Court of India, his
              journey spans from the historic halls of the Calcutta High Court to
              the apex judicial body of the nation.
            </p>
            <p>
              His approach transcends mere litigation; it is an exercise in
              legal architecture, building cases on the bedrock of
              constitutional principles and evolving jurisprudence.
            </p>
          </motion.div>

          {/* Academic Pedigree Anchor Container */}
          <motion.div
            id="pedigree"
            variants={fadeUp}
            className="pt-4 border-t border-theme max-w-2xl scroll-mt-28"
          >
            <span className="font-mono text-xs tracking-widest text-primary-light dark:text-primary-dark uppercase font-bold block mb-2.5">
              ACADEMIC PEDIGREE
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {HERO_CREDENTIALS.map((cred, idx) => (
                <span key={idx} className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold tracking-widest text-primary-light dark:text-primary-dark">
                    {cred}
                  </span>
                  {idx < HERO_CREDENTIALS.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-obsidian/20 dark:bg-white/20" />
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Member Cards */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-4 max-w-md pt-2"
          >
            {/* Card 1: ICJ London */}
            <div className="relative aspect-square p-6 rounded-xl glass-card border-theme flex flex-col justify-end overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/30 group">
              <div className="absolute -right-6 -top-6 w-[143px] opacity-15 dark:opacity-25 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/icj-logo.png"
                  alt="International Council of Jurists Logo"
                  className="w-full h-full object-contain filter mix-blend-multiply dark:mix-blend-screen dark:invert"
                />
              </div>
              <div className="relative z-10">
                <h3 className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-primary-light dark:text-primary-dark mb-1">
                  OFFICIAL MEMBER
                </h3>
                <p className="font-body font-light text-xs text-secondary-light dark:text-secondary-dark leading-snug">
                  International Council of Jurists, London
                </p>
              </div>
            </div>

            {/* Card 2: Calcutta High Court Bar */}
            <div className="relative aspect-square p-6 rounded-xl glass-card border-theme flex flex-col justify-end overflow-hidden transition-all duration-300 hover:border-black/20 dark:hover:border-white/30 group">
              <div className="absolute -right-6 -top-6 w-[157px] opacity-15 dark:opacity-25 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/calcutta-high-court-logo.png"
                  alt="Bar Association High Court at Calcutta Logo"
                  className="w-full h-full object-contain filter mix-blend-multiply dark:mix-blend-screen dark:invert"
                />
              </div>
              <div className="relative z-10">
                <h3 className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-primary-light dark:text-primary-dark mb-1">
                  OFFICIAL MEMBER
                </h3>
                <p className="font-body font-light text-xs text-secondary-light dark:text-secondary-dark leading-snug">
                  Bar Association, High Court at Calcutta
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile Quote Card */}
          <motion.div
            variants={fadeUp}
            className="lg:hidden glass-card p-5 rounded-xl border border-theme max-w-md mt-2 shadow-lg"
          >
            <Award className="w-4 h-4 text-primary-light dark:text-primary-dark mb-2" />
            <p className="font-serif italic text-xs sm:text-sm text-primary-light dark:text-primary-dark leading-snug">
              "Legal precision is the foundation of institutional trust."
            </p>
          </motion.div>
        </div>

        {/* 🌟 2. DESKTOP INTERACTIVE COLOR LENS PORTRAIT (`hidden lg:flex`) */}
        <div className="hidden lg:flex w-full lg:w-[45%] relative min-h-[640px] items-center justify-center">
          <motion.div
            ref={portraitRef}
            variants={fadeUp}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full rounded-theme overflow-hidden glass-card shadow-2xl cursor-crosshair select-none"
          >
            {/* Base Grayscale Portrait */}
            <img
              loading="lazy"
              decoding="async"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZqLAqmbMJopceJbPHX8Q7xaYObaUAuC6yopOEg3OOXo6SbxIBD6k_pDjKPSBudIOHs3rX3JzYGPJKrCMCrOhPQFNUfw0kt0wMXa9pjb-LhYQJurlqCtsZRtvCN2BY-BvcuD_OiQq43U80pCUCLn9ZAutDWppJ2R8IPcGM921bgnbH0ATxg_T0_CoiZ0VCD_2LHMZUM7Kls1pGVPmjaZB3SWF0X-G70CVCcx8yxWxeQJzl27iZmJNr"
              alt="Satyendra Agrawal Grayscale"
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZqLAqmbMJopceJbPHX8Q7xaYObaUAuC6yopOEg3OOXo6SbxIBD6k_pDjKPSBudIOHs3rX3JzYGPJKrCMCrOhPQFNUfw0kt0wMXa9pjb-LhYQJurlqCtsZRtvCN2BY-BvcuD_OiQq43U80pCUCLn9ZAutDWppJ2R8IPcGM921bgnbH0ATxg_T0_CoiZ0VCD_2LHMZUM7Kls1pGVPmjaZB3SWF0X-G70CVCcx8yxWxeQJzl27iZmJNr"
                alt="Satyendra Agrawal Color Lens"
                className="w-full h-full object-cover object-top filter-none brightness-100 contrast-100"
              />
            </motion.div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/90 via-surface-dark/30 to-transparent hidden dark:block pointer-events-none z-10" />

            {/* Desktop Quote Badge */}
            <div className="absolute bottom-6 right-6 glass-card p-6 rounded-theme max-w-xs shadow-2xl z-20 pointer-events-auto">
              <Award className="w-5 h-5 text-primary-light dark:text-primary-dark mb-2" />
              <p className="font-serif italic text-sm text-primary-light dark:text-primary-dark leading-snug">
                "Legal precision is the foundation of institutional trust."
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}