// src/components/sections/about/ComplianceVault.jsx

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { FileText, Download, ChevronDown } from "lucide-react";
import { TAX_COMPLIANCE_VAULT } from "../../../data/taxData";
import PillButton from "../../ui/PillButton";

export default function ComplianceVault() {
  const [activeTab, setActiveTab] = useState(
    TAX_COMPLIANCE_VAULT[0]?.category || ""
  );
  const activeCategory = TAX_COMPLIANCE_VAULT.find(
    (cat) => cat.category === activeTab
  );

  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  // Dynamic Scroll Expansion
  const cardWidth = useTransform(smoothProgress, [0.08, 0.44], ["86vw", "100vw"]);
  const cardHeight = useTransform(smoothProgress, [0.08, 0.44], ["46vh", "100vh"]);
  const cardMaxWidth = useTransform(smoothProgress, [0.08, 0.44], ["540px", "100vw"]);
  const cardMaxHeight = useTransform(smoothProgress, [0.08, 0.44], ["370px", "100vh"]);
  const cardBorderRadius = useTransform(smoothProgress, [0.08, 0.44], ["24px", "0px"]);
  const cardBorderColor = useTransform(
    smoothProgress,
    [0.08, 0.44],
    ["rgba(255,255,255,0.12)", "rgba(0,0,0,0)"]
  );

  const hintOpacity = useTransform(smoothProgress, [0.02, 0.12], [1, 0]);

  const headerY = useTransform(smoothProgress, [0.15, 0.48], ["0px", "0px"]);
  const headerScale = useTransform(smoothProgress, [0.15, 0.48], [1.03, 1]);
  const dividerOpacity = useTransform(smoothProgress, [0.38, 0.52], [0, 1]);

  const tabsOpacity = useTransform(smoothProgress, [0.46, 0.62], [0, 1]);
  const tabsScale = useTransform(smoothProgress, [0.46, 0.62], [0.95, 1]);

  const gridOpacity = useTransform(smoothProgress, [0.52, 0.70], [0, 1]);
  const gridScale = useTransform(smoothProgress, [0.52, 0.70], [0.96, 1]);

  const footerOpacity = useTransform(smoothProgress, [0.62, 0.80], [0, 1]);
  const footerY = useTransform(smoothProgress, [0.62, 0.80], [12, 0]);

  return (
    <div id="compliance-vault" ref={trackRef} className="relative h-[280vh] md:h-[300vh] w-full">
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20">
        
        {/* Inverted Card Structure */}
        <motion.div
          style={{
            width: cardWidth,
            height: cardHeight,
            maxWidth: cardMaxWidth,
            maxHeight: cardMaxHeight,
            borderRadius: cardBorderRadius,
            borderColor: cardBorderColor,
          }}
          className="relative bg-surface-dark text-white dark:bg-surface-light dark:text-primary-light border border-white/10 dark:border-black/15 shadow-[0_25px_60px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col justify-between origin-center will-change-transform min-w-[290px] min-h-[330px] transition-colors duration-300"
        >
          {/* Subtle Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-black/30 dark:from-black/[0.02] dark:via-transparent dark:to-black/[0.06]" />

          {/* Scroll Prompt */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 dark:text-black/50 font-mono text-[9px] sm:text-xs tracking-widest uppercase pointer-events-none z-30"
          >
            <span>SCROLL TO OPEN</span>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce" />
          </motion.div>

          {/* Vault Inner Workspace */}
          <div className="relative z-20 w-full h-full flex flex-col justify-between px-4 sm:px-8 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 max-w-5xl mx-auto">
            
            <div className="w-full flex flex-col justify-start">
              
              {/* Header */}
              <motion.div
                style={{
                  y: headerY,
                  scale: headerScale,
                }}
                className="text-center will-change-transform origin-center flex flex-col items-center shrink-0 mb-1"
              >
                <span className="font-mono font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase text-white/60 dark:text-secondary-light block mb-1.5">
                  INSTITUTIONAL TRUST
                </span>
                
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white dark:text-primary-light leading-tight tracking-tight">
                  The Tax &amp; Compliance Vault
                </h2>

                <motion.div
                  style={{ opacity: dividerOpacity }}
                  className="h-px w-10 sm:w-12 bg-white/20 dark:bg-black/20 mx-auto mt-2 sm:mt-3"
                />
              </motion.div>

              {/* Category Filter Pills */}
              <motion.div
                style={{
                  opacity: tabsOpacity,
                  scale: tabsScale,
                }}
                className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-3 sm:mt-5 md:mt-6 mb-3 sm:mb-5 md:mb-6 shrink-0"
              >
                {TAX_COMPLIANCE_VAULT.map((cat) => {
                  const isActive = activeTab === cat.category;
                  return (
                    <button
                      key={cat.category}
                      type="button"
                      onClick={() => setActiveTab(cat.category)}
                      className={`px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-mono font-semibold text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase transition-all duration-300 border active:scale-95 cursor-pointer ${
                        isActive
                          ? "bg-white text-slate-950 border-white shadow-md dark:bg-primary-light dark:text-surface-light dark:border-primary-light"
                          : "bg-white/[0.05] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.1] hover:border-white/25 dark:bg-black/[0.04] dark:border-black/10 dark:text-secondary-light dark:hover:text-primary-light dark:hover:bg-black/[0.08] dark:hover:border-black/25"
                      }`}
                    >
                      {cat.category}
                    </button>
                  );
                })}
              </motion.div>

              {/* Compliance Grid */}
              <motion.div
                style={{
                  opacity: gridOpacity,
                  scale: gridScale,
                }}
                className="w-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full"
                  >
                    {activeCategory?.items.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 sm:p-3.5 md:p-4 bg-white/[0.06] dark:bg-black/[0.04] rounded-lg sm:rounded-xl border border-white/10 dark:border-black/10 items-center shadow-sm hover:border-white/30 dark:hover:border-black/30 hover:bg-white/[0.1] dark:hover:bg-black/[0.08] transition-all min-h-[42px] sm:min-h-[50px] md:min-h-[58px] ${
                          idx >= 7 ? "hidden sm:flex" : "flex"
                        }`}
                      >
                        <h3 className="font-body font-normal text-xs sm:text-sm text-white/90 dark:text-primary-light leading-snug">
                          {item}
                        </h3>
                      </div>
                    ))}

                    {/* Mobile Cap Indicator */}
                    {activeCategory && activeCategory.items.length > 7 && (
                      <div className="sm:hidden p-2.5 bg-white/[0.03] dark:bg-black/[0.03] rounded-lg border border-dashed border-white/20 dark:border-black/20 flex items-center justify-center text-center min-h-[42px]">
                        <span className="font-mono text-[10px] text-white/60 dark:text-secondary-light tracking-wider uppercase">
                          + {activeCategory.items.length - 7} More in Vault
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bottom Action Bar */}
            <motion.div
              style={{
                opacity: footerOpacity,
                y: footerY,
              }}
              className="pt-4 sm:pt-5 border-t border-white/10 dark:border-black/10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0 mt-4 sm:mt-6"
            >
              <div className="flex items-center gap-3 md:gap-4 text-center sm:text-left">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white dark:text-primary-light shrink-0 hidden xs:block" />
                <div>
                  <h3 className="font-serif text-sm sm:text-lg md:text-xl font-light text-white dark:text-primary-light leading-tight">
                    Download Tax Compliance Checklist &amp; Fee Structure
                  </h3>
                  <p className="font-body font-light text-[10px] sm:text-xs text-white/60 dark:text-secondary-light hidden sm:block">
                    Complete official brief featuring statutory filing schedules and documentation guidelines
                  </p>
                </div>
              </div>

              <a
                href="/docs/Matrix_Tax_Compliance_Checklist.pdf"
                download="Matrix_Tax_Compliance_Checklist.pdf"
                className="shrink-0 w-full sm:w-auto no-underline"
              >
                <PillButton
                  variant="custom"
                  bgClass="bg-white text-slate-950 dark:bg-slate-950 dark:text-white shadow-md"
                  borderClass="border border-white dark:border-slate-950"
                  fillClass="bg-slate-950 dark:bg-white"
                  hoverTextClass="text-slate-950 group-hover:text-white dark:text-white dark:group-hover:text-slate-950"
                  className="w-full sm:w-auto justify-center text-xs py-2.5 px-5 sm:py-3 sm:px-6 shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <span>Download PDF</span>
                    <Download className="w-3.5 h-3.5" />
                  </span>
                </PillButton>
              </a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}