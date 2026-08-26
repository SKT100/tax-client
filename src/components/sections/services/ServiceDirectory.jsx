// src/components/sections/services/ServiceDirectory.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calculator,
  Receipt,
  FileText,
  ShieldAlert,
  Building2,
  Users2,
  Sparkles,
  Layers,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "../../../data/servicesMenuData";
import ServiceCard from "./ServicesCard";

const CATEGORY_ICONS = {
  "accounts-audit": Calculator,
  gst: Receipt,
  "income-tax": FileText,
  "tds-payroll": Users2,
  "company-registration": Building2,
  "pf-esic": ShieldAlert,
  "licences-advisory": Layers,
};

export default function ServiceDirectory() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = SERVICE_CATEGORIES.map((cat) => {
    const matchesFilter = activeFilter === "all" || cat.id === activeFilter;
    if (!matchesFilter) return null;

    const filteredItems = cat.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredItems.length === 0) return null;

    return {
      ...cat,
      items: filteredItems,
    };
  }).filter(Boolean);

  const totalServicesCount = SERVICE_CATEGORIES.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <section id="services-menu" className="relative z-20 py-12 md:py-24">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* ========================================================= */}
        {/* 🌟 1. SEARCH & FILTER DOCK                                 */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-6 mb-16 md:mb-20">
          
          {/* Live Index Counter & Solid Inverted Search Input */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-theme">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-light dark:text-secondary-dark font-bold">
                {totalServicesCount} Statutory Modules Indexed
              </span>
            </div>

            {/* Solid Non-Transparent Search Input (White in Dark Mode, Dark in Light Mode) */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-white/60 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              <input
                type="text"
                placeholder="Search ITR, GST, SCN, Trade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F0F12] text-white placeholder:text-white/50 border border-white/10 dark:bg-white dark:text-slate-950 dark:placeholder:text-slate-400 dark:border-white/20 rounded-xl pl-10 pr-12 py-2.5 text-xs font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white dark:text-slate-500 dark:hover:text-slate-950 text-[10px] font-mono uppercase transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Solid Filled Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`relative px-4 py-2 rounded-full font-mono text-[11px] md:text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === "all"
                  ? "bg-[#0F0F12] text-white border-[#0F0F12] dark:bg-white dark:text-slate-950 dark:border-white font-bold shadow-md"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-950 dark:bg-[#1A1A1F] dark:text-white/70 dark:border-white/10 dark:hover:bg-white/15 dark:hover:text-white shadow-sm"
              }`}
            >
              All Directives
            </button>

            {SERVICE_CATEGORIES.map((cat) => {
              const IconComponent = CATEGORY_ICONS[cat.id] || Sparkles;
              const isActive = activeFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2 rounded-full font-mono text-[11px] md:text-xs uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? "bg-[#0F0F12] text-white border-[#0F0F12] dark:bg-white dark:text-slate-950 dark:border-white font-bold shadow-md"
                      : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-950 dark:bg-[#1A1A1F] dark:text-white/70 dark:border-white/10 dark:hover:bg-white/15 dark:hover:text-white shadow-sm"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 opacity-80" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 🌟 2. CATEGORIZED MATRIX OF INVERTED CARDS               */}
        {/* ========================================================= */}
        <div className="space-y-20">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.id] || Sparkles;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* Category Title Header */}
                  <div className="flex items-center justify-between gap-4 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-theme flex items-center justify-center text-primary-light dark:text-primary-dark">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-light text-primary-light dark:text-primary-dark tracking-tight">
                        {category.name}
                      </h3>
                    </div>

                    <div className="h-px flex-1 bg-gradient-to-r from-theme to-transparent hidden sm:block" />

                    <span className="font-mono text-[10px] uppercase tracking-widest text-secondary-light dark:text-secondary-dark">
                      {category.items.length} Directives
                    </span>
                  </div>

                  {/* 3-Column Grid of Inverted Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {category.items.map((item, idx) => (
                      <ServiceCard key={item.id} item={item} index={idx} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}