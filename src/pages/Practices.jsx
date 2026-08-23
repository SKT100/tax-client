import { useRef } from 'react';
import PracticesHero from '../components/sections/practices/PracticesHero';
import AngledTicker from '../components/sections/shared/AngledTicker';
import PracticeAreas from '../components/sections/practices/PracticeAreas';
import LandmarkCases from '../components/sections/practices/LandmarkCases';
import TestimonialsSection from '../components/sections/shared/TestimonialsSection';
import PracticeScrollThread from '../components/sections/practices/PracticeScrollThread';

export default function Practices() {
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className="relative bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen overflow-hidden"
    >
      {/* Background Animated Golden Text Curve */}
      <PracticeScrollThread containerRef={containerRef} />

      <main className="relative z-10 w-full flex flex-col pb-[35vh] md:pb-[45vh]">
        <PracticesHero />
        <AngledTicker />
        <PracticeAreas />
        <LandmarkCases />
        <TestimonialsSection />
      </main>
    </div>
  );
}