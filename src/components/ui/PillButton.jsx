export default function PillButton({
  children,
  onClick,
  className = "",
  variant = "highlight",
}) {
  // Balanced Editorial Palette: Warm Parchment (#F2F1ED) & Obsidian (#0F0F12)
  let baseBgClass = "bg-[#0F0F12] dark:bg-[#F2F1ED] shadow-sm";
  let borderClass = "border-[#0F0F12] dark:border-[#F2F1ED]";
  let textClass = "text-[#FBFBF9] dark:text-[#0F0F12]";
  let fillClass = "bg-[#F2F1ED] dark:bg-[#0F0F12]";
  let hoverTextClass =
    "group-hover:text-[#0F0F12] dark:group-hover:text-[#FBFBF9]";

  if (variant === "on-dark") {
    baseBgClass = "bg-transparent";
    borderClass = "border-white/25 hover:border-white/60";
    textClass = "text-[#FBFBF9]";
    fillClass = "bg-[#F2F1ED]";
    hoverTextClass = "group-hover:text-[#0F0F12]";
  } else if (variant === "on-light") {
    baseBgClass = "bg-transparent";
    borderClass = "border-black/25 hover:border-black/60";
    textClass = "text-[#0F0F12]";
    fillClass = "bg-[#0F0F12]";
    hoverTextClass = "group-hover:text-[#FBFBF9]";
  } else if (variant === "outline") {
    baseBgClass = "bg-transparent";
    borderClass = "border-black/20 dark:border-white/25";
    textClass = "text-primary-light dark:text-primary-dark";
    fillClass = "bg-[#0F0F12] dark:bg-[#F2F1ED]";
    hoverTextClass =
      "group-hover:text-[#FBFBF9] dark:group-hover:text-[#0F0F12]";
  }

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 text-xs font-mono font-bold tracking-widest uppercase overflow-hidden rounded-full border transition-all duration-300 group z-10 ${baseBgClass} ${borderClass} ${textClass} ${className}`}
    >
      {/* Expanding Circular Fill on Hover */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[230%] aspect-square rounded-full ${fillClass} scale-0 group-hover:scale-100 transition-transform duration-500 ease-out -z-10 pointer-events-none`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ease-out select-none ${hoverTextClass}`}
      >
        {children}
      </span>
    </button>
  );
}