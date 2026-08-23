import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin, Phone, Mail } from "lucide-react";
import { CHAMBERS } from "../../data/aboutData";

export default function ChamberMapCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const chambersList = [
    {
      id: "high-court",
      number: "01",
      tabLabel: "High Court",
      title: "High Court Chamber",
      description:
        "Principal litigation chamber managing appellate filings, writ petitions, and division bench matters at the High Court at Calcutta.",
      locationName: "Calcutta High Court",
      locationAddress:
        CHAMBERS?.[0]?.address?.join(", ") ||
        "Bar Association Room No. 18, High Court, Kolkata - 700001",
      directLine: "+91 (033) 2248-0000",
      email: "highcourt@satyendraagrawal.in",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Calcutta%20High%20Court%20Bar%20Association%20Room%2018&t=&z=16&ie=UTF8&iwloc=&output=embed",
      mapDirectLink:
        "https://maps.google.com/?q=Calcutta+High+Court+Bar+Association+Room+18+Kolkata",
    },
    {
      id: "city-office",
      number: "02",
      tabLabel: "City Office",
      title: "City Office & Secretariat",
      description:
        "Corporate arbitration chamber and private client consultation center for infrastructure, corporate, and statutory claims.",
      locationName: "Kolkata Central Office",
      locationAddress:
        CHAMBERS?.[1]?.address?.join(", ") ||
        "23A N.S. Road, 4th Floor, Kolkata - 700001",
      directLine: "+91 98300 00000",
      email: "cityoffice@satyendraagrawal.in",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=23A%20NS%20Road%20Kolkata%20700001&t=&z=16&ie=UTF8&iwloc=&output=embed",
      mapDirectLink:
        "https://maps.google.com/?q=23A+NS+Road+Kolkata+700001",
    },
    {
      id: "howrah-chamber",
      number: "03",
      tabLabel: "Howrah Chamber",
      title: "Howrah Chamber",
      description:
        "Private evening chamber dedicated to strategic pre-trial conferences, case briefs, and confidential client deliberations.",
      locationName: "Liluah Chamber",
      locationAddress:
        CHAMBERS?.[2]?.address?.join(", ") ||
        "Laxmi Sadan, 112 Girish Ghosh Road, Liluah, Howrah - 711204",
      directLine: "+91 98311 00000",
      email: "chambers@satyendraagrawal.in",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=112%20Girish%20Ghosh%20Road%20Liluah%20Howrah&t=&z=16&ie=UTF8&iwloc=&output=embed",
      mapDirectLink:
        "https://maps.google.com/?q=Laxmi+Sadan+112+Girish+Ghosh+Road+Liluah+Howrah",
    },
  ];

  const activeChamber = chambersList[activeIndex];

  return (
    <div className="glass-card border border-theme rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl transition-all duration-300">
      
      {/* Left Column: Segmented Pill Switcher & Active Chamber Details */}
      <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-theme">
        <div>
          {/* 🌟 Fully Pill-Shaped Track (`rounded-full`) */}
          <div className="p-1 sm:p-1.5 bg-black/5 dark:bg-white/5 rounded-full border border-theme grid grid-cols-3 gap-1 mb-6 sm:mb-8">
            {chambersList.map((chamber, index) => {
              const isSelected = activeIndex === index;
              return (
                <button
                  key={chamber.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase transition-colors duration-200 text-center z-10 ${
                    isSelected
                      ? "text-slate-900 dark:text-slate-900 font-semibold"
                      : "text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
                  }`}
                >
                  {/* 🌟 Pill-Shaped Sliding Indicator (`rounded-full`) */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeChamberTab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                    />
                  )}
                  <span className="opacity-50 mr-1 hidden xs:inline">{chamber.number}.</span>
                  <span>{chamber.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Chamber Content */}
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

        {/* Chamber Inquiries Footer */}
        <div className="mt-6 sm:mt-8 pt-5 border-t border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-secondary-light dark:text-secondary-dark" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              CHAMBER INQUIRIES
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

      {/* Right Column: Synchronized Map Viewport */}
      <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[440px] bg-slate-900/10 dark:bg-white/5 group">
        <iframe
          key={activeChamber.id}
          title={activeChamber.title}
          src={activeChamber.mapEmbedUrl}
          className="w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-full border-0 filter grayscale contrast-125 opacity-80 dark:invert dark:hue-rotate-180 dark:contrast-150 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          loading="lazy"
          decoding="async"
        />

        <a
          href={activeChamber.mapDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 backdrop-blur-xl bg-surface-light/90 dark:bg-[#0F0F12]/90 border border-theme px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-primary-light dark:text-primary-dark flex items-center gap-1.5 shadow-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300 group-hover:scale-105"
        >
          <span>OPEN MAP</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}