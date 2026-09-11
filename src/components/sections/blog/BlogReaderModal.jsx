// src/components/sections/blog/BlogReaderModal.jsx

import { useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import PillButton from "../../ui/PillButton";

const DEFAULT_COVER = "/images/tax.webp";

function BlogReaderModal({ article, onClose }) {
  useEffect(() => {
    if (!article) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  return (
    <AnimatePresence>
      {article && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-light dark:bg-surface-dark border border-theme rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden relative"
          >
            <div className="p-6 sm:p-8 border-b border-theme flex items-start justify-between gap-4 shrink-0 bg-surface-light dark:bg-surface-dark">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-theme bg-black/[0.04] dark:bg-white/[0.05] font-mono text-[10px] font-bold tracking-widest uppercase text-primary-light dark:text-primary-dark">
                    {article.category || "STATUTORY ANALYSIS"}
                  </span>
                  <span className="font-mono text-[11px] text-secondary-light dark:text-secondary-dark opacity-75 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date
                      ? new Date(article.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Current Gazette"}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-primary-light dark:text-primary-dark font-light leading-snug">
                  {article.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-theme [@media(hover:hover)]:hover:bg-black/5 [@media(hover:hover)]:dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0 text-secondary-light dark:text-secondary-dark [@media(hover:hover)]:hover:text-primary-light [@media(hover:hover)]:dark:hover:text-primary-dark"
                aria-label="Close reader"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="custom-scrollbar p-6 sm:p-8 overflow-y-auto space-y-6 font-body text-sm sm:text-base leading-relaxed text-secondary-light dark:text-secondary-dark font-light overscroll-contain"
            >
              <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-theme bg-black/5 dark:bg-white/5">
                <img
                  src={article.thumbnail || DEFAULT_COVER}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter grayscale contrast-110"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_COVER;
                  }}
                />
              </div>

              {article.external_link && (
                <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-theme flex items-center justify-between gap-4">
                  <div className="font-mono text-xs text-secondary-light dark:text-secondary-dark">
                    <span className="font-bold uppercase tracking-wider block text-[10px] text-primary-light dark:text-primary-dark mb-0.5">
                      External Citation / Reference
                    </span>
                    <span>This brief references an external gazette or source.</span>
                  </div>
                  <a
                    href={article.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark font-mono text-[11px] font-bold uppercase tracking-wider [@media(hover:hover)]:hover:opacity-90 transition-opacity no-underline shrink-0"
                  >
                    <span>Open Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="space-y-4 whitespace-pre-wrap leading-relaxed text-primary-light/90 dark:text-primary-dark/90 font-light text-sm sm:text-[15px] pt-2">
                {article.body}
              </div>

              <div className="pt-6 border-t border-theme mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/[0.02] dark:bg-white/[0.02] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-mono text-secondary-light dark:text-secondary-dark">
                  <ShieldCheck className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
                  <span>Need direct legal representation or notice audit?</span>
                </div>
                <Link to="/schedule" onClick={onClose} className="no-underline shrink-0">
                  <PillButton
                    variant="auto"
                    className="px-6 py-2.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark border border-theme shadow-md"
                  >
                    <span>BOOK ADVISORY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </PillButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default memo(BlogReaderModal);