import { useRef } from "react";
import { TaxHero, LandmarkCases } from "../components/sections/services";
import ServiceDirectory from "../components/sections/services/ServiceDirectory";
import PracticeScrollThread from "../components/sections/services/PracticeScrollThread";
import RegionalReachMap from "../components/sections/contact/RegionalReachMap";
import AngledTicker from "../components/sections/shared/AngledTicker";

export default function Services() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen overflow-hidden"
    >
      {/* 🌟 Interactive Ambient Scroll Thread */}
      <PracticeScrollThread containerRef={containerRef} />

      <main className="relative z-10 w-full flex flex-col pb-[20vh]">
        <TaxHero />
        <ServiceDirectory />
        <LandmarkCases />
        <RegionalReachMap />
      </main>
    </div>
  );
}