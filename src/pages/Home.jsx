import Hero from '../components/sections/home/hero/Hero';
import AngledTicker from '../components/sections/shared/AngledTicker';
import Stats from '../components/sections/shared/Stats';
import HomePracticeSection from '../components/sections/home/HomePracticeSection';
import PhilosophySection from '../components/sections/home/philosophy/Philosophy';
import TestimonialsSection from '../components/sections/shared/TestimonialsSection';
import FAQSection from '../components/sections/shared/FAQSection';

export default function Home() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark transition-colors duration-300 min-h-screen">
      <main className="relative w-full flex flex-col pb-[35vh] md:pb-[45vh]">
        <Hero />
        <AngledTicker />
        <Stats />
        <HomePracticeSection />
        <PhilosophySection />
        <TestimonialsSection />
        <FAQSection />
      </main>
    </div>
  );
}