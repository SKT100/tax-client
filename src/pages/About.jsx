// src/pages/About.jsx

import { memo } from "react";
import AboutProfileHero from "../components/sections/about/AboutProfileHero";
import Stats from "../components/sections/shared/Stats";
import AngledTicker from "../components/sections/shared/AngledTicker";
import ComplianceVault from "../components/sections/about/ComplianceVault";
import RegionalReachMap from "../components/sections/contact/RegionalReachMap";

function About() {
  return (
    <div className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen">
      <main className="relative w-full flex flex-col">
        {/* 1. Hero */}
        <AboutProfileHero />

        {/* 2. Stats */}
        <Stats />

        {/* 3. Vault, Ribbon & Regional Network */}
        <div className="space-y-16 py-8">
          <ComplianceVault />
          <AngledTicker />
          <RegionalReachMap />
        </div>
      </main>
    </div>
  );
}

export default memo(About);