// src/components/sections/blog/BlogCard.jsx

import { memo } from "react";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_COVER = "/images/tax.webp";

function BlogCard({ post, index, onClick }) {
  const formattedIndex = String(index + 1).padStart(2, "0");
  const postDate = post.date
    ? new Date(post.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Active Circular";

  const coverImage = post.thumbnail || DEFAULT_COVER;

  const isAboveFold = typeof index === "number" && index < 2;

  return (
    <article
      onClick={() => onClick(post)}
      className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between border border-theme [@media(hover:hover)]:hover:border-black/40 [@media(hover:hover)]:dark:hover:border-white/40 transition-all duration-200 group cursor-pointer shadow-sm [@media(hover:hover)]:hover:shadow-xl relative overflow-hidden transform-gpu"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded border border-theme bg-black/[0.04] dark:bg-white/[0.05] font-mono text-[10px] font-bold tracking-widest uppercase text-primary-light dark:text-primary-dark">
            {post.category || "STATUTORY BRIEF"}
          </span>
          <span className="font-mono text-xs font-semibold text-secondary-light dark:text-secondary-dark opacity-60">
            {formattedIndex}
          </span>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-black/5 dark:bg-white/5 border border-theme">
          <img
            src={coverImage}
            alt={post.title}
            loading={isAboveFold ? "eager" : "lazy"}
            fetchPriority={isAboveFold ? "high" : "auto"}
            decoding={isAboveFold ? "sync" : "async"}
            width={640}
            height={360}
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:scale-105 transition-all duration-300 transform-gpu"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_COVER;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 [@media(hover:hover)]:group-hover:opacity-30 transition-opacity duration-300" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-light text-primary-light dark:text-primary-dark [@media(hover:hover)]:group-hover:text-neutral-500 [@media(hover:hover)]:dark:group-hover:text-neutral-300 transition-colors duration-200 leading-snug mb-3">
          {post.title}
        </h3>

        <p className="font-body text-xs sm:text-sm text-secondary-light dark:text-secondary-dark line-clamp-2 leading-relaxed font-light mb-6">
          {post.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-theme flex items-center justify-between text-secondary-light dark:text-secondary-dark">
        <span className="font-mono text-[11px] tracking-wider uppercase opacity-70">
          {postDate}
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider uppercase text-primary-light dark:text-primary-dark [@media(hover:hover)]:group-hover:translate-x-1 transition-transform duration-200">
          <span>READ BRIEF</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
}

export default memo(BlogCard);