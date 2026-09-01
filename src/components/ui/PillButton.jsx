// src/components/ui/PillButton.jsx

import { memo } from "react";

function PillButton({
  children,
  onClick,
  className = "",
  variant = "auto",
  bgClass: customBgClass,
  borderClass: customBorderClass,
  fillClass: customFillClass,
  hoverTextClass: customHoverTextClass,
  ...props
}) {
  // 1. Default: "auto" (Adapts to page theme)
  // Light Mode: Solid Obsidian -> Fills with White on hover -> Text turns Obsidian
  // Dark Mode:  Solid White -> Fills with Obsidian on hover -> Text turns Pure White
  let baseBgClass = "bg-slate-950 dark:bg-white shadow-md";
  let borderClass = "border border-slate-950 dark:border-white";
  let fillClass = "bg-white dark:bg-slate-950";
  let textClass = "text-white dark:text-slate-950 group-hover:text-slate-950 dark:group-hover:text-white";

  if (variant === "on-dark") {
    // 2. "on-dark" (For permanently dark sections: Hero, Footer, WhyChooseUs)
    // Solid White Button -> Fills with Obsidian on hover -> Text turns Pure White
    baseBgClass = "bg-white shadow-md";
    borderClass = "border border-white";
    fillClass = "bg-slate-950";
    textClass = "text-slate-950 group-hover:text-white";
  } else if (variant === "on-light") {
    // 3. "on-light" (For permanently light sections)
    // Solid Obsidian Button -> Fills with White on hover -> Text turns Obsidian
    baseBgClass = "bg-slate-950 shadow-md";
    borderClass = "border border-slate-950";
    fillClass = "bg-white";
    textClass = "text-white group-hover:text-slate-950";
  } else if (variant === "outline") {
    // 4. "outline" (Transparent with theme borders)
    baseBgClass = "bg-transparent";
    borderClass = "border border-black/25 dark:border-white/25";
    fillClass = "bg-slate-950 dark:bg-white";
    textClass = "text-primary-light dark:text-primary-dark group-hover:text-white dark:group-hover:text-slate-950";
  } else if (variant === "custom") {
    // 5. "custom" (Bypasses all defaults; relies purely on explicit props & className)
    baseBgClass = "";
    borderClass = "";
    fillClass = "bg-white";
    textClass = "";
  }

  // Allow explicit granular prop overrides over any variant
  const finalBgClass = customBgClass ?? baseBgClass;
  const finalBorderClass = customBorderClass ?? borderClass;
  const finalFillClass = customFillClass ?? fillClass;
  const finalTextClass = customHoverTextClass ?? textClass;

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-7 py-3 text-xs font-mono font-bold tracking-widest uppercase overflow-hidden rounded-full transition-all duration-300 group z-10 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${finalBgClass} ${finalBorderClass} ${className}`}
      {...props}
    >
      {/* Expanding Circular Fill on Hover */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240%] aspect-square rounded-full ${finalFillClass} scale-0 group-hover:scale-100 transition-transform duration-500 ease-out -z-10 pointer-events-none`}
      />

      {/* Horizontally Locked Inline Content with Guaranteed High-Contrast Colors */}
      <span
        className={`relative z-10 inline-flex items-center justify-center gap-2.5 transition-colors duration-300 ease-out select-none whitespace-nowrap ${finalTextClass}`}
      >
        {children}
      </span>
    </button>
  );
}

export default memo(PillButton);