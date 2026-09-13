// src/pages/Locations.jsx

import { memo } from "react";
import ChamberMapCard from "../components/ui/ChamberMapCard";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";
import ServiceCard from "../components/sections/services/ServicesCard";
import FAQSection from "../components/sections/shared/FAQSection";
import { MUNICIPAL_CLUSTERS, REGIONAL_FAQS } from "../data/locationsData";

// Format regional FAQs to match FAQSection prop structure
const formattedRegionalFaqs = REGIONAL_FAQS.map((faq, idx) => ({
  id: String(idx + 1).padStart(2, "0"),
  question: faq.q || faq.question,
  answer: faq.a || faq.answer,
}));

function Locations() {
  return (
    <div className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300">

      {/* Dynamic Ribbon Banner */}
      <div className="pt-2 pb-2 border-b border-theme bg-black/[0.02] dark:bg-white/[0.02]">
        <ScrollVelocityRibbon baseVelocity={0.3}>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark px-4">
            GRAND TRUNK ROAD INDUSTRIAL BELT ✦ HOOGHLY MUNICIPAL DESKS ✦ GREATER KOLKATA CORPORATE NETWORK ✦ BAIDYABATI CHAMBERS ✦
          </span>
        </ScrollVelocityRibbon>
      </div>

      <main className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 space-y-12 sm:space-y-16 md:space-y-20">

        {/* Section 1: Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold block mb-2">
            REGIONAL JURISDICTIONAL NETWORK
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-3">
            Grand Trunk Road &amp; <br />
            <span className="italic font-light opacity-90">Municipal Desks</span>
          </h1>
          <p className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
            Statutory tax representation, municipal licensing, and GST advisory across the Hooghly industrial corridor and Greater Kolkata.
          </p>
        </div>

        {/* Section 2: Chamber Interactive Map */}
        <div>
          <ChamberMapCard />
        </div>

        {/* Section 3: Municipal Jurisdictional Grid */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-theme">
            <div>
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-2">
                JURISDICTIONAL COVERAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                Municipal <span className="italic font-light opacity-90">Clusters &amp; PINs</span>
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark font-bold">
              {MUNICIPAL_CLUSTERS.length} Dedicated Desks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MUNICIPAL_CLUSTERS.map((cluster, index) => (
              <ServiceCard
                key={cluster.id}
                index={index}
                tag={cluster.status}
                title={cluster.title}
                description={`${cluster.zone} • ${cluster.jurisdiction}`}
                footerLabel={`PIN: ${cluster.pinCodes.join(", ")}`}
                buttonText="View Desk"
                to={`/locations/${cluster.id}`}
                bgImage="/images/location-bg.webp"
              />
            ))}
          </div>
        </div>

        {/* Section 4: Reused Shared FAQ Component */}
        <FAQSection
          id="regional-faq"
          badge="STATUTORY INQUIRIES"
          title="Regional Practice Directives"
          subtitle=""
          items={formattedRegionalFaqs}
          showCta={false}
        />

      </main>
    </div>
  );
}

export default memo(Locations);