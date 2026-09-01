// src/pages/Locations.jsx

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Building2,
  Train,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Navigation,
  Globe2,
} from "lucide-react";
import ChamberMapCard from "../components/ui/ChamberMapCard";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";
import { MUNICIPAL_CLUSTERS, REGIONAL_FAQS } from "../data/locationsData";
import { SITE_CONFIG } from "../data/siteConfig";

function Locations() {
  const [openFaq, setOpenFaq] = useState(null);

  const handleWhatsAppConsult = (cluster) => {
    const rawNumber = (SITE_CONFIG?.contact?.phoneRaw || "919007064088").replace("+", "");
    const message = `*REGIONAL DESK INQUIRY — ${cluster.title.toUpperCase()}*
--------------------------------
*Zone:* ${cluster.zone}
*PIN Code:* ${cluster.pinCodes.join(", ")}
*Assessee Category:* ${cluster.targetAssessees}
--------------------------------
_Requesting tax filing & statutory compliance assistance in this municipal jurisdiction._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${rawNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300">
      
      {/* Ticker Banner */}
      <div className="pt-6 pb-2 border-b border-theme bg-black/[0.02] dark:bg-white/[0.02]">
        <ScrollVelocityRibbon baseVelocity={0.3}>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark px-4">
            GRAND TRUNK ROAD INDUSTRIAL BELT ✦ HOOGHLY MUNICIPAL DESKS ✦ GREATER KOLKATA CORPORATE NETWORK ✦ BAIDYABATI CHAMBERS ✦
          </span>
        </ScrollVelocityRibbon>
      </div>

      <main className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 sm:py-16 md:py-20 space-y-16 sm:space-y-24">
        
        {/* Section 1: Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme bg-black/5 dark:bg-white/5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary-light dark:text-secondary-dark">
            <Navigation className="w-3.5 h-3.5 text-amber-500" />
            <span>Regional Jurisdictional Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-primary-light dark:text-primary-dark leading-tight">
            Grand Trunk Road &amp; <br />
            <span className="italic font-light opacity-90">Municipal Desks</span>
          </h1>
          <p className="font-body text-xs sm:text-sm md:text-base text-secondary-light dark:text-secondary-dark font-light leading-relaxed">
            Statutory tax representation, municipal licensing, and GST advisory across the Hooghly industrial corridor and Greater Kolkata.
          </p>
        </div>

        {/* Section 2: Chamber Interactive Map Component */}
        <div>
          <ChamberMapCard />
        </div>

        {/* Section 3: Municipal Jurisdictional Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-theme">
            <div>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary-light dark:text-secondary-dark block mb-1">
                JURISDICTIONAL COVERAGE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light tracking-tight">
                Municipal <span className="italic font-light">Clusters &amp; PINs</span>
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark">
              5 Dedicated Desks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MUNICIPAL_CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                className="glass-card border border-theme rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 shadow-xl group"
              >
                <div className="space-y-4">
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                      {cluster.status}
                    </span>
                    <span className="font-mono text-[10px] text-secondary-light dark:text-secondary-dark">
                      PIN: {cluster.pinCodes.join(", ")}
                    </span>
                  </div>

                  {/* Title & Zone */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-primary-light dark:text-primary-dark group-hover:text-amber-500 transition-colors">
                      {cluster.title}
                    </h3>
                    <span className="font-mono text-[11px] text-secondary-light dark:text-secondary-dark block mt-0.5">
                      {cluster.zone}
                    </span>
                  </div>

                  {/* Jurisdiction & Target */}
                  <div className="text-xs font-body text-secondary-light dark:text-secondary-dark space-y-1.5 pt-2 border-t border-theme">
                    <div className="flex items-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary-light dark:text-primary-dark" />
                      <span className="font-light">{cluster.jurisdiction}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Train className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary-light dark:text-primary-dark" />
                      <span className="font-light text-[11px]">{cluster.transit}</span>
                    </div>
                  </div>

                  {/* Statutory Services List */}
                  <div className="space-y-1.5 pt-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-secondary-light dark:text-secondary-dark block">
                      Core Directives
                    </span>
                    {cluster.statutoryServices.map((service, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-body font-light">
                        <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="line-clamp-1">{service}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppConsult(cluster)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider border border-theme hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Engage Local Desk</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Regional FAQ Accordion */}
        <div className="space-y-6 pt-8 border-t border-theme">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
              STATUTORY INQUIRIES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-light">
              Regional Practice <span className="italic font-light">Directives</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-theme rounded-2xl border border-theme glass-card overflow-hidden">
            {REGIONAL_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-light text-primary-light dark:text-primary-dark">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-secondary-light dark:text-secondary-dark transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-amber-500" : ""
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
                        <p className="px-5 sm:px-6 pb-6 font-body text-xs sm:text-sm font-light text-secondary-light dark:text-secondary-dark leading-relaxed">
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

        {/* Section 5: Bottom CTA */}
        <div className="rounded-3xl border border-theme glass-card p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light">
            Need On-Ground Municipal Assistance?
          </h3>
          <p className="font-body text-xs sm:text-sm text-secondary-light dark:text-secondary-dark max-w-md font-light">
            Consult with our principal tax advisor directly for notice defense, company incorporation, or trade licence renewals across West Bengal.
          </p>
          <a
            href={`https://wa.me/${(SITE_CONFIG?.contact?.phoneRaw || "919007064088").replace("+", "")}?text=${encodeURIComponent("I need tax consultancy and statutory assistance in the Hooghly / Kolkata region.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark shadow-xl hover:scale-105 transition-all no-underline"
          >
            <span>Book Chamber Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-2 font-mono text-[10px] text-secondary-light dark:text-secondary-dark pt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strict Confidentiality • Privileged Assessee Communication</span>
          </div>
        </div>

      </main>
    </div>
  );
}

export default memo(Locations);