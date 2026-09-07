// src/components/sections/consultation/TaxScheduler.jsx

import { useEffect, useState, memo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ShieldCheck, Calendar, Clock } from "lucide-react";

function TaxScheduler() {
  const [isCalReady, setIsCalReady] = useState(false);

  useEffect(() => {
    // Defer third-party iframe mounting until main-thread idle
    const initCal = async () => {
      const cal = await getCalApi({ namespace: "test" });
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#D97706" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      setIsCalReady(true);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => initCal(), { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(initCal, 200);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div className="glass-card border border-theme rounded-3xl p-3 sm:p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
      
      {/* Embedded Cal.com Widget with Static Layout Reservation */}
      <div className="w-full min-h-[580px] rounded-2xl overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] relative flex items-center justify-center">
        {!isCalReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-secondary-light dark:text-secondary-dark font-mono text-xs animate-pulse">
            <Clock className="w-6 h-6 text-amber-500 animate-spin" />
            <span>CONNECTING SECURE CHAMBER CALENDAR...</span>
          </div>
        )}

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
      <div className="mt-3 pt-3 border-t border-theme flex flex-col sm:flex-row items-center justify-between px-2 gap-2 text-slate-700 dark:text-slate-300 font-mono text-[10px] tracking-wider uppercase">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>Privileged &amp; Confidential Consultation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <span>Google Calendar &amp; Video Meet Sync</span>
        </div>
      </div>

    </div>
  );
}

export default memo(TaxScheduler);