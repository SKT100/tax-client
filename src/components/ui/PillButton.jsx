// src/components/ui/PillButton.jsx

import { memo } from "react";

function PillButton({
  children,
  onClick,
  className = "",
  variant = "auto",
  ...props
}) {
  // 1. Default: "auto" (Adapts to page theme)
  // Light Mode: Black button -> Fills with White on hover -> Text turns Black
  // Dark Mode:  White button -> Fills with Black on hover -> Text turns White
  let baseBgClass = "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md";
  let borderClass = "border border-slate-950 dark:border-white";
  let fillClass = "bg-white dark:bg-black";
  let hoverTextClass = "group-hover:text-slate-950 dark:group-hover:text-white";

  if (variant === "on-dark") {
    // 2. "on-dark" (For permanently dark sections like Hero, Footer, WhyChooseUs)
    // Solid White Button -> Fills with Solid Black on hover -> Text turns Pure White
    baseBgClass = "bg-white text-slate-950 shadow-md";
    borderClass = "border border-white";
    fillClass = "bg-black";
    hoverTextClass = "group-hover:text-white";
  } else if (variant === "on-light") {
    // 3. "on-light" (For permanently light sections)
    // Solid Black Button -> Fills with Solid White on hover -> Text turns Black
    baseBgClass = "bg-slate-950 text-white shadow-md";
    borderClass = "border border-slate-950";
    fillClass = "bg-white";
    hoverTextClass = "group-hover:text-slate-950";
  } else if (variant === "outline") {
    // 4. "outline"
    // Transparent border button -> Fills with Solid Color on hover
    baseBgClass = "bg-transparent text-primary-light dark:text-primary-dark";
    borderClass = "border border-black/25 dark:border-white/25";
    fillClass = "bg-slate-950 dark:bg-white";
    hoverTextClass = "group-hover:text-white dark:group-hover:text-slate-950";
  }

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-7 py-3 text-xs font-mono font-bold tracking-widest uppercase overflow-hidden rounded-full transition-all duration-300 group z-10 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${baseBgClass} ${borderClass} ${className}`}
      {...props}
    >
      {/* Expanding Circular Fill on Hover */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240%] aspect-square rounded-full ${fillClass} scale-0 group-hover:scale-100 transition-transform duration-500 ease-out -z-10 pointer-events-none`}
      />
      {/* Horizontally Locked Inline Content */}
      <span
        className={`relative z-10 inline-flex items-center justify-center gap-2.5 transition-colors duration-300 ease-out select-none whitespace-nowrap ${hoverTextClass}`}
      >
        {children}
      </span>
    </button>
  );
}

export default memo(PillButton);