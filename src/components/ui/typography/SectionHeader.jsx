import React from "react";
export function SectionHeader({
  tag,
  title,
  subtitle,
  align = "left",
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={"flex flex-col ${alignClass} ${className}"}>
      {" "}
      {tag && (
        <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-amber-600 dark:text-amber-400 mb-4 block">
          {" "}
          {tag}{" "}
        </span>
      )}{" "}
      <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight">
        {" "}
        {title}{" "}
      </h2>{" "}
      {subtitle && (
        <p className="mt-4 font-sans text-sm md:text-base text-secondary-light dark:text-secondary-dark max-w-2xl">
          {" "}
          {subtitle}{" "}
        </p>
      )}{" "}
    </div>
  );
}
