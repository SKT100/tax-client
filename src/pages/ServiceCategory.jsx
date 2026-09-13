// src/pages/ServiceCategory.jsx

import { useMemo, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ArrowLeft,
    CheckCircle2,
    FileText,
    ShieldCheck,
    Zap,
    Phone,
    ArrowRight,
    Download,
} from "lucide-react";
import { TAX_PRACTICE_AREAS } from "../data/taxData";
import { BLOG_POSTS } from "../data/blogData";
import { SITE_CONFIG } from "../data/siteConfig";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";
import PillButton from "../components/ui/PillButton";
import BlogCard from "../components/sections/blog/BlogCard";
import ChamberMapCard from "../components/ui/ChamberMapCard";
import NotFound from "./NotFound";

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

function ServiceCategory() {
    const { categorySlug } = useParams();

    const category = useMemo(() => {
        if (!categorySlug) return null;
        const slugLower = categorySlug.toLowerCase().trim();
        return TAX_PRACTICE_AREAS.find((cat) => cat.id.toLowerCase() === slugLower);
    }, [categorySlug]);

    const relatedPosts = useMemo(() => {
        if (!category?.relatedPostSlugs) return [];
        return category.relatedPostSlugs
            .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
            .filter(Boolean);
    }, [category]);

    if (!category) {
        return <NotFound />;
    }

    const rawNumber = (SITE_CONFIG?.contact?.phoneRaw || "917439219943").replace("+", "");
    const whatsappMsg = encodeURIComponent(
        `*SERVICE INQUIRY — ${category.title.toUpperCase()}*\n--------------------------------\n_Requesting statutory representation for ${category.title}._`
    );

    const jsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${category.title} — Matrix Tax Solutions`,
        "description": category.description,
        "provider": {
            "@type": "TaxAdvisor",
            "name": "Matrix Tax Solutions",
            "telephone": SITE_CONFIG?.contact?.phoneRaw || "+917439219943",
            "url": "https://matrixtaxx.com"
        },
        "areaServed": "West Bengal, India",
        "serviceType": category.title
    };

    const moduleCount = category.modules?.length ?? 0;
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://matrixtaxx.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://matrixtaxx.com/services" },
            { "@type": "ListItem", "position": 3, "name": category.title, "item": `https://matrixtaxx.com/services/${category.id}` },
        ],
    };

    return (
        <div className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300">
            <Helmet>
                <title>{`${category.title} Services | Matrix Tax Solutions`}</title>
                <meta name="description" content={category.description} />
                <link rel="canonical" href={`https://matrixtaxx.com/services/${category.id}`} />
                <script type="application/ld+json">{JSON.stringify(jsonLdSchema)}</script>
                <meta property="og:title" content={`${category.title} Services | Matrix Tax Solutions`} />
                <meta property="og:description" content={category.description} />
                <meta property="og:url" content={`https://matrixtaxx.com/services/${category.id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://matrixtaxx.com${category.image || "/images/tax.webp"}`} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            {/* Top Velocity Ribbon Banner */}
            <div className="pt-2 pb-2 border-b border-theme bg-black/[0.02] dark:bg-white/[0.02]">
                <ScrollVelocityRibbon baseVelocity={0.3}>
                    <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark px-4">
                        {category.subtitle} ✦ STATUTORY COMPLIANCE DESK ✦ HOOGHLY &amp; KOLKATA CHAMBERS ✦
                    </span>
                </ScrollVelocityRibbon>
            </div>

            <main className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 space-y-12 sm:space-y-16">

                {/* Navigation Backlink */}
                <Link
                    to="/services"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors no-underline"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>All Practice Services</span>
                </Link>

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold">
                            {category.subtitle}
                        </span>
                    </div>
                    <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.98] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-3">
                        {category.title}
                    </h1>
                    <p className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
                        {category.description}
                    </p>
                </div>

                {/* 2-Column Framework Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="glass-card p-6 sm:p-7 rounded-3xl border border-theme flex items-start gap-4 shadow-lg transition-all hover:border-black/20 dark:hover:border-white/20">
                        <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme flex items-center justify-center shrink-0 text-primary-light dark:text-primary-dark mt-0.5">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-light dark:text-secondary-dark block">
                                STATUTORY GOVERNANCE &amp; ACTS
                            </span>
                            <p className="font-serif text-base sm:text-lg text-primary-light dark:text-primary-dark leading-snug">
                                {category.statutoryActs}
                            </p>
                        </div>
                    </div>

                    <div className="glass-card p-6 sm:p-7 rounded-3xl border border-theme flex items-start gap-4 shadow-lg transition-all hover:border-black/20 dark:hover:border-white/20">
                        <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme flex items-center justify-center shrink-0 text-primary-light dark:text-primary-dark mt-0.5">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-light dark:text-secondary-dark block">
                                TARGET ASSESSEES &amp; SCOPE
                            </span>
                            <p className="font-body text-xs sm:text-sm font-light text-primary-light dark:text-primary-dark leading-relaxed">
                                {category.targetAssessees}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Service Modules Grid */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-theme">
                        <div>
                            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-1">
                                PRACTICE MODULES ({moduleCount})
                            </span>
                            <h2 className="font-serif text-2xl sm:text-4xl font-light tracking-tight text-primary-light dark:text-primary-dark">
                                Scope of Statutory Execution
                            </h2>
                        </div>

                        {/* Top Right Dark Solid Pill Button */}
                        <Link to={`/schedule?service=${category.id}`} className="no-underline">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-full bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-90 transition-all shadow-md cursor-pointer"
                            >
                                <span>Book Practice Consultation</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(category.modules || []).map((mod) => (
                            <div
                                key={mod.code}
                                className="glass-card rounded-3xl border border-theme p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-theme text-primary-light dark:text-primary-dark">
                                            {mod.code}
                                        </span>
                                        <CheckCircle2 className="w-4 h-4 text-primary-light dark:text-primary-dark opacity-60" />
                                    </div>
                                    <h3 className="font-serif text-xl font-light text-primary-light dark:text-primary-dark leading-snug">
                                        {mod.title}
                                    </h3>
                                    <p className="font-body text-xs text-secondary-light dark:text-secondary-dark leading-relaxed font-light">
                                        {mod.desc}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-theme">
                                    <Link
                                        to={`/schedule?service=${category.id}&ref=${mod.code}`}
                                        className="font-mono text-[10px] uppercase font-bold tracking-wider text-primary-light dark:text-primary-dark hover:opacity-75 transition-opacity inline-flex items-center gap-1.5 no-underline"
                                    >
                                        <span>Engage Module</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editorial Action Banner */}
                <div className="glass-card rounded-3xl border border-theme p-8 sm:p-12 shadow-2xl space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-3 max-w-xl">
                            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-secondary-light dark:text-secondary-dark flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5" />
                                DIRECT STATUTORY REPRESENTATION
                            </span>
                            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-primary-light dark:text-primary-dark leading-tight">
                                Schedule your legal tax review.
                            </h2>
                            <p className="font-body text-xs sm:text-sm text-secondary-light dark:text-secondary-dark leading-relaxed font-light">
                                Connect directly with Principal Consultant Partha Pratim Halder for verified compliance execution, document evaluation, and statutory representation.
                            </p>
                        </div>

                        {/* Main Action Solid Pill Button */}
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <Link to={`/schedule?service=${category.id}`} className="no-underline">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-full bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-90 transition-all shadow-md cursor-pointer"
                                >
                                    <span>Schedule Consultation</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-theme/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                        <div className="flex items-center gap-2 text-secondary-light dark:text-secondary-dark text-[11px] uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0" />
                            <span>Baidyabati Principal Chambers &amp; Digital Desk</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            <PillButton
                                href="/docs/Matrix_Tax_Compliance_Brief.pdf"
                                download="Matrix_Tax_Compliance_Brief.pdf"
                                variant="outline"
                                className="py-2.5 px-4 text-[11px] w-full sm:w-auto justify-center"
                            >
                                <Download className="w-3.5 h-3.5 shrink-0" />
                                <span>Compliance Brief (PDF)</span>
                            </PillButton>

                            <a
                                href={`https://wa.me/${rawNumber}?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2.5 px-4 rounded-full border border-theme font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-light dark:text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
                            >
                                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-current" />
                                <span>WhatsApp Desk</span>
                            </a>

                            <a
                                href={`tel:${SITE_CONFIG?.contact?.phoneRaw || ""}`}
                                className="py-2.5 px-4 rounded-full border border-theme font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-light dark:text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call Desk</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Reciprocal Link Cluster: Related Practice Blog Guides */}
                {relatedPosts.length > 0 && (
                    <div className="pt-10 border-t border-theme space-y-5">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block">
                                RELATED PRACTICE GUIDES
                            </span>
                            <span className="font-mono text-[10px] text-secondary-light dark:text-secondary-dark uppercase tracking-wider font-bold">
                                {relatedPosts.length} Technical {relatedPosts.length === 1 ? "Guide" : "Guides"}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((post, idx) => (
                                <BlogCard key={post.slug} post={post} index={idx} forceLazy />
                            ))}
                        </div>
                    </div>
                )}

                {/* Location Chambers Map */}
                <div>
                    <ChamberMapCard />
                </div>

            </main>
        </div>
    );
}

export default memo(ServiceCategory);