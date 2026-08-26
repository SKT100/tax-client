import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function PracticeListItem({ practice, index, isSelected, onSelect }) {
  const formattedNum = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => onSelect(practice.id)}
      className={`group text-left py-5 px-4 border-b border-theme transition-all duration-300 flex items-center justify-between relative ${
        isSelected
          ? "text-primary-light dark:text-primary-dark font-normal"
          : "text-secondary-light dark:text-primary-dark/60 hover:text-primary-light dark:hover:text-primary-dark"
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="activePracticeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-slate-950 dark:bg-white rounded-r"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <div className="flex items-center gap-5 pl-2">
        <span className="font-mono text-xs text-secondary-light dark:text-primary-dark/40">
          {formattedNum}
        </span>
        <h3
          className={`font-serif text-lg md:text-xl transition-colors duration-300 ${
            isSelected
              ? "font-medium text-primary-light dark:text-primary-dark"
              : "font-light"
          }`}
        >
          {practice.title}
        </h3>
      </div>

      <ArrowRight
        className={`w-4 h-4 transition-all duration-300 shrink-0 ${
          isSelected
            ? "opacity-100 translate-x-0 text-primary-light dark:text-primary-dark"
            : "opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
        }`}
      />
    </button>
  );
}

export default memo(PracticeListItem);