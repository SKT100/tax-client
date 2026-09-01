// src/components/ui/FilterDock.jsx

import { memo } from "react";
import { Search } from "lucide-react";

function FilterDock({
  count,
  countLabel = "Modules Indexed",
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search directives, sections, keywords...",
  categories = [],
  activeCategory = "all",
  onCategoryChange,
  allLabel = "All Directives",
  secondaryFilters = null, // Optional secondary filters (e.g., Monthly/Quarterly/Annual)
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-6 mb-12 sm:mb-16 md:mb-20 ${className}`}>
      
      {/* Top Bar: Index Counter + Solid Inverted Search Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-theme">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-light dark:text-secondary-dark font-bold">
            {count !== undefined ? `${count} ${countLabel}` : countLabel}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Optional Secondary Segmented Filter (e.g. Frequency) */}
          {secondaryFilters && (
            <div className="flex rounded-xl border border-theme p-1 bg-black/5 dark:bg-white/5 w-full sm:w-auto shrink-0">
              {secondaryFilters.options.map((opt) => {
                const isSelected = secondaryFilters.value === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => secondaryFilters.onChange(opt.id)}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-surface-light dark:bg-surface-dark shadow-sm text-primary-light dark:text-primary-dark font-bold"
                        : "text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Solid Non-Transparent High-Contrast Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-white/60 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#0F0F12] text-white placeholder:text-white/50 border border-white/10 dark:bg-white dark:text-slate-950 dark:placeholder:text-slate-400 dark:border-white/20 rounded-xl pl-10 pr-12 py-2.5 text-xs font-mono shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white dark:text-slate-500 dark:hover:text-slate-950 text-[10px] font-mono uppercase transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Filter Chips with Icons */}
      <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={`relative px-4 py-2 rounded-full font-mono text-[11px] md:text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
            activeCategory === "all"
              ? "bg-[#0F0F12] text-white border-[#0F0F12] dark:bg-white dark:text-slate-950 dark:border-white font-bold shadow-md"
              : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-950 dark:bg-[#1A1A1F] dark:text-white/70 dark:border-white/10 dark:hover:bg-white/15 dark:hover:text-white shadow-sm"
          }`}
        >
          {allLabel}
        </button>

        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`relative flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2 rounded-full font-mono text-[11px] md:text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-[#0F0F12] text-white border-[#0F0F12] dark:bg-white dark:text-slate-950 dark:border-white font-bold shadow-md"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-950 dark:bg-[#1A1A1F] dark:text-white/70 dark:border-white/10 dark:hover:bg-white/15 dark:hover:text-white shadow-sm"
              }`}
            >
              {IconComp && <IconComp className="w-3.5 h-3.5 opacity-80" />}
              <span>{cat.name || cat.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}

export default memo(FilterDock);