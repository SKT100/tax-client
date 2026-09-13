// src/pages/About.jsx

import { memo } from "react";
import { Helmet } from "react-helmet-async";
import AboutProfileHero from "../components/sections/about/AboutProfileHero";
import Stats from "../components/sections/shared/Stats";
import AngledTicker from "../components/sections/shared/AngledTicker";
import ComplianceVault from "../components/sections/about/ComplianceVault";
import RegionalReachMap from "../components/sections/contact/RegionalReachMap";
import FAQSection from "../components/sections/shared/FAQSection";
import { ABOUT_FAQS } from "../data/faqsData";

function About() {
  return (
    <div className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen">
      <Helmet>
        <title>About Principal Consultant Partha Pratim Halder | Matrix Tax Solutions</title>
        <meta
          name="description"
          content="Learn about Partha Pratim Halder, Principal Tax Consultant at Matrix Tax Solutions with over a decade of statutory tax advocacy, GST defense, and compliance leadership."
        />
        <link rel="canonical" href="https://matrixtaxx.com/about" />
        {/* Route-level preload for the About hero portrait */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/images/pritam-img.webp"
          fetchpriority="high"
        />
      </Helmet>

      <main className="relative w-full flex flex-col">
        {/* 1. Hero */}
        <AboutProfileHero />

        {/* 2. Stats */}
        <Stats />

        {/* 3. Vault, Ribbon, Route-Specific FAQs & Regional Network */}
        <div className="space-y-16 py-8">
          <ComplianceVault />
          <AngledTicker preset="about"/>
          <FAQSection
            id="about-faq"
            badge="FIRM DIRECTIVES"
            title="Practice & Advisory Directives"
            subtitle="Insights into our statutory credentials, representation models, confidential vault, and jurisdictional practice."
            items={ABOUT_FAQS}
            showCta={true}
          />
          <RegionalReachMap />
        </div>
      </main>
    </div>
  );
}

export default memo(About);