
import { memo } from "react";

export function GlassCard({
  children,
  className = "",
  hoverEffect = false,
  ...props
}) {
  const hoverClass = hoverEffect
    ? "transition-all duration-500 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:-translate-y-0.5"
    : "";

  return (
    <div
      className={`glass-card border border-theme rounded-2xl md:rounded-3xl p-6 sm:p-8 transition-colors duration-300 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(GlassCard);