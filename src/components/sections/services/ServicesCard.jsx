// src/components/sections/services/ServicesCard.jsx

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PillButton from "../../ui/PillButton";

function ServiceCard({
  item,
  index = 0,
  tag,
  title,
  description,
  footerLabel,
  buttonText = "Book Now",
  to,
  onClick,
  children,
}) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const displayTag = tag || item?.tag || item?.status;
  const displayTitle = title || item?.title;
  const displayDescription = description || item?.description;
  const displayFooterLabel = footerLabel || item?.footerLabel || "Direct Advisory";
  const targetUrl = to || (item?.id ? `/schedule?service=${item.id}` : null);

  const renderButton = () => (
    <PillButton
      variant="custom"
      bgClass="bg-white dark:bg-slate-950 shadow-md"
      borderClass="border border-white/20 dark:border-black/20"
      fillClass="bg-slate-950 dark:bg-white"
      hoverTextClass="text-slate-950 group-hover:text-white dark:text-white dark:group-hover:text-slate-950"
      className="px-7 py-2.5 min-w-[140px] text-xs font-mono font-bold tracking-widest uppercase"
      onClick={onClick}
    >
      <span>{buttonText}</span>
      <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </PillButton>
  );

  return (
    <div className="group/card relative rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 overflow-hidden shadow-xl border bg-[#0F0F12] text-white border-white/10 hover:border-white/30 dark:bg-[#F2F1ED] dark:text-slate-900 dark:border-black/10 dark:hover:border-black/30 dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
      
      {/* Top Ambient Flare */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Radial Hover Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/[0.04] dark:bg-black/[0.03] group-hover/card:scale-125 blur-2xl transition-all duration-500 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Card Header: Tag & Numeric Indicator */}
        <div className="flex items-center justify-between mb-4">
          {displayTag && (
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border bg-white/[0.06] text-white/70 border-white/10 dark:bg-black/[0.05] dark:text-slate-700 dark:border-black/10">
              {displayTag}
            </span>
          )}
          <span className="font-mono text-[10px] font-light text-white/40 dark:text-slate-400">
            {formattedIndex}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-serif text-xl sm:text-2xl font-light mb-3 leading-snug text-white dark:text-slate-950 transition-colors">
          {displayTitle}
        </h4>

        {/* Description or Custom Children */}
        {children ? (
          children
        ) : (
          displayDescription && (
            <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-white/65 dark:text-slate-600">
              {displayDescription}
            </p>
          )
        )}
      </div>

      {/* Card Footer: Sub-Label & Pill Button */}
      <div className="relative z-10 mt-8 pt-5 border-t border-white/10 dark:border-black/10 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 dark:text-slate-400">
          {displayFooterLabel}
        </span>

        {targetUrl ? (
          <Link to={targetUrl} className="inline-flex items-center no-underline">
            {renderButton()}
          </Link>
        ) : (
          renderButton()
        )}
      </div>
    </div>
  );
}

export default memo(ServiceCard);