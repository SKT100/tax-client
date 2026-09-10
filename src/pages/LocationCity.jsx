// src/pages/LocationCity.jsx

import { useMemo, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Phone, 
  ArrowLeft, 
  ShieldCheck, 
  ArrowUpRight, 
  Building2, 
  MapPin, 
  Train, 
  Users,
  Download
} from "lucide-react";
import { MUNICIPAL_CLUSTERS } from "../data/locationsData";
import { SITE_CONFIG } from "../data/siteConfig";
import ChamberMapCard from "../components/ui/ChamberMapCard";
import ScrollVelocityRibbon from "../components/ui/ribbon/ScrollVelocityRibbon";
import PillButton from "../components/ui/PillButton";
import NotFound from "./NotFound";

function LocationCity() {
  const { citySlug } = useParams();

  const cluster = useMemo(() => {
    if (!citySlug) return null;
    const targetSlug = citySlug.toLowerCase().trim();

    return MUNICIPAL_CLUSTERS.find((c) => {
      const clusterId = c.id.toLowerCase();
      if (clusterId === targetSlug) return true;
      const idParts = clusterId.split("-");
      if (idParts.includes(targetSlug)) return true;
      return c.title.toLowerCase().includes(targetSlug);
    });
  }, [citySlug]);

  if (!cluster) {
    return <NotFound />;
  }

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

  const rawNumber = (SITE_CONFIG?.contact?.phoneRaw || "919007064088").replace("+", "");
  const whatsappMsg = encodeURIComponent(
    `*JURISDICTIONAL INQUIRY — ${cluster.title.toUpperCase()}*\n--------------------------------\n*PIN Code:* ${cluster.pinCodes.join(", ")}\n*Assessee Category:* ${cluster.targetAssessees}\n--------------------------------\n_Requesting tax advisory & GST filing representation in ${cluster.title}._`
  );

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "TaxAdvisor",
    "name": `Matrix Tax Solutions — ${cluster.title} Municipal Desk`,
    "description": `Statutory tax advisory, GST filing, Income Tax notice defense, and municipal trade licensing representation for ${cluster.title} (${cluster.zone}).`,
    "url": `https://matrixtaxx.com/locations/${cluster.id}`,
    "telephone": SITE_CONFIG?.contact?.phoneRaw || "+917439219943",
    "email": SITE_CONFIG?.contact?.email || "tcparthahalder1984@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "461, N.C. Banerjee Road",
      "addressLocality": "Baidyabati",
      "addressRegion": "West Bengal",
      "postalCode": "712222",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `${cluster.title}, West Bengal`
    },
    "priceRange": "₹₹",
    "openingHours": "Mo-Sa 10:00-19:00"
  };

  return (
    <div className="relative w-full min-h-screen bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300">
      <Helmet>
        <title>{`${cluster.title} Tax Consultant & GST Filing Chambers | Matrix Tax Solutions`}</title>
        <meta
          name="description"
          content={`Authorized Tax & GST Practitioner for ${cluster.title} (PIN: ${cluster.pinCodes.join(", ")}). Income Tax filing, GST 2B reconciliation, and Scrutiny Notice representation.`}
        />
        <link rel="canonical" href={`https://matrixtaxx.com/locations/${cluster.id}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLdSchema)}</script>
      </Helmet>

      {/* Dynamic Ribbon Banner */}
      <div className="pt-2 pb-2 border-b border-theme bg-black/[0.02] dark:bg-white/[0.02]">
        <ScrollVelocityRibbon baseVelocity={0.3}>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark px-4">
            {cluster.title.toUpperCase()} MUNICIPAL DESK ✦ PIN: {cluster.pinCodes.join(", ")} ✦ {cluster.zone.toUpperCase()} ✦ GT ROAD ADVISORY CORRIDOR ✦
          </span>
        </ScrollVelocityRibbon>
      </div>

      <main className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 space-y-12 sm:space-y-16">
        
        {/* Navigation Backlink */}
        <Link
          to="/locations"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors no-underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Municipal Desks</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark font-bold">
              JURISDICTIONAL MUNICIPAL DESK
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight text-primary-light dark:text-primary-dark max-w-4xl mx-auto mb-3">
            {cluster.title} <br />
            <span className="italic font-light opacity-90">Tax Chambers</span>
          </h1>
          <p className="font-body font-light text-base md:text-lg text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto leading-relaxed">
            Statutory tax representation, monthly GST return reconciliation, and business licensing across {cluster.title} ({cluster.zone}).
          </p>
        </div>

        {/* Enhanced 2x2 Parameter Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-theme flex items-start gap-4 shadow-lg transition-all hover:border-black/20 dark:hover:border-white/20">
            <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme flex items-center justify-center shrink-0 text-primary-light dark:text-primary-dark mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-light dark:text-secondary-dark block">
                MUNICIPAL JURISDICTION
              </span>
              <p className="font-serif text-base sm:text-lg text-primary-light dark:text-primary-dark leading-snug">
                {cluster.jurisdiction}
              </p>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-theme flex items-start gap-4 shadow-lg transition-all hover:border-black/20 dark:hover:border-white/20">
            <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme flex items-center justify-center shrink-0 text-primary-light dark:text-primary-dark mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-light dark:text-secondary-dark block">
                POSTAL PIN COVERAGE
              </span>
              <p className="font-mono text-sm sm:text-base font-bold tracking-wider text-primary-light dark:text-primary-dark">
                {cluster.pinCodes.join(", ")}
              </p>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-theme flex items-start gap-4 shadow-lg transition-all hover:border-black/20 dark:hover:border-white/20">
            <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme flex items-center justify-center shrink-0 text-primary-light dark:text-primary-dark mt-0.5">
              <Train className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-light dark:text-secondary-dark block">
                TRANSIT &amp; ACCESSIBILITY
              </span>
              <p className="font-body text-xs sm:text-sm font-light text-primary-light dark:text-primary-dark leading-relaxed">
                {cluster.transit}
              </p>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-theme flex items-start gap-4 shadow-lg transition-all hover:border-black/20 dark:hover:border-white/20">
            <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme flex items-center justify-center shrink-0 text-primary-light dark:text-primary-dark mt-0.5">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-light dark:text-secondary-dark block">
                TARGET ASSESSEE GROUPS
              </span>
              <p className="font-body text-xs sm:text-sm font-light text-primary-light dark:text-primary-dark leading-relaxed">
                {cluster.targetAssessees}
              </p>
            </div>
          </div>
        </div>

        {/* Bespoke Editorial Chamber Advisory Desk Section */}
        <div className="glass-card rounded-3xl border border-theme p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-10">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-theme/60 pb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                DESK ACTIVE • {cluster.title.toUpperCase()} JURISDICTION
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-emerald-500 uppercase tracking-widest hidden sm:inline-block font-bold">
              Direct Representation
            </span>
          </div>

          {/* Headline & Big Circular Action Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-2">
            <div className="max-w-xl space-y-4">
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-primary-light dark:text-primary-dark leading-[0.95] tracking-tight">
                Schedule your <br />
                <span className="italic font-normal">consultation now.</span>
              </h2>
              <p className="font-body text-xs sm:text-sm text-secondary-light dark:text-secondary-dark font-light leading-relaxed max-w-md pt-1">
                Book a direct session with Principal Consultant Partha Pratim Halder for GST DRC-01 notices, Income Tax audit defense, or trade licensing.
              </p>
            </div>

            {/* Circular Big Button leading to Schedule Page */}
            <Link
              to={`/schedule?location=${cluster.id}`}
              className="group relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-primary-light text-surface-light dark:bg-primary-dark dark:text-surface-dark flex items-center justify-center shrink-0 transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl no-underline cursor-pointer self-start md:self-end"
              aria-label={`Book appointment for ${cluster.title}`}
            >
              <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>

          {/* Direct Secondary Communication Channels & PDF Download */}
          <div className="pt-6 border-t border-theme/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-secondary-light dark:text-secondary-dark text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Chambers: 461 N.C. Banerjee Rd, Baidyabati</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <PillButton
                href="/docs/Matrix_Tax_Compliance_Brief.pdf"
                download="Matrix_Tax_Compliance_Brief.pdf"
                variant="outline"
                className="py-3 px-5 text-[11px] w-full sm:w-auto justify-center"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Regional Brief (PDF)</span>
              </PillButton>

              <a
                href={`https://wa.me/${rawNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-full border border-theme font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-light dark:text-primary-dark hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 fill-current" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG?.contact?.phoneRaw || ""}`}
                className="py-3 px-5 rounded-full border border-theme font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-light dark:text-primary-dark hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Integration */}
        <div>
          <ChamberMapCard />
        </div>

      </main>
    </div>
  );
}

export default memo(LocationCity);