// src/components/sections/shared/AngledTicker.jsx

import { Ribbon } from "../../ui/ribbon";
import { TICKER_PRESETS } from "../../../data/tickerData";

export default function AngledTicker({
  preset = "about",
  ribbons,
  sectionPadding = "py-32 sm:py-44 md:py-56 lg:py-64",
  minHeight = "min-h-[500px] sm:min-h-[600px] md:min-h-[700px]",
}) {
  const activeRibbons = ribbons || TICKER_PRESETS[preset] || TICKER_PRESETS.about;

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