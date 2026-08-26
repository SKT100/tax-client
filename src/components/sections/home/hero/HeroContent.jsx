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
      className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 mt-16 pointer-events-none"
    >
      <motion.h1
        variants={itemVariants}
        className="font-display text-display-huge text-white drop-shadow-md"
      >
        Tax <br /> <span className="font-serif italic font-light">
          &
        </span> Compliance
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="mt-8 text-sm md:text-lg font-light text-white/90 uppercase tracking-widest max-w-2xl h-8 overflow-hidden relative w-full"
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
        <Link
          to="/services"
          data-interactive="true"
          className="inline-block"
        >
          <PillButton
            variant="on-dark"
            className="px-10 py-4 text-sm"
            data-interactive="true"
          >
            EXPLORE TAX SERVICES
          </PillButton>
        </Link>
      </motion.div>
    </motion.div>
  );
}