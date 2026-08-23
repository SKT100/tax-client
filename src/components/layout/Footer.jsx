import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PillButton from "../ui/PillButton";

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

  // Subtle parallax that keeps the headline positioned safely without pushing it under the navbar
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <footer
      ref={footerRef}
      className="relative z-20 -mt-[25vh] md:-mt-[35vh] bg-[#0F0F12] rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden text-white shadow-2xl"
    >
      {/* Background Graphic Layer */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[70%] lg:w-[58%] pointer-events-none z-0 mix-blend-screen opacity-20"
        initial={{ opacity: 0, x: 80, scale: 1.04 }}
        whileInView={{ opacity: 0.22, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          loading="lazy"
          decoding="async"
          src="/images/lady-justice-footer.svg"
          alt=""
          className="w-full h-full object-cover object-[85%_25%] md:object-[90%_15%] filter grayscale contrast-125"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop"
      >
        {/* Top CTA Section: Lowered naturally with no awkward line-wrapping on desktop */}
        <motion.div
          className="flex flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* 🌟 Single-Line Title on Desktop with Scaled Typography */}
          <motion.h2
            variants={fadeUp}
            className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-light tracking-tight text-white mb-6 sm:mb-8 text-center leading-tight whitespace-normal sm:whitespace-nowrap"
          >
            Secure Legal Representation
          </motion.h2>

          <motion.div variants={fadeUp}>
            <Link to="/schedule">
              <PillButton
                variant="on-dark"
                className="px-8 sm:px-11 py-3 sm:py-3.5 text-xs sm:text-sm font-mono tracking-widest uppercase shadow-2xl"
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
        >
          {/* Brand Column */}
          <motion.div variants={staggerItem} className="lg:col-span-1 pr-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-light leading-snug mb-3 text-white">
              Satyendra Agrawal
            </h3>
            <p className="text-white/60 text-xs sm:text-sm font-sans leading-relaxed">
              Advocate on Record, Supreme Court of India. Delivering
              unparalleled legal expertise.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={staggerItem}>
            <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/90 mb-5 sm:mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5 text-white/60 text-xs sm:text-sm font-sans">
              <li>
                <Link
                  to="/practices#practice-areas"
                  className="hover:text-white transition-colors"
                >
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link
                  to="/about#empanelments"
                  className="hover:text-white transition-colors"
                >
                  Empanelments Vault
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/schedule"
                  className="hover:text-white transition-colors"
                >
                  Schedule Consultation
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={staggerItem}>
            <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/90 mb-5 sm:mb-6">
              Legal
            </h4>
            <ul className="flex flex-col gap-3.5 text-white/60 text-xs sm:text-sm font-sans">
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
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={staggerItem}>
            <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/90 mb-5 sm:mb-6">
              Connect
            </h4>
            <ul className="flex flex-col gap-3.5 text-white/60 text-xs sm:text-sm font-sans">
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
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Twitter <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="mailto:chambers@satyendraagrawal.in"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Email <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Copyright Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between py-6 sm:py-8 border-t border-white/10 text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-[0.2em] gap-3 text-center sm:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span>© 2026 SATYENDRA AGRAWAL. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED FOR EXCELLENCE</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}