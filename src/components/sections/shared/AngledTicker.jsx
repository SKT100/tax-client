import { Ribbon } from "../../ui/ribbon";

const TAX_MAXIMS = [
  "ACCURATE ADVICE",
  "PROPER COMPLIANCE",
  "COMPLETE PEACE OF MIND",
  "WE CARE, YOU GROW",
  "STATUTORY EXCELLENCE",
  "ZERO-PENALTY TARGETING",
];

const TAX_SERVICES = [
  "INCOME TAX (ITR 1-7)",
  "GST REGISTRATION & RETURNS",
  "TDS/TCS CORRECTIONS",
  "MSME (UDYAM) REGISTRATION",
  "TRADE LICENCE & PERMITS",
  "BOOKKEEPING ON TALLY",
  "SHOW CAUSE NOTICE DEFENSE",
];

export default function AngledTicker({
  ribbons,
  sectionPadding = "py-32 sm:py-44 md:py-56 lg:py-64",
  minHeight = "min-h-[500px] sm:min-h-[600px] md:min-h-[700px]",
}) {
  const activeRibbons = ribbons || [
    {
      items: TAX_MAXIMS,
      velocity: -0.22,
      rotation: "-rotate-[4.5deg] md:-rotate-[3deg]",
      bgClass: "bg-[#FBFBF9] dark:bg-[#F2F1ED] text-slate-950",
      borderClass: "border-y border-black/15",
      paddingClass: "py-6 sm:py-8 md:py-10 lg:py-12",
      textClass: "text-slate-950 font-serif font-light tracking-tight",
      textStyle: "text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase",
      separator: "✦",
      separatorClass: "text-amber-700 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none",
      zIndex: "z-20",
    },
    {
      items: TAX_SERVICES,
      velocity: 0.22,
      rotation: "rotate-[4.5deg] md:rotate-[3deg]",
      bgClass: "bg-[#09090C] text-slate-100",
      borderClass: "border-y border-white/15",
      paddingClass: "py-6 sm:py-8 md:py-10 lg:py-12",
      textClass: "text-slate-100 font-serif font-light tracking-wide",
      textStyle: "text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase",
      separator: "★",
      separatorClass: "text-amber-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none",
      zIndex: "z-10",
    },
  ];

  return (
    <section
      className={`relative w-full ${sectionPadding} select-none flex items-center justify-center overflow-hidden ${minHeight}`}
    >
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {activeRibbons.map((ribbonProps, index) => (
          <Ribbon key={index} {...ribbonProps} />
        ))}
      </div>
    </section>
  );
}