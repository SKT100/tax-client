// src/components/sections/blog/BlogPagination.jsx

import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BlogPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-14 flex items-center justify-center gap-3 font-mono text-xs select-none">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2.5 rounded-full border border-theme disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-full font-bold flex items-center justify-center transition-all cursor-pointer ${
                isCurrent
                  ? "bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark shadow-md"
                  : "border border-theme text-secondary-light dark:text-secondary-dark hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2.5 rounded-full border border-theme disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default memo(BlogPagination);