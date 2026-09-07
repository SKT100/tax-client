// src/components/layout/Footer.jsx

import { useRef, memo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, Phone, Mail, ArrowUpRight } from "lucide-react";
import PillButton from "../ui/PillButton";
import { SITE_CONFIG } from "../../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Footer() {
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <footer
      ref={footerRef}
      className="relative z-20 mt-16 sm:mt-24 md:mt-32 bg-[#0F0F12] rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden text-white shadow-2xl border-t border-white/10"
    >
      {/* Background Graphic Watermark */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[75%] lg:w-[62%] pointer-events-none z-0 overflow-hidden flex items-center justify-end will-change-transform"
        initial={{ opacity: 0, x: 180, scale: 1.04 }}
        whileInView={{ opacity: 0.18, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 65% 50%, rgba(0,0,0,1) 10%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 65% 50%, rgba(0,0,0,1) 10%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 78%)",
        }}
      >
        <img
          width="600"
          height="540"
          loading="lazy"
          decoding="async"
          src="/images/footer-img.webp"
          alt=""
          aria-hidden="true"
          className="h-[88%] max-h-[540px] w-auto aspect-[10/9] object-contain object-right filter grayscale contrast-110 brightness-90 mix-blend-screen select-none"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop"
      >
        {/* Top Call To Action */}
        <motion.div
          className="flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 sm:pb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-light tracking-tight text-white mb-6 sm:mb-8 text-center leading-tight whitespace-normal sm:whitespace-nowrap"
          >
            {SITE_CONFIG.firm.tagline}
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link to="/schedule" className="no-underline">
              <PillButton
                variant="custom"
                bgClass="bg-white shadow-2xl"
                borderClass="border border-white"
                fillClass="bg-slate-950"
                hoverTextClass="text-slate-950 group-hover:text-white"
                className="px-8 sm:px-11 py-3.5 sm:py-4 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase"
              >
                Schedule Consultation
              </PillButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* 4-Column Navigation & Contact Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 pt-10 pb-16 md:pb-24 border-t border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Column 1: Brand & Principal (4 Cols) */}
          <motion.div variants={staggerItem} className="lg:col-span-4 pr-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/Matrix-tax-logo.svg"
                alt={SITE_CONFIG.firm.name}
                width="160"
                height="56"
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 w-auto object-contain object-left opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/70 text-xs sm:text-sm font-body font-light leading-relaxed">
              {SITE_CONFIG.principal.name} • {SITE_CONFIG.principal.designation}. Providing trusted statutory income tax filings, GST lifecycle compliance, notice defense, and business licensing.
            </p>
          </motion.div>

          {/* Column 2: Quick Links (2 Cols) */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <h3 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-white/80 text-xs sm:text-sm font-body font-light">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Tax Services
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-white transition-colors">
                  Due Dates
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Tax Guides
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition-colors">
                  Chambers
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Book Online
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Head Chambers & Hours (3 Cols) */}
          <motion.div variants={staggerItem} className="lg:col-span-3">
            <h3 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6">
              Head Chambers
            </h3>
            <div className="flex flex-col gap-3 text-white/80 text-xs sm:text-sm font-body font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed text-white/80">
                  461, N.C. Banerjee Road,
                  <br />
                  Baidyabati, Hooghly,
                  <br />
                  West Bengal — 712222
                </address>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                <div className="leading-snug text-xs">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block mb-0.5">
                    Chamber Timings
                  </span>
                  <p className="text-white/80">
                    Morning: 7:00 AM – 10:00 AM
                    <br />
                    Evening: 6:00 PM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Contact & Direct Connect (3 Cols) */}
          <motion.div variants={staggerItem} className="lg:col-span-3">
            <h3 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 mb-4 sm:mb-6">
              Direct Contact
            </h3>
            <ul className="flex flex-col gap-3.5 text-white/80 text-xs sm:text-sm font-body font-light">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                  aria-label={`Call Chambers at ${SITE_CONFIG.contact.phone}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-mono text-xs">{SITE_CONFIG.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on WhatsApp Direct"
                  className="hover:text-white transition-colors flex items-center gap-2 text-emerald-400"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-current" />
                  <span>WhatsApp Desk</span>
                  <ArrowUpRight size={13} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  aria-label={`Email Chambers at ${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-white/60 shrink-0" />
                  <span className="truncate">{SITE_CONFIG.contact.email}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Copyright Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between py-6 sm:py-8 border-t border-white/10 text-[10px] sm:text-xs font-mono text-white/60 uppercase tracking-[0.2em] gap-3 text-center sm:text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>© 2026 {SITE_CONFIG.firm.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
          <span>ACCURACY • STATUTORY COMPLIANCE • PEACE OF MIND</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default memo(Footer);