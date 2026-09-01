// src/pages/Schedule.jsx

import { memo } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  CheckCircle2,
  Zap,
  ArrowRight,
} from "lucide-react";
import TaxScheduler from "../components/sections/consultation/TaxScheduler";
import ChamberMapCard from "../components/ui/ChamberMapCard";
import FAQSection from "../components/sections/shared/FAQSection";
import PillButton from "../components/ui/PillButton";
import { SITE_CONFIG } from "../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const CONSULTATION_STEPS = [
  {
    step: "01",
    title: "Reserve Open Slot",
    desc: "Select a 30-min window on Google Meet or book an in-person chamber slot at Baidyabati.",
  },
  {
    step: "02",
    title: "Document Evaluation",
    desc: "Share prior ITRs, GSTR-2B ledgers, or Show Cause Notices securely over encrypted channels.",
  },
  {
    step: "03",
    title: "Statutory Defense Plan",
    desc: "Receive an actionable compliance strategy, filing timeline, and legal notice rebuttal roadmap.",
  },
];

const PRE_MEETING_CHECKLIST = [
  "Assessment Year & PAN details",
  "Portal login access (Income Tax / GST)",
  "Scanned copy of Departmental Notice / SCN",
  "Relevant bank statements or purchase ledgers",
];

const SCHEDULING_FAQS = [
  {
    question: "How do virtual Google Meet consultations work?",
    answer:
      "Once you select a time slot, a Google Meet link and calendar invitation are immediately sent to your email. You can present documents on-screen for live verification.",
  },
  {
    question: "Can I bring original paper notices to the Baidyabati chambers?",
    answer:
      "Yes. Select the 'In Person / Chambers' location during booking to meet at our Baidyabati Head Office on GT Road with your case files.",
  },
  {
    question: "What if my statutory notice response deadline is within 48 hours?",
    answer:
      "For urgent DRC-01, Section 148, or appellate deadlines, bypass the regular scheduler and message the emergency WhatsApp desk directly for same-day triage.",
  },
  {
    question: "Are case facts and client disclosures confidential?",
    answer:
      "All consultations, document reviews, and communications are strictly privileged and held in statutory confidence under professional practice standards.",
  },
];

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Schedule() {
  const whatsappNumber = (
    SITE_CONFIG?.contact?.phoneRaw || "919007064088"
  ).replace("+", "");

  return (
    <div className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen">
      <main className="relative z-10 w-full pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16 sm:space-y-24">
          
          {/* ========================================================= */}
          {/*   1. HERO SECTION: BALANCED 2-COLUMN GRID                */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Heading, Emergency WhatsApp & Pre-Meeting Checklist */}
            <motion.div
              className="lg:col-span-5 flex flex-col space-y-6 pt-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div>
                <motion.h1
                  variants={fadeUp}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-primary-light dark:text-primary-dark"
                >
                  Schedule Your <br />
                  <span className="italic font-light opacity-90">Tax Consultation</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="font-body font-light text-sm sm:text-base text-secondary-light dark:text-secondary-dark leading-relaxed mt-3"
                >
                  Confidential Direct Tax advocacy, GST reconciliation, Section 148 notice defense, and corporate statutory compliance.
                </motion.p>
              </div>

              {/* Emergency WhatsApp Notice Action Card */}
              <motion.div
                variants={fadeUp}
                className="p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Urgent Notice Defense?
                  </span>
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                    &lt; 2-Hr SLA
                  </span>
                </div>

                <p className="font-body text-xs text-secondary-light dark:text-secondary-dark font-light leading-relaxed">
                  If you have an impending 7-day or 15-day statutory notice cutoff (GST DRC-01 / Section 148), message our emergency desk directly.
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "*URGENT STATUTORY NOTICE DEFENSE*\n------------------------\nI have received a time-sensitive notice and require immediate assistance."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block no-underline pt-1"
                >
                  <PillButton
                    variant="custom"
                    bgClass="bg-emerald-600 dark:bg-emerald-500 shadow-md"
                    borderClass="border border-emerald-600 dark:border-emerald-500"
                    fillClass="bg-slate-950 dark:bg-white"
                    hoverTextClass="text-white group-hover:text-white dark:group-hover:text-slate-950"
                    className="px-6 py-2.5 text-xs font-mono font-bold tracking-widest uppercase"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0 fill-current" />
                    <span>WhatsApp Emergency Desk</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </PillButton>
                </a>
              </motion.div>

              {/* Document Preparation Checklist Box */}
              <motion.div
                variants={fadeUp}
                className="glass-card p-5 sm:p-6 rounded-2xl md:rounded-3xl border border-theme space-y-3"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-light dark:text-secondary-dark block">
                  Recommended For Your Call
                </span>
                <div className="space-y-2">
                  {PRE_MEETING_CHECKLIST.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs font-body font-light text-secondary-light dark:text-secondary-dark"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Direct Reach Pill Buttons */}
              <motion.div
                variants={fadeUp}
                className="pt-2 flex flex-wrap items-center gap-3"
              >
                <a
                  href={`tel:${SITE_CONFIG?.contact?.phoneRaw || "+919007064088"}`}
                  className="no-underline"
                >
                  <PillButton
                    variant="outline"
                    className="px-5 py-2 text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{SITE_CONFIG?.contact?.phone || "+91 9007064088"}</span>
                  </PillButton>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG?.contact?.email || "tcparthahalder1984@gmail.com"}`}
                  className="no-underline"
                >
                  <PillButton
                    variant="outline"
                    className="px-5 py-2 text-[11px]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Chambers</span>
                  </PillButton>
                </a>
              </motion.div>

            </motion.div>

            {/* Right Column: Embedded Cal.com Scheduler */}
            <div className="lg:col-span-7">
              <TaxScheduler />
            </div>

          </div>

          {/* ========================================================= */}
          {/*   2. 3-STEP CONSULTATION WORKFLOW BLUEPRINT              */}
          {/* ========================================================= */}
          <div className="space-y-8 pt-10 border-t border-theme">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block">
                ADVISORY BLUEPRINT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                How Consultation <span className="italic font-light opacity-90">Works</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONSULTATION_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="glass-card border border-theme rounded-2xl md:rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden shadow-sm hover:border-black/20 dark:hover:border-white/20 transition-colors"
                >
                  <span className="font-mono text-3xl sm:text-4xl font-light text-secondary-light/30 dark:text-secondary-dark/30 block">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-primary-light dark:text-primary-dark">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm font-light text-secondary-light dark:text-secondary-dark leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/*   3. REGIONAL CHAMBERS & LOCATION MAP                    */}
          {/* ========================================================= */}
          <div className="space-y-8 pt-10 border-t border-theme">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-theme">
              <div>
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-2">
                  PHYSICAL &amp; DIGITAL DESKS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
                  Chamber <span className="italic font-light opacity-90">Locations</span>
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark font-bold">
                Baidyabati HQ • Greater Kolkata
              </span>
            </div>

            <ChamberMapCard />
          </div>

          {/* ========================================================= */}
          {/*   4. REUSABLE FAQ SECTION                                */}
          {/* ========================================================= */}
          <div className="pt-8 border-t border-theme">
            <FAQSection
              title="Consultation & Advisory Inquiries"
              subtitle="Everything you need to know about preparing for your session, confidentiality, and remote vs in-person meetings."
              faqs={SCHEDULING_FAQS}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default memo(Schedule);