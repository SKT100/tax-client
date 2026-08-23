import { ScrollVelocityRibbon } from "./ScrollVelocityRibbon";
export function Ribbon({
  items,
  velocity = -0.2,
  rotation = "-rotate-[6deg] md:-rotate-[3.2deg]",
  bgClass = "bg-surface-light",
  textClass = "text-slate-950 font-serif",
  borderClass = "border-y border-black/15",
  paddingClass = "py-5 md:py-7 xl:py-10 2xl:py-12",
  textStyle = "text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-[0.18em] uppercase",
  separator = "✷",
  separatorClass = "text-amber-700/80 text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  zIndex = "z-20",
  shadowClass = "shadow-xl",
}) {
  return (
    <div
      className={`absolute w-[140vw] ${rotation} origin-center ${bgClass} ${borderClass} ${paddingClass} ${zIndex} ${shadowClass}`}
    >
      {" "}
      <ScrollVelocityRibbon baseVelocity={velocity}>
        {" "}
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 md:gap-12 lg:gap-16"
          >
            {" "}
            <span className={`${textClass} ${textStyle} font-normal`}>
              {" "}
              {item}{" "}
            </span>{" "}
            <span className={`${separatorClass} select-none`}>
              {separator}
            </span>{" "}
          </div>
        ))}{" "}
      </ScrollVelocityRibbon>{" "}
    </div>
  );
}
