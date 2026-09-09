// src/pages/Terms.jsx

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

function Terms() {
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
            STATUTORY COMPLIANCE &amp; ENGAGEMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-primary-light dark:text-primary-dark">
            Client Terms &amp; Conditions
          </h1>
          <p className="font-body text-xs text-secondary-light dark:text-secondary-dark">
            Matrix Tax Solutions — Partha Pratim Halder
          </p>
        </div>

        {/* Clauses */}
        <div className="space-y-8 font-body text-xs sm:text-sm font-light text-secondary-light dark:text-secondary-dark leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              01. Scope of Services
            </h2>
            <p>
              Matrix Tax Solutions provides professional statutory services relating to Accounting, GST periodic compliance, Income Tax (ITR e-filing &amp; assessments), TDS/TCS, Tax Advisory, and Statutory Notice Assistance as specifically agreed with the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              02. Initial Consultation &amp; Notice Review
            </h2>
            <p>
              Initial consultation and preliminary review of a statutory notice may be provided on a complimentary basis at the discretion of Matrix Tax Solutions. Detailed scrutiny, reply drafting, electronic filing, personal hearings, representation, and follow-up assistance are subject to applicable professional fees agreed with the client in advance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              03. Professional Fees
            </h2>
            <p>
              Professional fees are determined according to the nature, transactional complexity, and scope of the assignment. Services requested outside the agreed baseline scope will attract additional professional charges subject to prior communication and approval.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              04. Client Responsibility
            </h2>
            <p>
              The client is solely responsible for providing complete, accurate, authentic, and timely information and supporting financial records. Matrix Tax Solutions shall not be responsible for statutory interest, late fees, penalties, or adverse assessments arising from incomplete, inaccurate, misleading, or delayed submissions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-normal text-primary-light dark:text-primary-dark">
              05. Engagement Acceptance
            </h2>
            <p>
              A professional engagement becomes effective only when the scope of work, professional fees, and applicable terms have been mutually agreed upon and accepted by both the client and Matrix Tax Solutions.
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

export default memo(Terms);