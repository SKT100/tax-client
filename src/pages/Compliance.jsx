// src/pages/Compliance.jsx

import { memo } from "react";
import ComplianceCalendar from "../components/sections/compliance/ComplianceCalendar";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";

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

    </div>
  );
}

export default memo(Compliance);