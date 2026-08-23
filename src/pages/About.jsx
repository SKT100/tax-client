import AboutProfileHero from '../components/sections/about/AboutProfileHero';
import Stats from '../components/sections/shared/Stats';
import AngledTicker from '../components/sections/shared/AngledTicker';
import EmpanelmentsVault from '../components/sections/about/EmpanelmentsVault';
import BeyondTheBar from '../components/sections/about/BeyondTheBar';
import ChambersNetwork from '../components/sections/about/ChambersNetwork';

export default function About() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen">
      <main className="relative w-full flex flex-col pb-[35vh] md:pb-[45vh]">
        {/* 1. Hero */}
        <AboutProfileHero />

        {/* 2. Stats */}
        <Stats />

        {/* 3. Vault, Beyond the Bar, Ribbon & Chambers */}
        <div className="space-y-16 py-8">
          <EmpanelmentsVault />
          <BeyondTheBar />
          <AngledTicker />
          <ChambersNetwork />
        </div>
      </main>
    </div>
  );
}