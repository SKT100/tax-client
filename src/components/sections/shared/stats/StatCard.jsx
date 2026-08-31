import { motion } from "framer-motion";
import CountUp from "../../../ui/CountUp";

export function StatCard({ stat, idx, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
      className="flex flex-col p-6 sm:p-8 md:p-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      <div className="text-[10px] sm:text-xs font-mono font-bold text-secondary-light dark:text-secondary-dark tracking-[0.25em] uppercase mb-6 sm:mb-8">
        {stat.ref}
      </div>

      <div className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-primary-light dark:text-primary-dark mb-4 flex items-baseline leading-none">
        <CountUp
          to={stat.value}
          duration={2.5}
          separator=","
          startWhen={isInView}
        />
        <span>{stat.suffix}</span>
      </div>

      <div>
        <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 text-primary-light dark:text-primary-dark">
          {stat.title}
        </h3>
        <p className="font-body font-light text-xs sm:text-sm leading-relaxed text-secondary-light dark:text-secondary-dark">
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}