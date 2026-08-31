import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HERO_SLIDES } from "../../../../data/heroSlides";
import PillButton from "../../../ui/PillButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function HeroContent({ index }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-margin-mobile mt-16 pointer-events-none"
    >
      <motion.h1
        variants={itemVariants}
        className="font-serif text-display-huge text-white drop-shadow-lg tracking-tight leading-[0.92]"
      >
        Tax <br />
        <span className="italic font-light opacity-90">&amp; Compliance</span>
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="mt-8 font-mono text-xs sm:text-sm font-light text-white/90 uppercase tracking-[0.25em] max-w-2xl h-8 overflow-hidden relative w-full"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 w-full flex justify-center"
          >
            {HERO_SLIDES[index].text}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-10 pointer-events-auto">
        <Link to="/services" data-interactive="true" className="inline-block no-underline">
          <PillButton
            variant="on-dark"
            className="px-8 sm:px-10 py-3.5 sm:py-4 text-xs font-mono font-bold tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            data-interactive="true"
          >
            EXPLORE TAX SERVICES
          </PillButton>
        </Link>
      </motion.div>
    </motion.div>
  );
}