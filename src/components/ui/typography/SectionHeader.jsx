// src/components/ui/typography/SectionHeader.jsx

import { memo } from "react";

function SectionHeader({
  tag,
  title,
  italicTitle = "",
  subtitle,
  align = "left",
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {tag && (
        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark mb-3 block">
          {tag}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark leading-[1.08] tracking-tight">
        {title}
        {italicTitle && (
          <>
            {" "}
            <span className="italic font-light opacity-90">{italicTitle}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 font-body font-light text-sm sm:text-base text-secondary-light dark:text-secondary-dark max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default memo(SectionHeader);