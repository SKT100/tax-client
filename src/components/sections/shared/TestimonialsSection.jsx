import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "../../../data/testimonialData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TestimonialsSection({
  heading = "Client Endorsements & Statutory Trust",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = TESTIMONIALS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const currentReview = TESTIMONIALS[currentIndex];
  const nextReview = TESTIMONIALS[(currentIndex + 1) % totalSlides];

  return (
    <section className="px-margin-mobile md:px-margin-desktop relative z-20 py-20 sm:py-28 md:py-36 transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-2">
            PROVEN TRACK RECORD
          </span>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark tracking-tight leading-tight"
          >
            {heading}
          </motion.h2>
        </motion.div>

        {/* Master Testimonial Grid */}
        <div className="glass-card border border-theme rounded-2xl md:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl transition-all duration-300 h-auto sm:h-[460px] md:h-[420px] lg:h-[400px]">
          
          {/* LEFT FIXED PANEL */}
          <div className="lg:col-span-4 p-8 sm:p-10 md:p-12 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-theme bg-black/[0.02] dark:bg-white/[0.02] h-full">
            <div className="w-full flex flex-col items-center">
              <div className="font-serif text-7xl sm:text-8xl md:text-[6.5rem] font-light tracking-tight text-primary-light dark:text-primary-dark leading-none mb-4">
                4.9
              </div>

              {/* Monochrome Filled Stars */}
              <div className="flex items-center gap-1.5 mb-3 text-primary-light dark:text-primary-dark">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-500 text-amber-500 opacity-90"
                  />
                ))}
              </div>

              <div className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary-light dark:text-primary-dark mb-1">
                500+ Filings &amp; Audits
              </div>

              <p className="font-mono text-[11px] tracking-wider uppercase text-secondary-light dark:text-secondary-dark">
                Direct Tax • GST • Scrutiny Defense • MSME
              </p>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch h-full">
              
              {/* Card 1 */}
              <div className="relative flex flex-col justify-between h-full w-full min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div className="flex-1 flex items-start overflow-hidden mb-4">
                      <blockquote className="font-serif text-lg sm:text-xl font-light text-primary-light dark:text-primary-dark leading-relaxed line-clamp-6">
                        “{currentReview.quote}”
                      </blockquote>
                    </div>

                    <div className="pt-4 border-t border-theme h-[76px] flex items-center gap-3.5 shrink-0 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-surface-dark/5 dark:bg-surface-light/10 border border-theme flex items-center justify-center font-mono text-xs font-semibold text-primary-light dark:text-primary-dark shrink-0">
                        {currentReview.initials}
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="font-serif text-base font-normal text-primary-light dark:text-primary-dark leading-snug truncate">
                          {currentReview.author}
                        </h4>
                        <p className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase leading-tight mt-0.5 text-secondary-light dark:text-secondary-dark truncate">
                          {currentReview.role} •{" "}
                          <span className="opacity-75">
                            {currentReview.organization}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card 2 (Desktop) */}
              <div className="hidden md:flex relative flex-col justify-between h-full w-full min-h-0 border-l border-theme pl-8 lg:pl-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={nextReview.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.05,
                    }}
                    className="flex flex-col justify-between h-full w-full"
                  >
                    <div className="flex-1 flex items-start overflow-hidden mb-4">
                      <blockquote className="font-serif text-lg sm:text-xl font-light text-primary-light dark:text-primary-dark leading-relaxed line-clamp-6">
                        “{nextReview.quote}”
                      </blockquote>
                    </div>

                    <div className="pt-4 border-t border-theme h-[76px] flex items-center gap-3.5 shrink-0 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-surface-dark/5 dark:bg-surface-light/10 border border-theme flex items-center justify-center font-mono text-xs font-semibold text-primary-light dark:text-primary-dark shrink-0">
                        {nextReview.initials}
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="font-serif text-base font-normal text-primary-light dark:text-primary-dark leading-snug truncate">
                          {nextReview.author}
                        </h4>
                        <p className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase leading-tight mt-0.5 text-secondary-light dark:text-secondary-dark truncate">
                          {nextReview.role} •{" "}
                          <span className="opacity-75">
                            {nextReview.organization}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-12 h-12 rounded-xl glass-card border border-theme flex items-center justify-center text-primary-light dark:text-primary-dark hover:bg-primary-light hover:text-surface-light dark:hover:bg-primary-dark dark:hover:text-primary-light transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-12 h-12 rounded-xl glass-card border border-theme flex items-center justify-center text-primary-light dark:text-primary-dark hover:bg-primary-light hover:text-surface-light dark:hover:bg-primary-dark dark:hover:text-primary-light transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}