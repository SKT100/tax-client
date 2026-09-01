// src/pages/Services.jsx

import { useRef, memo } from "react";
import { TaxHero } from "../components/sections/services";
import ServiceDirectory from "../components/sections/services/ServiceDirectory";
import PracticeScrollThread from "../components/sections/services/PracticeScrollThread";
import WhyChooseUs from "../components/sections/shared/WhyChooseUs";
import RegionalReachMap from "../components/sections/contact/RegionalReachMap";
import FAQSection from "../components/sections/shared/FAQSection";
import TestimonialsSection from "../components/sections/shared/TestimonialsSection";

function Services() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen overflow-hidden"
    >
      {/* Interactive Ambient Scroll Thread */}
      <PracticeScrollThread containerRef={containerRef} />

      <main className="relative z-10 w-full flex flex-col">
        <TaxHero />
        <ServiceDirectory />
        <div className="space-y-16 py-8">
          <WhyChooseUs />
          <TestimonialsSection />
          <FAQSection
            title="Frequently Asked Directives"
            subtitle="Everything you need to know about retained tax compliance, bookkeeping schedules, and notice defense."
          />
          <RegionalReachMap />
        </div>
      </main>
    </div>
  );
}

export default memo(Services);