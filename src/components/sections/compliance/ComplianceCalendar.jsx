// src/components/sections/compliance/ComplianceCalendar.jsx

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Receipt,
  FileText,
  Users2,
  Layers,
  Building2,
} from "lucide-react";
import {
  COMPLIANCE_CATEGORIES,
  STATUTORY_DUE_DATES,
} from "../../../data/complianceDueDates";
import { SITE_CONFIG } from "../../../data/siteConfig";
import FilterDock from "../../ui/FilterDock";
import PillButton from "../../ui/PillButton";

const COMPLIANCE_ICONS = {
  gst: Receipt,
  "income-tax": FileText,
  tds: Users2,
  payroll: Layers,
  corporate: Building2,
};

export default function ComplianceCalendar() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [frequencyFilter, setFrequencyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDirectives = useMemo(() => {
    return STATUTORY_DUE_DATES.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesFrequency =
        frequencyFilter === "all" ||
        item.frequency.toLowerCase().includes(frequencyFilter.toLowerCase());
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.act.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dueDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetAssessee.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesFrequency && matchesSearch;
    });
  }, [activeCategory, frequencyFilter, searchQuery]);

  const handleConsultWhatsApp = (item) => {
    const rawNumber = (
      SITE_CONFIG?.contact?.phoneRaw || "+917439219943"
    ).replace("+", "");
    const message = `*COMPLIANCE DIRECTIVE INQUIRY*\n--------------------------------\n*Directive:* ${item.title}\n*Statutory Act:* ${item.act}\n*Due Date:* ${item.dueDate}\n*Assessee Type:* ${item.targetAssessees || item.targetAssessee}\n--------------------------------\n_I require assistance with return filing / reconciliation for this statutory deadline._`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${rawNumber}?text=${encoded}`, "_blank");
  };

  const categoriesWithIcons = COMPLIANCE_CATEGORIES.filter(
    (c) => c.id !== "all"
  ).map((cat) => ({
    ...cat,
    icon: COMPLIANCE_ICONS[cat.id],
  }));

  const frequencyOptions = {
    value: frequencyFilter,
    onChange: setFrequencyFilter,
    options: [
      { id: "all", label: "All" },
      { id: "monthly", label: "Monthly" },
      { id: "quarterly", label: "Quarterly" },
      { id: "annual", label: "Annual" },
    ],
  };

  const rawContactNumber = (
    SITE_CONFIG?.contact?.phoneRaw || "+917439219943"
  ).replace("+", "");

  return (
    <section
      id="compliance-calendar"
      className="relative z-10 w-full py-16 sm:py-24 md:py-32"
    >
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6 pb-6 border-b border-theme">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark">
                STATUTORY DUE DATE CALENDAR • FY 2026-27
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark tracking-tight leading-tight">
              Compliance <span className="italic font-light opacity-90">Deadlines</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest uppercase text-secondary-light dark:text-secondary-dark font-bold">
              {filteredDirectives.length} ACTIVE STATUTORY CUTOFFS
            </span>
          </div>
        </div>

        {/* Unified Filter Dock */}
        <FilterDock
          count={filteredDirectives.length}
          countLabel="Active Statutory Cutoffs"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search Section, ITR, GST..."
          categories={categoriesWithIcons}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          allLabel="All Directives"
          secondaryFilters={frequencyOptions}
        />

        {/* Compliance Table Matrix */}
        <div className="rounded-3xl border border-theme overflow-hidden glass-card shadow-2xl">
          
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 bg-black/[0.03] dark:bg-white/[0.03] border-b border-theme font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-light dark:text-secondary-dark">
            <div className="col-span-2">Statutory Due Date</div>
            <div className="col-span-4">Directive &amp; Legal Authority</div>
            <div className="col-span-3">Target Assessees &amp; Scope</div>
            <div className="col-span-3 text-right">Penal Consequence &amp; Action</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-theme">
            <AnimatePresence mode="popLayout">
              {filteredDirectives.length > 0 ? (
                filteredDirectives.map((item, idx) => {
                  const isCritical = item.urgency === "critical";
                  return (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-6 sm:p-8 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors items-start lg:items-center"
                    >
                      {/* Column 1: Date & Frequency Badge */}
                      <div className="lg:col-span-2 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
                          <span className="font-mono text-xs sm:text-sm font-bold text-primary-light dark:text-primary-dark tracking-tight">
                            {item.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border border-theme bg-black/[0.03] dark:bg-white/[0.05] text-secondary-light dark:text-secondary-dark">
                            {item.frequency}
                          </span>
                          {isCritical && (
                            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
                              Strict
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Column 2: Title, Law & Scope */}
                      <div className="lg:col-span-4 space-y-1">
                        <h3 className="font-serif text-lg sm:text-xl font-light text-primary-light dark:text-primary-dark leading-snug">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[10px] text-secondary-light dark:text-secondary-dark block">
                          {item.act}
                        </span>
                        <p className="font-body text-xs text-secondary-light dark:text-secondary-dark leading-relaxed pt-1">
                          {item.importance}
                        </p>
                      </div>

                      {/* Column 3: Assessee Details */}
                      <div className="lg:col-span-3 space-y-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-theme">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-secondary-light dark:text-secondary-dark block font-bold">
                          APPLICABLE ASSESSEES
                        </span>
                        <p className="font-body text-xs font-light text-primary-light dark:text-primary-dark leading-snug">
                          {item.targetAssessee}
                        </p>
                      </div>

                      {/* Column 4: Penalty Consequence & Action */}
                      <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between gap-3.5 border-t lg:border-t-0 pt-3 lg:pt-0 border-theme">
                        <div className="flex items-start gap-1.5 text-rose-600/90 dark:text-rose-400/90 text-[11px] font-body text-left lg:text-right">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{item.consequence}</span>
                        </div>
                        
                        <PillButton
                          onClick={() => handleConsultWhatsApp(item)}
                          variant="auto"
                          aria-label={`Inquire about ${item.title} statutory filing on WhatsApp`}
                          className="px-5 py-2 text-[11px]"
                        >
                          <span>File / Reconcile</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </PillButton>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-12 text-center text-secondary-light dark:text-secondary-dark font-mono text-xs">
                  No statutory deadlines match the selected query.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Table Footer Banner */}
          <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary-light dark:text-primary-dark shrink-0" />
              <p className="font-body text-xs text-secondary-light dark:text-secondary-dark">
                Statutory cutoffs are periodically updated in accordance with CBDT, CBIC &amp; West Bengal Departmental Notifications.
              </p>
            </div>
            <a
              href={`https://wa.me/${rawContactNumber}?text=${encodeURIComponent("Requesting Annual Statutory Tax Calendar Brief for our enterprise.")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Request custom corporate calendar on WhatsApp"
              className="font-mono text-xs uppercase tracking-wider underline text-primary-light dark:text-primary-dark whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              Get Custom Corporate Calendar
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}