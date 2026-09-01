// src/components/sections/consultation/TaxScheduler.jsx

import { useEffect, memo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ShieldCheck, Calendar } from "lucide-react";

function TaxScheduler() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "test" });
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#D97706" }, // Amber tax accent
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="glass-card border border-theme rounded-3xl p-3 sm:p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
      
      {/* Real-time Embedded Cal.com Widget */}
      <div className="w-full min-h-[580px] rounded-2xl overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
        <Cal
          namespace="test"
          calLink="saikat-1qoapg/test"
          style={{ width: "100%", height: "100%", minHeight: "580px" }}
          config={{
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
            theme: "dark",
          }}
        />
      </div>

      {/* Privileged & Security Status Bar */}
      <div className="mt-3 pt-3 border-t border-theme flex flex-col sm:flex-row items-center justify-between px-2 gap-2 text-secondary-light dark:text-secondary-dark font-mono text-[10px] tracking-wider uppercase">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>Privileged &amp; Confidential</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <span>Google Calendar &amp; Meet Sync</span>
        </div>
      </div>

    </div>
  );
}

export default memo(TaxScheduler);