import { ScrollVelocityRibbon } from "./ScrollVelocityRibbon";

export function Ribbon({
  items,
  velocity = -0.2,
  rotation = "-rotate-[4deg] md:-rotate-[2.8deg]",
  bgClass = "bg-surface-light",
  borderClass = "border-y border-black/15",
  paddingClass = "py-6 sm:py-8 md:py-10 lg:py-12",
  textClass = "text-slate-950 font-serif font-light tracking-tight",
  textStyle = "text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase",
  separator = "✦",
  separatorClass = "text-amber-700 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none",
  zIndex = "z-20",
}) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] md:w-[140vw] ${rotation} origin-center ${bgClass} ${borderClass} ${paddingClass} ${zIndex} flex items-center overflow-hidden pointer-events-none select-none`}
    >
      <ScrollVelocityRibbon baseVelocity={velocity}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 shrink-0"
          >
            <span
              className={`${textClass} ${textStyle} whitespace-nowrap transform-gpu will-change-transform`}
            >
              {item}
            </span>
            <span
              className={`${separatorClass} flex items-center justify-center shrink-0`}
              aria-hidden="true"
            >
              {separator}
            </span>
          </div>
        ))}
      </ScrollVelocityRibbon>
    </div>
  );
}