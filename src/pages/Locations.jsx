// src/pages/Locations.jsx

import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ChamberMapCard from "../components/ui/ChamberMapCard";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";
import ServiceCard from "../components/sections/services/ServicesCard";
import { MUNICIPAL_CLUSTERS, REGIONAL_FAQS } from "../data/locationsData";

function Locations() {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300">

      {/* Dynamic Ribbon Banner (Flushed to Navbar) */}
      <div className="pt-2 pb-2 border-b border-theme bg-black/[0.02] dark:bg-white/[0.02]">
        <ScrollVelocityRibbon baseVelocity={0.3}>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark px-4">
            GRAND TRUNK ROAD INDUSTRIAL BELT ✦ HOOGHLY MUNICIPAL DESKS ✦ GREATER KOLKATA CORPORATE NETWORK ✦ BAIDYABATI CHAMBERS ✦
          </span>
        </ScrollVelocityRibbon>
      </div>

      <main className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 space-y-12 sm:space-y-16 md:space-y-20">

        {/* Section 1: Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold">
              REGIONAL JURISDICTIONAL NETWORK
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-3">
            Grand Trunk Road &amp; <br />
            <span className="italic font-light opacity-90">Municipal Desks</span>
          </h1>
          <p className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
            Statutory tax representation, municipal licensing, and GST advisory across the Hooghly industrial corridor and Greater Kolkata.
          </p>
        </div>

        {/* Section 2: Chamber Interactive Map */}
        <div>
          <ChamberMapCard />
        </div>

        {/* Section 3: Municipal Jurisdictional Grid with PillButton Navigation */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-theme">
            <div>
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-2">
                JURISDICTIONAL COVERAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                Municipal <span className="italic font-light opacity-90">Clusters &amp; PINs</span>
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark font-bold">
              {MUNICIPAL_CLUSTERS.length} Dedicated Desks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MUNICIPAL_CLUSTERS.map((cluster, index) => (
              <ServiceCard
                key={cluster.id}
                index={index}
                tag={cluster.status}
                title={cluster.title}
                description={`${cluster.zone} • ${cluster.jurisdiction}`}
                footerLabel={`PIN: ${cluster.pinCodes.join(", ")}`}
                buttonText="View Desk"
                to={`/locations/${cluster.id}`} // 👈 Generates real HTML <a href="..."> for Googlebot
                bgImage="/images/location-bg.webp"
              />
            ))}
          </div>
        </div>

        {/* Section 4: Regional FAQ Accordion */}
        <div className="space-y-8 pt-10 border-t border-theme">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block">
              STATUTORY INQUIRIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
              Regional Practice <span className="italic font-light opacity-90">Directives</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-theme rounded-2xl md:rounded-3xl border border-theme glass-card overflow-hidden shadow-xl">
            {REGIONAL_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-xl font-light text-primary-light dark:text-primary-dark leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-secondary-light dark:text-secondary-dark transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-amber-500" : ""
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 sm:px-7 pb-6 font-body text-xs sm:text-sm font-light text-secondary-light dark:text-secondary-dark leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}

export default memo(Locations);