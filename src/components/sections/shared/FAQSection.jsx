// src/components/sections/shared/FAQSection.jsx

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PillButton from "../../ui/PillButton";

const DEFAULT_FAQS = [
  {
    id: "01",
    question: "How do you handle Income Tax scrutiny notices and Section 148 reassessments?",
    answer:
      "We provide complete legal representation under the Faceless Assessment Scheme. Our counsel covers forensic reconstruction of cash flows, preparation of point-by-point statutory submissions, documentation of legitimate capital sources, and filing written objections before the National Faceless Assessment Centre (NFAC).",
  },
  {
    id: "02",
    question: "What is your process for GSTR-2B vs 3B ITC mismatch dispute resolution?",
    answer:
      "We run automated invoice-level matching across multi-year purchase registers to pinpoint supplier defaults, timing differences, and ineligible credits. We then draft formal replies to DRC-01/01A notices and represent assessees before Commercial Tax Divisions to quash penalty liabilities.",
  },
  {
    id: "03",
    question: "How do you guarantee zero late fees and on-time statutory submissions?",
    answer:
      "Every client account is tied to an automated compliance calendar with a mandatory 5-day pre-deadline buffer. This accounts for portal congestions, bank challan clearing delays, and multi-tier partner reviews before final submission.",
  },
  {
    id: "04",
    question: "What retainer models are available for emerging businesses and MSMEs?",
    answer:
      "We offer fixed monthly and quarterly retainers covering all routine compliance (GST, TDS, Payroll, and P-Tax) as well as transactional milestone billing for statutory audits, company incorporation, and appellate representations. There are zero hidden consultation retainers.",
  },
  {
    id: "05",
    question: "How are financial records and confidential corporate filings secured?",
    answer:
      "All balance sheets, ledger exports, and identification documents are stored within an encrypted, permission-gated digital vault. We maintain strict non-disclosure compliance and audit trails for all sensitive statutory records.",
  },
  {
    id: "06",
    question: "Can you assist with multi-state GST registrations and compliance?",
    answer:
      "Yes. We structure regional tax presence, obtain state-specific GSTINs, manage input tax credit distribution mechanisms, and maintain unified monthly reporting across all active operational jurisdictions.",
  },
];

function FAQSection({
  id = "faq",
  badge = "FREQUENTLY ASKED QUESTIONS",
  title = "Frequently Asked Directives",
  subtitle = "Everything you need to know about retained tax compliance, bookkeeping schedules, and notice defense.",
  items = DEFAULT_FAQS,
  showCta = true,
}) {
  const [openId, setOpenId] = useState(items[0]?.id || "01");

  const toggleAccordion = (faqId) => {
    setOpenId((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <section id={id} className="relative z-20 py-20 sm:py-28 md:py-36 w-full">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-theme mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-secondary-light dark:text-secondary-dark" />
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark leading-[1.08] tracking-tight mb-5">
            {title}
          </h2>
          <div className="w-12 h-px bg-theme mb-5" />
          {subtitle && (
            <p className="font-body font-light text-sm sm:text-base text-secondary-light dark:text-secondary-dark leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Adaptive Glassmorphic Accordion Cards */}
        <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "glass-card border-black/20 dark:border-white/25 shadow-lg"
                    : "border-theme bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-7 flex items-start justify-between gap-5 sm:gap-8 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5 sm:gap-5">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest mt-0.5 sm:mt-1 text-secondary-light dark:text-secondary-dark">
                      {faq.id}
                    </span>
                    <h3 className="font-serif text-base sm:text-xl md:text-2xl font-light tracking-tight leading-snug text-primary-light dark:text-primary-dark">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark border-transparent"
                        : "border-theme text-secondary-light dark:text-secondary-dark bg-transparent"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-7 sm:pb-7 pt-0 pl-11 sm:pl-16 pr-6 sm:pr-12 border-t border-theme mt-1">
                        <p className="font-body font-light text-xs sm:text-sm md:text-[15px] leading-relaxed text-secondary-light dark:text-secondary-dark pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {showCta && (
          <div className="mt-14 sm:mt-18 md:mt-22 pt-10 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <h4 className="font-serif text-lg sm:text-xl font-light text-primary-light dark:text-primary-dark mb-1">
                Still have unanswered statutory questions?
              </h4>
              <p className="font-body font-light text-xs sm:text-sm text-secondary-light dark:text-secondary-dark">
                Reach out to our direct advisory desk for clarification on notices or filings.
              </p>
            </div>

            <Link to="/schedule" className="inline-block group/btn no-underline shrink-0">
              <PillButton
                variant="auto"
                className="px-7 py-3 rounded-full font-mono text-xs font-bold tracking-widest uppercase shadow-md"
              >
                <span>Contact Desk</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </PillButton>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(FAQSection);