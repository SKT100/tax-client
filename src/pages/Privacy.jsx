// src/pages/Privacy.jsx

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function Privacy() {
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
            CLIENT CONFIDENTIALITY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-primary-light dark:text-primary-dark">
            Privacy &amp; Data Policy
          </h1>
          <p className="font-body text-xs text-secondary-light dark:text-secondary-dark">
            Matrix Tax Solutions — Partha Pratim Halder
          </p>
        </div>

        {/* Clauses */}
        <div className="space-y-8 font-body text-xs sm:text-sm font-light text-secondary-light dark:text-secondary-dark leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              01. Confidentiality Standard
            </h2>
            <p>
              All client information, PAN details, GST credentials, audit statements, ledgers, and Show Cause Notice records shared with Matrix Tax Solutions are handled with strict professional confidentiality subject to applicable Indian statutory laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              02. Collection &amp; Use of Information
            </h2>
            <p>
              Personal and business records collected via consultation bookings, email, or WhatsApp are used exclusively for computing tax liabilities, e-filing statutory returns, preparing legal notice responses, and verifying portal credentials. We do not sell, distribute, or monetize client information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              03. Document Custody &amp; Retention
            </h2>
            <p>
              Working papers and digital files submitted for annual filings or notice rebuttals are stored securely. Clients may request the return or deletion of digital copies after final filing acknowledgments or order receipts have been delivered.
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

export default memo(Privacy);