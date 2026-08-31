// src/components/layout/Footer.jsx

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Footer() {
  const footerRef = useRef(null);

  const isInView = useInView(footerRef, {
    once: true,
    margin: "0px 0px -150px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <footer
      ref={footerRef}
      className="relative z-20 -mt-[25vh] md:-mt-[35vh] bg-[#0F0F12] rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden text-white shadow-2xl border-t border-white/10"
    >
      {/* Background Graphic Watermark */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[75%] lg:w-[62%] pointer-events-none z-0 overflow-hidden flex items-center justify-end will-change-transform"
        initial={{ opacity: 0, x: 220, scale: 1.04 }}
        animate={
          isInView
            ? { opacity: 0.2, x: 0, scale: 1 }
            : { opacity: 0, x: 220, scale: 1.04 }
        }
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
          src="/images/footer-img.svg"
          alt={`${SITE_CONFIG.firm.name} Background Emblem`}
          className="h-[88%] max-h-[540px] w-auto aspect-[10/9] object-contain object-right filter grayscale contrast-110 brightness-90 mix-blend-screen select-none"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop"
      >
        {/* Top CTA Section */}
        <motion.div
          className="flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
                variant="auto"
                className="px-8 sm:px-11 py-3 sm:py-3.5 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase bg-white text-slate-950 hover:bg-slate-100 rounded-full shadow-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Initiate Consultation
              </PillButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Middle Section: Navigation Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8 pt-10 pb-16 md:pb-24 border-t border-white/10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Brand Column */}
          <motion.div variants={staggerItem} className="lg:col-span-1 pr-4">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/Matrix-tax-logo.svg"
                alt={SITE_CONFIG.firm.name}
                width="160"
                height="56"
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain object-left opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/60 text-xs sm:text-sm font-body font-light leading-relaxed">
              {SITE_CONFIG.principal.name} — {SITE_CONFIG.principal.designation}. Delivering trusted
              statutory compliance, ITR filing, and audit defense.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={staggerItem}>
            <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 mb-5 sm:mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5 text-white/70 text-xs sm:text-sm font-body font-light">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services Directory
                </Link>
              </li>
              <li>
                <Link to="/about#compliance-vault" className="hover:text-white transition-colors">
                  Compliance Vault
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Profile
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Schedule Advisory
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={staggerItem}>
            <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 mb-5 sm:mb-6">
              Legal
            </h4>
            <ul className="flex flex-col gap-3.5 text-white/70 text-xs sm:text-sm font-body font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Statutory Disclaimer
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={staggerItem}>
            <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 mb-5 sm:mb-6">
              Connect
            </h4>
            <ul className="flex flex-col gap-3.5 text-white/70 text-xs sm:text-sm font-body font-light">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  LinkedIn <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  WhatsApp Direct <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Email Chambers <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Copyright Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between py-6 sm:py-8 border-t border-white/10 text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-[0.2em] gap-3 text-center sm:text-left"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>© 2026 {SITE_CONFIG.firm.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
          <span>ACCURACY • COMPLIANCE • GROWTH</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}