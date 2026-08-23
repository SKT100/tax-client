import {
  Ribbon,
  DEFAULT_LATIN_MAXIMS,
  DEFAULT_LEGAL_TERMS,
} from "../../ui/ribbon";
export default function AngledTicker({
  ribbons,
  sectionPadding = "pt-24 md:pt-36 lg:pt-44 pb-20 md:pb-28",
  minHeight = "min-h-[380px] xl:min-h-[460px]",
}) {
  const activeRibbons = ribbons || [
    {
      items: DEFAULT_LATIN_MAXIMS,
      velocity: -0.2,
      rotation: "-rotate-[6deg] md:-rotate-[3.2deg]",
      bgClass: "bg-surface-light",
      textClass: "text-slate-950 font-serif",
      borderClass: "border-y border-black/15",
      separator: (
        <img
          loading="lazy"
          decoding="async"
          src="/images/ashok-emblem-icon.svg"
          alt="Emblem"
          className="h-[1.5em] w-auto opacity-80 mx-2 inline-block"
        />
      ),
      separatorClass:
        "text-amber-700/80 text-xl md:text-2xl lg:text-3xl xl:text-4xl",
      zIndex: "z-20",
    },
    {
      items: DEFAULT_LEGAL_TERMS,
      velocity: 0.2,
      rotation: "rotate-[6deg] md:rotate-[3.2deg]",
      bgClass: "bg-[#0D0D0F]",
      textClass: "text-primary-dark font-serif",
      borderClass: "border-y border-theme",
      separator: "✪",
      separatorClass:
        "text-amber-400/80 text-xl md:text-2xl lg:text-3xl xl:text-4xl",
      zIndex: "z-10",
    },
  ];
  return (
    <section
      className={`relative ${sectionPadding} select-none my-4 flex items-center justify-center ${minHeight}`}
    >
      {" "}
      <div className="relative w-full flex items-center justify-center">
        {" "}
        {activeRibbons.map((ribbonProps, index) => (
          <Ribbon key={index} {...ribbonProps} />
        ))}{" "}
      </div>{" "}
    </section>
  );
}
