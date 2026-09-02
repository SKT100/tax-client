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
  bgImage,
  onClick,
  children,
}) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const displayTag = tag || item?.tag || item?.status;
  const displayTitle = title || item?.title;
  const displayDescription = description || item?.description;
  const displayFooterLabel = footerLabel || item?.footerLabel || "Direct Advisory";
  const targetUrl = to || (item?.id ? `/schedule?service=${item.id}` : null);
  const cardBg = bgImage || item?.bgImage || null;

  const renderButton = () => (
    <PillButton
      variant="custom"
      bgClass="bg-white dark:bg-slate-950 shadow-md"
      borderClass="border border-white/20 dark:border-black/20"
      fillClass="bg-slate-950 dark:bg-white"
      hoverTextClass="text-slate-950 group-hover:text-white dark:text-white dark:group-hover:text-slate-950"
      className="px-6 sm:px-7 py-2.5 min-w-[130px] text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
      onClick={onClick}
    >
      <span>{buttonText}</span>
      <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </PillButton>
  );

  return (
    <div className="group/card relative rounded-2xl md:rounded-3xl p-6 sm:p-7 min-h-[290px] sm:min-h-[310px] w-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 overflow-hidden shadow-xl border bg-[#0F0F12] text-white border-white/10 hover:border-white/30 dark:bg-[#F2F1ED] dark:text-slate-900 dark:border-black/10 dark:hover:border-black/30 dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform-gpu">
      
      {/* Top Ambient Flare */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Radial Hover Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/[0.04] dark:bg-black/[0.03] group-hover/card:scale-125 blur-2xl transition-all duration-500 pointer-events-none z-10" />

      {/* Adaptive Topographic Contour Background */}
      {cardBg && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <img
            src={cardBg}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="w-full h-full object-cover object-top mix-blend-screen opacity-80 brightness-[2.2] contrast-125 group-hover/card:scale-105 group-hover/card:opacity-95 dark:mix-blend-multiply dark:invert dark:opacity-70 dark:brightness-[2.2] dark:contrast-125 dark:group-hover/card:opacity-90 transition-all duration-700 transform-gpu"
          />
          {/* Subtle Bottom Shade strictly behind action bar */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0F0F12]/80 dark:from-[#F2F1ED]/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {displayTag && (
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border bg-white/[0.08] text-white/90 border-white/15 dark:bg-black/[0.06] dark:text-slate-900 dark:border-black/15 backdrop-blur-sm">
              {displayTag}
            </span>
          )}
          <span className="font-mono text-[10px] font-semibold text-white/60 dark:text-slate-600">
            {formattedIndex}
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-light mb-3 leading-snug text-white dark:text-slate-950 transition-colors">
          {displayTitle}
        </h3>

        {children ? (
          children
        ) : (
          displayDescription && (
            <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-white/80 dark:text-slate-700">
              {displayDescription}
            </p>
          )
        )}
      </div>

      {/* Card Footer */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 dark:border-black/10 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 dark:text-slate-600 truncate">
          {displayFooterLabel}
        </span>

        {targetUrl ? (
          <Link to={targetUrl} className="inline-flex items-center no-underline shrink-0">
            {renderButton()}
          </Link>
        ) : (
          <div className="shrink-0">{renderButton()}</div>
        )}
      </div>
    </div>
  );
}

export default memo(ServiceCard);