// src/components/sections/home/philosophy/cards/PortraitCard.jsx

import { motion, useTransform } from "framer-motion";
import { PHILOSOPHY_CONFIG } from "../philosophyData";

export default function PortraitCard({ progress }) {
  const { range, className } = PHILOSOPHY_CONFIG.arch;
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const y = useTransform(progress, range, [80, 0]);

  return (
    <motion.div style={{ opacity, scale, y }} className={className}>
      <img
        loading="lazy"
        decoding="async"
        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
        alt="Statutory Compliance & GST"
        className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h4 className="font-serif italic font-light text-2xl md:text-3xl text-white">
          Statutory
        </h4>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/70 mt-1.5 font-bold">
          Tax &amp; GST Lifecycle
        </p>
      </div>
    </motion.div>
  );
}