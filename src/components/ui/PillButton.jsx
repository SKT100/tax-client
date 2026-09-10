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
  href,
  download,
  target,
  rel,
  ...props
}) {
  let baseBgClass = "bg-slate-950 dark:bg-white shadow-md";
  let borderClass = "border border-slate-950 dark:border-white";
  let fillClass = "bg-white dark:bg-slate-950";
  let textClass = "text-white dark:text-slate-950 group-hover:text-slate-950 dark:group-hover:text-white";

  if (variant === "on-dark") {
    baseBgClass = "bg-white shadow-md";
    borderClass = "border border-white";
    fillClass = "bg-slate-950";
    textClass = "text-slate-950 group-hover:text-white";
  } else if (variant === "on-light") {
    baseBgClass = "bg-slate-950 shadow-md";
    borderClass = "border border-slate-950";
    fillClass = "bg-white";
    textClass = "text-white group-hover:text-slate-950";
  } else if (variant === "outline") {
    baseBgClass = "bg-transparent";
    borderClass = "border border-black/25 dark:border-white/25";
    fillClass = "bg-slate-950 dark:bg-white";
    textClass = "text-primary-light dark:text-primary-dark group-hover:text-white dark:group-hover:text-slate-950";
  } else if (variant === "custom") {
    baseBgClass = "";
    borderClass = "";
    fillClass = "bg-white";
    textClass = "";
  }

  const finalBgClass = customBgClass ?? baseBgClass;
  const finalBorderClass = customBorderClass ?? borderClass;
  const finalFillClass = customFillClass ?? fillClass;
  const finalTextClass = customHoverTextClass ?? textClass;

  const combinedClassName = `relative inline-flex items-center justify-center px-7 py-3 text-xs font-mono font-bold tracking-widest uppercase overflow-hidden rounded-full transition-all duration-300 group z-10 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98] no-underline ${finalBgClass} ${finalBorderClass} ${className}`;

  const innerContent = (
    <>
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240%] aspect-square rounded-full ${finalFillClass} scale-0 group-hover:scale-100 transition-transform duration-500 ease-out -z-10 pointer-events-none`}
      />
      <span
        className={`relative z-10 inline-flex items-center justify-center gap-2.5 transition-colors duration-300 ease-out select-none whitespace-nowrap ${finalTextClass}`}
      >
        {children}
      </span>
    </>
  );

  // Render a native <a> tag if href is passed
  if (href) {
    return (
      <a
        href={href}
        download={download ?? true}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        onClick={(e) => {
          e.stopPropagation(); // 👈 Prevents React Router from catching the click
          if (onClick) onClick(e);
        }}
        className={combinedClassName}
        {...props}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName} {...props}>
      {innerContent}
    </button>
  );
}

export default memo(PillButton);