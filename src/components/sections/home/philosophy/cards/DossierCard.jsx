import { motion, useTransform } from "framer-motion";
import { PHILOSOPHY_CONFIG } from "../philosophyData";

export default function DossierCard({ progress }) {
  const { range, className } = PHILOSOPHY_CONFIG.dossier;
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const y = useTransform(progress, range, [60, 0]);

  return (
    <motion.div style={{ opacity, scale, y }} className={className}>
      <h4 className="font-serif text-xl md:text-2xl text-primary-light dark:text-primary-dark font-normal">
        Statutory Defense
      </h4>
      <p className="text-xs md:text-sm text-secondary-light dark:text-secondary-dark mt-2.5 font-light leading-relaxed">
        Structured legal defense for Income Tax show-cause notices, Section 148 reassessments, and GST appellate reviews.
      </p>
    </motion.div>
  );
}