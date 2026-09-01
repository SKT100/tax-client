// src/components/ui/ChamberMapCard.jsx

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin, Phone, Mail } from "lucide-react";
import { CONTACT_INFO } from "../../data/taxData";

const CHAMBERS_LIST = [
  {
    id: "baidyabati-ho",
    number: "01",
    tabLabel: "Head Office",
    title: "Baidyabati Head Office",
    description:
      "Principal tax and advisory office managing direct tax e-filing, GST periodic compliance, business licensing, and statutory notice defense.",
    locationName: "Matrix Tax Solutions HQ",
    locationAddress: "Baidyabati, Hooghly, West Bengal — 712222",
    directLine: CONTACT_INFO?.phone || "+91 9007064088",
    email: CONTACT_INFO?.email || "tcparthahalder1984@gmail.com",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Baidyabati%20Hooghly%20West%20Bengal%20712222&t=&z=14&ie=UTF8&iwloc=&output=embed",
    mapDirectLink:
      "https://maps.google.com/?q=Baidyabati+Hooghly+West+Bengal+712222",
  },
  {
    id: "digital-desk",
    number: "02",
    tabLabel: "Digital Desk",
    title: "Digital Consultation & E-Filing",
    description:
      "Remote advisory and virtual filing desk providing dedicated consultation to individuals and businesses across Kolkata, Howrah, Nadia, and 24 Parganas.",
    locationName: "Online Video & Document Desk",
    locationAddress: "Virtual Advisory & Remote Compliance Portal",
    directLine: CONTACT_INFO?.phone || "+91 9007064088",
    email: CONTACT_INFO?.email || "tcparthahalder1984@gmail.com",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Kolkata%20West%20Bengal&t=&z=11&ie=UTF8&iwloc=&output=embed",
    mapDirectLink:
      "https://maps.google.com/?q=Kolkata+West+Bengal",
  },
  {
    id: "regional-hub",
    number: "03",
    tabLabel: "Regional Reach",
    title: "Hooghly & Kolkata Network",
    description:
      "Local client assistance and on-ground compliance support covering municipal trade licences, PF/ESI registrations, and audit documentation.",
    locationName: "Hooghly & Greater Kolkata Belt",
    locationAddress: "Active Service Across 6 Target Districts",
    directLine: CONTACT_INFO?.phone || "+91 9007064088",
    email: CONTACT_INFO?.email || "tcparthahalder1984@gmail.com",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Serampore%20Hooghly%20West%20Bengal&t=&z=13&ie=UTF8&iwloc=&output=embed",
    mapDirectLink:
      "https://maps.google.com/?q=Serampore+Hooghly+West+Bengal",
  },
];

function ChamberMapCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChamber = CHAMBERS_LIST[activeIndex];

  return (
    <div className="glass-card border border-theme rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl transition-all duration-300">
      
      {/* Left Column: Segmented Switcher & Details */}
      <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-theme">
        <div>
          {/* Segmented Track */}
          <div className="p-1 sm:p-1.5 bg-black/[0.04] dark:bg-white/[0.05] rounded-full border border-theme grid grid-cols-3 gap-1 mb-6 sm:mb-8">
            {CHAMBERS_LIST.map((chamber, index) => {
              const isSelected = activeIndex === index;
              return (
                <button
                  key={chamber.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200 text-center z-10 cursor-pointer ${
                    isSelected
                      ? "text-primary-light dark:text-primary-dark font-bold"
                      : "text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeChamberTab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-surface-light dark:bg-surface-secondary-dark rounded-full shadow-sm -z-10 border border-theme"
                    />
                  )}
                  <span className="opacity-50 mr-1 hidden xs:inline">{chamber.number}.</span>
                  <span>{chamber.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Location Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChamber.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary-light dark:text-primary-dark tracking-tight mb-2.5">
                {activeChamber.title}
              </h3>

              <p className="font-body font-light text-xs sm:text-sm md:text-base text-secondary-light dark:text-secondary-dark leading-relaxed mb-6 sm:mb-8 max-w-lg">
                {activeChamber.description}
              </p>

              {/* Spec Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-5 sm:pt-6 border-t border-theme">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-secondary-light dark:text-secondary-dark" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                      LOCATION
                    </span>
                  </div>
                  <p className="font-body font-medium text-xs sm:text-sm text-primary-light dark:text-primary-dark leading-snug">
                    {activeChamber.locationName}
                    <br />
                    <span className="font-light text-secondary-light dark:text-secondary-dark text-xs block mt-0.5">
                      {activeChamber.locationAddress}
                    </span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-secondary-light dark:text-secondary-dark" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                      DIRECT LINE
                    </span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-primary-light dark:text-primary-dark font-medium">
                    {activeChamber.directLine}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Inquiries Footer */}
        <div className="mt-6 sm:mt-8 pt-5 border-t border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-secondary-light dark:text-secondary-dark" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              DIRECT INQUIRIES
            </span>
          </div>
          <a
            href={`mailto:${activeChamber.email}`}
            className="font-mono text-xs sm:text-sm text-primary-light dark:text-primary-dark hover:underline transition-all"
          >
            {activeChamber.email}
          </a>
        </div>
      </div>

      {/* Right Column: Map Frame */}
      <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] bg-surface-dark/5 dark:bg-surface-light/5 group">
        <iframe
          key={activeChamber.id}
          title={activeChamber.title}
          src={activeChamber.mapEmbedUrl}
          className="w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-full border-0 filter grayscale contrast-125 opacity-80 dark:invert dark:hue-rotate-180 dark:contrast-150 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          loading="lazy"
        />

        <a
          href={activeChamber.mapDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 backdrop-blur-xl bg-surface-light/90 dark:bg-surface-dark/90 border border-theme px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-primary-light dark:text-primary-dark flex items-center gap-1.5 shadow-xl hover:bg-primary-light hover:text-surface-light dark:hover:bg-primary-dark dark:hover:text-primary-light transition-all duration-300 group-hover:scale-105 no-underline"
        >
          <span>OPEN MAP</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default memo(ChamberMapCard);