import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { BookOpen, Music } from "lucide-react";

export default function BeyondTheBar() {
  const sectionRef = useRef(null);

  // 🌟 1. Real-time Scroll Scrub (1:1 lockstep with your scroll position)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center 55%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  // 🌟 2. Split Sweep Motion: Left & Right cards glide inward as you scroll down
  // and smoothly retreat back outward when you scroll up
  const leftX = useTransform(smoothProgress, [0, 1], ["-110%", "0%"]);
  const rightX = useTransform(smoothProgress, [0, 1], ["110%", "0%"]);
  const cardsOpacity = useTransform(smoothProgress, [0, 0.35], [0, 1]);

  // Section Header Entrance
  const headerY = useTransform(smoothProgress, [0, 0.6], [30, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="beyond-the-bar"
      className="px-margin-mobile md:px-margin-desktop relative py-16 sm:py-24 md:py-32 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-container-max-width mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-10 sm:mb-14 md:mb-16 text-left will-change-transform"
        >
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark block mb-2 sm:mb-3">
            PERSONAL ENDEAVORS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-primary-light dark:text-primary-dark leading-[1.08] tracking-tight">
            Beyond the Bar
          </h2>
        </motion.div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          
          {/* 🌟 Card 1: Publications (Sweeps in from Left) */}
          <motion.div
            style={{ x: leftX, opacity: cardsOpacity }}
            className="group relative overflow-hidden shadow-2xl rounded-2xl sm:rounded-3xl aspect-[16/11] sm:aspect-[4/3] md:aspect-[16/11] min-h-[300px] sm:min-h-[360px] md:min-h-[400px] bg-[#0F0F12] border border-white/10 hover:border-white/30 transition-colors duration-500 will-change-transform"
          >
            {/* Background Image with Zoom */}
            <img
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-45 group-hover:opacity-85 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtQgyJhS3JB9H3mrbiddDdcJCCgetNdvmuL-oRU0wqoZVho0Lz8Fmhrm7teATxix2rOSEy6hvvheDbXdXNha6FHmn4Eh5T65hAqohW81cGz2cTJQO6NcmFNRaoNfw5HSdXwQ-bhbC1DVHcdc90085fSHp0veaHxk4pcZf-Y8Jq2GB9XG5B0-TiFGAiZz5WFpRjgVoD0dHYoPusZ4OHUfF9dD4YxxVeWpuypZZ99VF1rIw8Q9i4bEu6"
              alt="Publications workspace"
            />

            {/* Ambient Multi-Stop Gradient Shield */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

            {/* Top Glass Badge */}
            <div className="absolute top-5 sm:top-7 left-5 sm:left-7 z-10 pointer-events-none">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 shadow-md">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-9 z-10 flex flex-col gap-2.5">
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                LITERARY CANON
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                Publications
              </h3>
              <p className="font-body font-light text-xs sm:text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
                11 Copyrighted Literary Works including <strong className="font-medium text-white">'Fiery Sense Poems'</strong> and <strong className="font-medium text-white">'Indigenous Bharat'</strong>, exploring cultural heritage and administrative nuance.
              </p>
            </div>
          </motion.div>

          {/* 🌟 Card 2: Music Pursuits (Sweeps in from Right) */}
          <motion.div
            style={{ x: rightX, opacity: cardsOpacity }}
            className="group relative overflow-hidden shadow-2xl rounded-2xl sm:rounded-3xl aspect-[16/11] sm:aspect-[4/3] md:aspect-[16/11] min-h-[300px] sm:min-h-[360px] md:min-h-[400px] bg-[#0F0F12] border border-white/10 hover:border-white/30 transition-colors duration-500 will-change-transform"
          >
            {/* Background Image with Zoom */}
            <img
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-45 group-hover:opacity-85 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJqufNHGG9TUH8mmLSfsbI4C0eDR3Yi3ww3XLLEazSnoNBSKBkKuG5t9EbvnNh4A6e_iYpfnWCJBFiUmLWyGTBUFsioEEt-ksA6FNLFGVXFEG4X5RO-c-BKMBKUzTE8aMwimNlaJTS3U9diPQgXVluPc-KBQ3UjftbXHGuX0_DTCJv2qV3Xpqapsf6aSxiIHabPAGGSHnBdNETBOSCnSBoHDzDM_zNOh8V4x7-NGHidqg8UP9kihDd"
              alt="Music Pursuits"
            />

            {/* Ambient Multi-Stop Gradient Shield */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

            {/* Top Glass Badge */}
            <div className="absolute top-5 sm:top-7 left-5 sm:left-7 z-10 pointer-events-none">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 shadow-md">
                <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-9 z-10 flex flex-col gap-2.5">
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                CREATIVE HARMONY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                Music Pursuits
              </h3>
              <p className="font-body font-light text-xs sm:text-sm md:text-base text-white/80 max-w-lg leading-relaxed">
                3 Registered Compositions finding balance through rhythm—a sanctuary where the analytical mind explores melodic expression.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}