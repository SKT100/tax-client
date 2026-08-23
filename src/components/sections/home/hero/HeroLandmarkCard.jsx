import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export default function HeroLandmarkCard() {
  return (
    <motion.div
      data-interactive="true"
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="absolute bottom-10 right-10 z-30 max-w-[300px] md:max-w-sm bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col gap-2 transition-colors duration-300 hidden sm:flex pointer-events-auto"
    >
      {" "}
      <div className="text-[11px] font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
        {" "}
        Landmark Matter{" "}
      </div>{" "}
      <p className="text-sm text-white font-medium leading-relaxed">
        {" "}
        Supreme Court Civil Appeal Representation{" "}
      </p>{" "}
      <Link
        to="/practices?area=appellate#practice-areas"
        data-interactive="true"
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white mt-2 link-hover cursor-pointer group w-fit"
      >
        {" "}
        <span>View Case</span>{" "}
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform"
        />{" "}
      </Link>{" "}
    </motion.div>
  );
}
