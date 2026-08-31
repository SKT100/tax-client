// src/components/sections/home/philosophy/cards/MediaBadge.jsx

import { motion, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { PHILOSOPHY_CONFIG } from "../philosophyData";

export default function MediaBadge({ progress }) {
  const { range, className } = PHILOSOPHY_CONFIG.video;
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const y = useTransform(progress, range, [60, 0]);

  return (
    <motion.div style={{ opacity, scale, y }} className={className}>
      <img
        loading="lazy"
        decoding="async"
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
        alt="Tax Analysis & Calculation"
        className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/60 group-hover:scale-110 transition-transform mb-2">
          <Play size={18} className="text-white ml-0.5 fill-white" />
        </div>
        <span className="font-mono text-xs tracking-widest text-white uppercase mt-1 font-bold">
          Advisory Reel
        </span>
      </div>
    </motion.div>
  );
}