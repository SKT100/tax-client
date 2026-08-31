// src/components/sections/home/philosophy/cards/StatBadge.jsx

import { motion, useTransform } from "framer-motion";
import { PHILOSOPHY_CONFIG } from "../philosophyData";

export default function StatBadge({ progress }) {
  const { range, className } = PHILOSOPHY_CONFIG.stat;
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const y = useTransform(progress, range, [60, 0]);

  return (
    <motion.div style={{ opacity, scale, y }} className={className}>
      <div className="font-serif text-4xl md:text-5xl text-primary-light dark:text-primary-dark font-light leading-none">
        100%
      </div>
      <div className="font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark mt-2 max-w-[130px] font-bold">
        On-Time Statutory Compliance Rate
      </div>
    </motion.div>
  );
}