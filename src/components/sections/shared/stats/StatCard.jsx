import { motion } from "framer-motion";
import CountUp from "../../../ui/CountUp";
export function StatCard({ stat, idx, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
      className="flex flex-col p-8 md:p-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      {" "}
      <div className="text-xs font-mono text-primary-light dark:text-primary-dark tracking-widest uppercase mb-8">
        {" "}
        {stat.ref}{" "}
      </div>{" "}
      <div className="font-display text-7xl xl:text-8xl font-light tracking-tight-display text-primary-light dark:text-primary-dark mb-4 flex">
        {" "}
        <CountUp
          to={stat.value}
          duration={2.5}
          separator=","
          startWhen={isInView}
        />{" "}
        <span>{stat.suffix}</span>{" "}
      </div>{" "}
      <div>
        {" "}
        <h3 className="font-medium text-sm uppercase tracking-widest mb-2 text-primary-light dark:text-primary-dark">
          {" "}
          {stat.title}{" "}
        </h3>{" "}
        <p className="text-sm font-light leading-relaxed text-secondary-light dark:text-secondary-dark">
          {" "}
          {stat.desc}{" "}
        </p>{" "}
      </div>{" "}
    </motion.div>
  );
}
