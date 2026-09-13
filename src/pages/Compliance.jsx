// src/pages/Compliance.jsx

import { memo } from "react";
import ComplianceCalendar from "../components/sections/compliance/ComplianceCalendar";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";
import FAQSection from "../components/sections/shared/FAQSection";
import { COMPLIANCE_FAQS } from "../data/faqsData";

function Compliance() {
  return (
    <div className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      
      {/* Dynamic Ribbon Banner */}
      <div className="pt-6 pb-2 border-b border-theme bg-black/[0.02] dark:bg-white/[0.02]">
        <ScrollVelocityRibbon baseVelocity={0.35}>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark px-4">
            CBDT STATUTORY NOTIFICATIONS ✦ CBIC GST DUE DATES ✦ TRACES TDS CUTOFFS ✦ WB P-TAX COMPLIANCE ✦
          </span>
        </ScrollVelocityRibbon>
      </div>

      {/* Main Statutory Due Date Engine */}
      <ComplianceCalendar />

      {/* Route-Specific Compliance & Deadline FAQs */}
      <div className="pb-16 sm:pb-24">
        <FAQSection
          id="compliance-faq"
          badge="STATUTORY DEADLINES & PENALTIES"
          title="Compliance & Penalty Directives"
          subtitle="Clear guidelines on statutory cutoffs, Section 234 late fees, GST interest liabilities, and P-Tax schedules."
          items={COMPLIANCE_FAQS}
          showCta={true}
        />
      </div>

    </div>
  );
}

export default memo(Compliance);