// src/components/sections/services/ServiceDirectory.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Receipt,
  FileText,
  ShieldAlert,
  Building2,
  Users2,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "../../../data/servicesMenuData";
import ServiceCard from "./ServicesCard";
import FilterDock from "../../ui/FilterDock";

const CATEGORY_ICONS = {
  "accounts-audit": Calculator,
  gst: Receipt,
  "gst-compliance": Receipt,
  "income-tax": FileText,
  "tds-payroll": Users2,
  "company-registration": Building2,
  "pf-esic": ShieldAlert,
  "licences-advisory": Layers,
};

// Helper to resolve route slugs cleanly
const getCategorySlug = (catId) => {
  if (catId === "gst") return "gst-compliance";
  if (catId === "pf-esic") return "tds-payroll";
  return catId;
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

  const categoriesWithIcons = SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    icon: CATEGORY_ICONS[cat.id] || Sparkles,
  }));

  return (
    <section id="services-menu" className="relative z-20 py-12 md:py-24">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Reusable Standardized Filter Dock */}
        <FilterDock
          count={totalServicesCount}
          countLabel="Statutory Modules Indexed"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search ITR, GST, SCN, Trade..."
          categories={categoriesWithIcons}
          activeCategory={activeFilter}
          onCategoryChange={setActiveFilter}
          allLabel="All Directives"
        />

        {/* Categorized Matrix of Inverted Cards */}
        <div className="space-y-20">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.id] || Sparkles;
              const routeSlug = getCategorySlug(category.id);

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
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-theme/60">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-theme flex items-center justify-center text-primary-light dark:text-primary-dark shadow-xs shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <Link
                        to={`/services/${routeSlug}`}
                        className="no-underline group/title flex items-center gap-2"
                      >
                        <h3 className="font-serif text-2xl md:text-3xl font-light text-primary-light dark:text-primary-dark tracking-tight group-hover/title:opacity-80 transition-opacity">
                          {category.name}
                        </h3>
                      </Link>
                    </div>

                    <div className="h-px flex-1 bg-gradient-to-r from-theme to-transparent hidden md:block" />

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary-light dark:text-secondary-dark px-3 py-1.5 rounded-full border border-theme bg-black/[0.02] dark:bg-white/[0.02] hidden sm:inline-block">
                        {category.items.length} Directives
                      </span>

                      {/* Prominent Category Action Button */}
                      <Link
                        to={`/services/${routeSlug}`}
                        className="no-underline inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-theme bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/12 text-primary-light dark:text-primary-dark font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                      >
                        <span>Explore Practice Desk</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* 3-Column Grid of Inverted Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {category.items.map((item, idx) => (
                      <ServiceCard
                        key={item.id}
                        item={item}
                        index={idx}
                        categorySlug={routeSlug}
                      />
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