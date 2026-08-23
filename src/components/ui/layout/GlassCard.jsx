import React from "react";
export function GlassCard({ children, className = "", hoverEffect = false }) {
  const hoverClass = hoverEffect
    ? "transition-colors duration-500 hover:border-theme hover:bg-black/10 dark:hover:bg-surface-light/10"
    : "";
  return (
    <div
      className={
        "border border-theme bg-surface-dark/5 dark:bg-surface-light/5 backdrop-blur-md rounded-3xl ${hoverClass} ${className}"
      }
    >
      {" "}
      {children}{" "}
    </div>
  );
}
