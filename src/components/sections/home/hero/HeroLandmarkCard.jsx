import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroLandmarkCard() {
  return (
    <motion.div
      data-interactive="true"
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="absolute bottom-8 right-8 md:bottom-10 md:right-10 z-30 max-w-[300px] md:max-w-sm bg-black/40 backdrop-blur-xl border border-white/20 p-5 sm:p-6 rounded-2xl flex flex-col gap-2.5 transition-colors duration-300 hidden sm:flex pointer-events-auto shadow-2xl"
    >
      <div className="font-mono text-[10px] font-bold text-white/70 uppercase tracking-[0.25em] flex items-center gap-2">
        Statutory Advisory
      </div>
      <p className="font-body font-light text-xs sm:text-sm text-white leading-relaxed">
        Direct Tax, GST Lifecycle Management &amp; Statutory Notice Defense
      </p>
      <Link
        to="/schedule"
        data-interactive="true"
        className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-white mt-1 link-hover cursor-pointer group w-fit"
      >
        <span>Book Consultation</span>
        <ArrowRight
          size={13}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </motion.div>
  );
}