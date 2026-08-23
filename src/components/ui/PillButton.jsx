export default function PillButton({
  children,
  onClick,
  className = "",
  variant = "auto",
}) {
  let borderClass = "border-black/20 dark:border-white/30";
  let textClass = "text-primary-light dark:text-primary-dark";
  let fillClass = "bg-slate-900 dark:bg-surface-light";
  let hoverTextClass =
    "group-hover:text-primary-dark dark:group-hover:text-slate-900";

  if (variant === "on-dark") {
    borderClass = "border-white/30";
    textClass = "text-primary-dark";
    fillClass = "bg-surface-light";
    hoverTextClass = "group-hover:text-slate-900";
  } else if (variant === "on-light") {
    borderClass = "border-black/30";
    textClass = "text-slate-900";
    fillClass = "bg-slate-900";
    hoverTextClass = "group-hover:text-primary-dark";
  } else if (variant === "inverted") {
    borderClass = "border-white/30 dark:border-black/30";
    textClass = "text-primary-dark dark:text-slate-900";
    fillClass = "bg-surface-light dark:bg-slate-900";
    hoverTextClass =
      "group-hover:text-slate-900 dark:group-hover:text-primary-dark";
  }

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold uppercase tracking-widest overflow-hidden rounded-full border ${borderClass} ${textClass} group z-10 transition-colors ${className}`}
    >
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] aspect-square rounded-full ${fillClass} scale-0 group-hover:scale-100 transition-transform duration-700 ease-in-out -z-10`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${hoverTextClass}`}
      >
        {children}
      </span>
    </button>
  );
}
