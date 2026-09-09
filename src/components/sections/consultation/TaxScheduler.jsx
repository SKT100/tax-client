// src/components/sections/consultation/TaxScheduler.jsx

import { useState, useEffect, memo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "../../../data/siteConfig";

function TaxScheduler() {
  const [isLoaded, setIsLoaded] = useState(false);
  const calLink = SITE_CONFIG?.contact?.calLink || "";

  useEffect(() => {
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
    if (!isLoaded || !calLink) return;

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
  }, [isLoaded, calLink]);

  return (
    <div
      id="tax-scheduler-frame"
      className="glass-card rounded-3xl border border-theme p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-center"
    >
      {isLoaded && calLink ? (
        <Cal
          calLink={calLink}
          title="Matrix Tax Solutions Appointment Booking Calendar"
          style={{ width: "100%", height: "100%", minHeight: "560px", overflow: "auto" }}
          config={{ layout: "month_view", theme: "dark" }}
        />
      ) : isLoaded && !calLink ? (
        <div className="flex flex-col items-center justify-center space-y-5 py-16 text-center max-w-md mx-auto px-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-light text-primary-light dark:text-primary-dark">
              Direct Chamber Booking
            </h3>
            <p className="font-body text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
              Schedule your 1-on-1 direct tax or GST consultation directly with the principal desk via WhatsApp or direct chamber phone.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book consultation via WhatsApp"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-all no-underline w-full"
            >
              <span>WhatsApp Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              aria-label={`Call Chambers at ${SITE_CONFIG.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-widest uppercase border border-theme text-primary-light dark:text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 transition-all no-underline w-full"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>
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