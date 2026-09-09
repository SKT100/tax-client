// src/pages/Disclaimer.jsx

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function Disclaimer() {
  return (
    <div className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop space-y-8">
        
        {/* Top Return Button */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors no-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-2 border-b border-theme pb-6">
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block">
            STATUTORY DISCLOSURES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-primary-light dark:text-primary-dark">
            Professional Disclaimer
          </h1>
          <p className="font-body text-xs text-secondary-light dark:text-secondary-dark">
            Matrix Tax Solutions — Partha Pratim Halder
          </p>
        </div>

        {/* Clauses */}
        <div className="space-y-8 font-body text-xs sm:text-sm font-light text-secondary-light dark:text-secondary-dark leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              01. Statutory Notice &amp; Formal Representation
            </h2>
            <p>
              Reviewing or discussing a statutory notice (such as Section 148, DRC-01, or ASMT-10) does not automatically constitute formal professional representation. Reply drafting, portal filing, appearances, personal hearings, or communication with statutory authorities shall commence only after the relevant scope of work and professional fees have been mutually confirmed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              02. Website, Circulars &amp; Tax Insights
            </h2>
            <p>
              All tax updates, notifications, circulars, articles, calculators, and tax insights published by Matrix Tax Solutions are intended for general informational and educational purposes only. They should not be treated as case-specific professional advice. Tax laws, rules, circulars, and departmental guidelines may change from time to time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              03. Outcome Disclaimer
            </h2>
            <p>
              While reasonable professional care and statutory defense standards shall be exercised, no particular outcome, approval, refund issuance, assessment result, waiver, or decision by any statutory or appellate authority is guaranteed.
            </p>
          </section>

        </div>

        {/* Bottom Return Button */}
        <div className="pt-8 border-t border-theme">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-theme text-xs font-mono font-bold tracking-widest uppercase text-primary-light dark:text-primary-dark hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all no-underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default memo(Disclaimer);