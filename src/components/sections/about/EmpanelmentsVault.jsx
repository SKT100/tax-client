import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { FileText, Download, ChevronDown } from "lucide-react";
import { EMPANELMENTS } from "../../../data/aboutData";
import PillButton from "../../ui/PillButton";

export default function EmpanelmentsVault() {
  const [activeTab, setActiveTab] = useState(EMPANELMENTS[0]?.category || "");
  const activeCategory = EMPANELMENTS.find((cat) => cat.category === activeTab);

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

  // 🌟 1. Compact Squarish-Rectangular Proportions on Desktop (Expands to 100vw × 100vh on scroll)
  const cardWidth = useTransform(smoothProgress, [0.08, 0.44], ["86vw", "100vw"]);
  const cardHeight = useTransform(smoothProgress, [0.08, 0.44], ["46vh", "100vh"]);
  const cardMaxWidth = useTransform(smoothProgress, [0.08, 0.44], ["540px", "100vw"]);
  const cardMaxHeight = useTransform(smoothProgress, [0.08, 0.44], ["370px", "100vh"]);
  const cardBorderRadius = useTransform(smoothProgress, [0.08, 0.44], ["24px", "0px"]);
  const cardBorderColor = useTransform(
    smoothProgress,
    [0.08, 0.44],
    ["rgba(0,0,0,0.12)", "rgba(0,0,0,0)"]
  );

  // 🌟 2. Scroll Hint (Fades out immediately on scroll)
  const hintOpacity = useTransform(smoothProgress, [0.02, 0.12], [1, 0]);

  // 🌟 3. Header Motion: Perfectly centered at rest, zero clipping with safe top clearance when docked
  const headerY = useTransform(smoothProgress, [0.15, 0.48], ["0px", "0px"]);
  const headerScale = useTransform(smoothProgress, [0.15, 0.48], [1.03, 1]);
  const dividerOpacity = useTransform(smoothProgress, [0.38, 0.52], [0, 1]);

  // 🌟 4. Sequenced Content Pop-Ins
  const tabsOpacity = useTransform(smoothProgress, [0.46, 0.62], [0, 1]);
  const tabsScale = useTransform(smoothProgress, [0.46, 0.62], [0.95, 1]);

  const gridOpacity = useTransform(smoothProgress, [0.52, 0.70], [0, 1]);
  const gridScale = useTransform(smoothProgress, [0.52, 0.70], [0.96, 1]);

  const footerOpacity = useTransform(smoothProgress, [0.62, 0.80], [0, 1]);
  const footerY = useTransform(smoothProgress, [0.62, 0.80], [12, 0]);

  return (
    <div id="empanelments" ref={trackRef} className="relative h-[280vh] md:h-[300vh] w-full">
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20">
        
        {/* 🌟 Expanding Vault Card: Light/Grey-White Paper Theme on Dark Screens */}
        <motion.div
          style={{
            width: cardWidth,
            height: cardHeight,
            maxWidth: cardMaxWidth,
            maxHeight: cardMaxHeight,
            borderRadius: cardBorderRadius,
            borderColor: cardBorderColor,
          }}
          className="relative bg-[#FBFBF9] text-slate-900 dark:bg-[#F2F1ED] dark:text-slate-900 border border-black/10 dark:border-black/15 shadow-[0_25px_60px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col justify-between origin-center will-change-transform min-w-[290px] min-h-[330px]"
        >
          {/* Subtle Ambient Radial Lighting for Light Surfaces */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/[0.02] via-transparent to-black/[0.06]" />

          {/* Absolute Scroll Hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-black/50 font-mono text-[9px] sm:text-xs tracking-widest uppercase pointer-events-none z-30"
          >
            <span>SCROLL TO OPEN</span>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce" />
          </motion.div>

          {/* Main Vault Workspace (Protected with generous navbar clearance: pt-20 sm:pt-24 md:pt-28) */}
          <div className="relative z-20 w-full h-full flex flex-col justify-between px-4 sm:px-8 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 max-w-5xl mx-auto">
            
            <div className="w-full flex flex-col justify-start">
              
              {/* 🌟 Unified Header Group: Optical center at rest, safe clearance below navbar when expanded */}
              <motion.div
                style={{
                  y: headerY,
                  scale: headerScale,
                }}
                className="text-center will-change-transform origin-center flex flex-col items-center shrink-0 mb-1"
              >
                <span className="font-mono font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase text-slate-600 block mb-1.5">
                  INSTITUTIONAL TRUST
                </span>
                
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-slate-950 leading-tight tracking-tight">
                  The Empanelments Vault
                </h2>

                <motion.div
                  style={{ opacity: dividerOpacity }}
                  className="h-px w-10 sm:w-12 bg-black/20 mx-auto mt-2 sm:mt-3"
                />
              </motion.div>

              {/* 🌟 Category Filter Pills */}
              <motion.div
                style={{
                  opacity: tabsOpacity,
                  scale: tabsScale,
                }}
                className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-3 sm:mt-5 md:mt-6 mb-3 sm:mb-5 md:mb-6 shrink-0"
              >
                {EMPANELMENTS.map((cat) => (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => setActiveTab(cat.category)}
                    className={`px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-mono font-semibold text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase transition-all duration-300 border active:scale-95 ${
                      activeTab === cat.category
                        ? "bg-slate-950 text-white border-slate-950 shadow-md"
                        : "bg-black/[0.04] border-black/10 text-slate-700 hover:text-slate-950 hover:bg-black/[0.08] hover:border-black/25"
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </motion.div>

              {/* 🌟 Empanelment Grid (7-Item Cap on Mobile, Full Grid on Desktop) */}
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
                        className={`p-2.5 sm:p-3.5 md:p-4 bg-white/95 rounded-lg sm:rounded-xl border border-black/10 items-center shadow-sm hover:border-black/30 hover:bg-white transition-all min-h-[42px] sm:min-h-[50px] md:min-h-[58px] ${
                          idx >= 7 ? "hidden sm:flex" : "flex"
                        }`}
                      >
                        <h3 className="font-body font-normal text-xs sm:text-sm text-slate-800 leading-snug">
                          {item}
                        </h3>
                      </div>
                    ))}

                    {/* Mobile Cap Indicator (+ X More) */}
                    {activeCategory && activeCategory.items.length > 7 && (
                      <div className="sm:hidden p-2.5 bg-black/[0.03] rounded-lg border border-dashed border-black/20 flex items-center justify-center text-center min-h-[42px]">
                        <span className="font-mono text-[10px] text-slate-600 tracking-wider uppercase">
                          + {activeCategory.items.length - 7} More in Dossier
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* 🌟 Bottom Action Bar */}
            <motion.div
              style={{
                opacity: footerOpacity,
                y: footerY,
              }}
              className="pt-4 sm:pt-5 border-t border-black/10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0 mt-4 sm:mt-6"
            >
              <div className="flex items-center gap-3 md:gap-4 text-center sm:text-left">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-900 shrink-0 hidden xs:block" />
                <div>
                  <h3 className="font-serif text-sm sm:text-lg md:text-xl font-light text-slate-950 leading-tight">
                    Download Chambers Profile & Credentials
                  </h3>
                  <p className="font-body font-light text-[10px] sm:text-xs text-slate-600 hidden sm:block">
                    Complete official brief featuring 21+ PSU & Govt Empanelments
                  </p>
                </div>
              </div>

              <a
                href="/docs/Satyendra_Agrawal_Chambers_Profile.pdf"
                download="Satyendra_Agrawal_Chambers_Profile.pdf"
                className="shrink-0 w-full sm:w-auto"
              >
                <PillButton className="w-full sm:w-auto justify-center text-xs py-2.5 px-5 sm:py-3 sm:px-6 shadow-md bg-slate-950 text-white hover:bg-black">
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