// src/components/sections/consultation/TaxScheduler.jsx

import { useState, useEffect, memo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

function TaxScheduler() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer heavy Cal.com scheduler script to eliminate TBT
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(() => setIsLoaded(true), { timeout: 1200 })
      : setTimeout(() => setIsLoaded(true), 300);

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    (async function initCal() {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#0F0F12" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (e) {
        console.error("Cal.com init error:", e);
      }
    })();
  }, [isLoaded]);

  return (
    <div
      id="tax-scheduler-frame"
      className="glass-card rounded-3xl border border-theme p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-center"
    >
      {isLoaded ? (
        <Cal
          calLink="partha-tax/consultation"
          style={{ width: "100%", height: "100%", minHeight: "560px", overflow: "auto" }}
          config={{ layout: "month_view", theme: "dark" }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-theme border-t-emerald-500 animate-spin" />
          <span className="font-mono text-xs text-secondary-light dark:text-secondary-dark tracking-widest uppercase">
            Loading Statutory Calendar...
          </span>
        </div>
      )}
    </div>
  );
}

export default memo(TaxScheduler);