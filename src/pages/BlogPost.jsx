// src/pages/BlogPost.jsx
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Tag, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "../data/blogData";
import NotFound from "./NotFound";

const DEFAULT_COVER = "/images/tax.webp";

// Lightweight helper to convert markdown links [text](url) into React Router Links
function renderMarkdownContent(text) {
  if (!text) return null;

  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const linkText = match[1];
    const linkUrl = match[2];

    if (linkUrl.startsWith("/")) {
      parts.push(
        <Link
          key={`${linkUrl}-${match.index}`}
          to={linkUrl}
          className="text-emerald-500 hover:underline font-medium"
        >
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`${linkUrl}-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500 hover:underline font-medium"
        >
          {linkText}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export default function BlogPost() {
  const { slug } = useParams();

  const post = useMemo(() => {
    return BLOG_POSTS.find((p) => p.slug === slug);
  }, [slug]);

  if (!post) return NotFound ? <NotFound /> : null;

  const postUrl = `https://matrixtaxx.com/blog/${post.slug}`;
  const rawBody = post.body || post.content || "";

  const coverImage = post.thumbnail || DEFAULT_COVER;
  const absoluteOgImage = coverImage.startsWith("http")
    ? coverImage
    : `https://matrixtaxx.com${coverImage}`;

  return (
    <article className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 pt-8 pb-20">
      <Helmet>
        <title>{`${post.title} | Matrix Tax Solutions`}</title>
        <meta name="description" content={post.summary || post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary || post.excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={absoluteOgImage} />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Insights</span>
        </Link>

        <header className="space-y-4 border-b border-theme pb-6">
          <div className="flex items-center gap-4 font-mono text-xs text-secondary-light dark:text-secondary-dark">
            <span className="flex items-center gap-1.5 uppercase font-bold text-emerald-500">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />{" "}
              {post.date ? new Date(post.date).toLocaleDateString("en-IN") : "Recent"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light leading-tight tracking-tight text-primary-light dark:text-primary-dark">
            {post.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-secondary-light dark:text-secondary-dark font-light leading-relaxed">
            {post.summary}
          </p>
        </header>

        {/* Article Body with whitespace-pre-line preserved */}
        <div className="font-body leading-relaxed text-secondary-light dark:text-secondary-dark text-sm sm:text-base space-y-4">
          {rawBody.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed whitespace-pre-line">
              {renderMarkdownContent(paragraph)}
            </p>
          ))}
        </div>

        {/* Local Conversion Bridge Footer */}
        <div className="glass-card rounded-3xl border border-theme p-6 sm:p-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-500 block">
              JURISDICTIONAL REPRESENTATION
            </span>
            <h3 className="font-serif text-xl font-light text-primary-light dark:text-primary-dark">
              Facing Scrutiny or Filing Deadlines in Hooghly?
            </h3>
            <p className="font-body text-xs text-secondary-light dark:text-secondary-dark max-w-md">
              Schedule a direct consultation at our Baidyabati Chambers or connect with our regional desk for immediate assistance.
            </p>
          </div>

          <Link
            to={`/schedule?topic=${encodeURIComponent(post.title)}`}
            className="py-3 px-6 rounded-full bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 no-underline shrink-0"
          >
            <span>Book Chamber Desk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </article>
  );
}