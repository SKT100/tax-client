// src/pages/Blog.jsx

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { BookOpen, FileText, Receipt, ShieldAlert, Building2, Layers, Globe } from "lucide-react";
import { BLOG_POSTS } from "../data/blogData";
import FilterDock from "../components/ui/FilterDock";
import BlogCard from "../components/sections/blog/BlogCard";
import BlogPagination from "../components/sections/blog/BlogPagination";
import BlogReaderModal from "../components/sections/blog/BlogReaderModal";

const POSTS_PER_PAGE = 6;

const BLOG_CATEGORIES = [
  { id: "direct-tax", label: "Direct Tax", icon: FileText },
  { id: "gst-law", label: "GST Law", icon: Receipt },
  { id: "audit-defense", label: "Audit Defense", icon: ShieldAlert },
  { id: "company-compliance", label: "Company Compliance", icon: Building2 },
  { id: "trade-licences", label: "Trade Licences", icon: Layers },
  { id: "general-updates", label: "General Updates", icon: Globe },
];

const normalizeSlug = (str) =>
  (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState(null);
  
  const contentTopRef = useRef(null);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return BLOG_POSTS.filter((post) => {
      const postCatSlug = normalizeSlug(post.category);
      const matchesCategory =
        activeCategory === "all" || postCatSlug === activeCategory;

      const matchesSearch =
        !query ||
        (post.title || "").toLowerCase().includes(query) ||
        (post.summary || "").toLowerCase().includes(query) ||
        (post.body || "").toLowerCase().includes(query) ||
        (post.category || "").toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const scrollToTop = useCallback(() => {
    if (!contentTopRef.current) return;

    if (window.lenis) {
      window.lenis.scrollTo(contentTopRef.current, {
        offset: -100,
        duration: 0.8,
        lock: true,
      });
    } else {
      const targetY = contentTopRef.current.offsetTop - 100;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "smooth",
      });
    }
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    scrollToTop();
  }, [scrollToTop]);

  const handleCardClick = useCallback((post) => {
    setActiveArticle(post);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveArticle(null);
  }, []);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark pt-32 pb-24 transition-colors duration-300">
      <div className="layout-container">
        
        {/* Standardized Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold">
              STATUTORY KNOWLEDGE DESK
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-5">
            Tax &amp; Legal <br />
            <span className="italic font-light opacity-90">Insights</span>
          </h1>
          <p className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
            Directives, procedural notice defenses, and regulatory analyses curated by Matrix Tax Solutions.
          </p>
        </div>

        {/* Scroll Target Anchor */}
        <div ref={contentTopRef} className="my-10 sm:my-14 scroll-mt-28">
          <FilterDock
            count={filteredPosts.length}
            countLabel="Statutory Briefs Indexed"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search directives, ITR, GST circulars..."
            categories={BLOG_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            allLabel="All Insights"
          />
        </div>

        {/* Card Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-theme rounded-3xl max-w-xl mx-auto my-8">
            <BookOpen className="w-8 h-8 mx-auto text-secondary-light dark:text-secondary-dark mb-3 opacity-60" />
            <p className="font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark">
              No statutory directives matched your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[720px] content-start">
            {paginatedPosts.map((post, idx) => {
              const globalIndex = (currentPage - 1) * POSTS_PER_PAGE + idx + 1;
              return (
                <BlogCard
                  key={post.slug || `post-${globalIndex}`}
                  post={post}
                  index={globalIndex}
                  onClick={handleCardClick}
                />
              );
            })}
          </div>
        )}

        {/* Pagination Navigation */}
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Reading Modal */}
        <BlogReaderModal
          article={activeArticle}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}