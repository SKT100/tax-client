import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCursorBadge({
  showCustomCursor,
  cursorDirection,
  mouseX,
  mouseY,
}) {
  return (
    <AnimatePresence>
      {showCustomCursor && (
        <motion.div
          key="hero-cursor-preview-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%" }}
          className="absolute z-40 pointer-events-none p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/40 text-white shadow-2xl flex items-center justify-center"
        >
          {cursorDirection === "left" ? (
            <ChevronLeft size={20} className="pointer-events-none text-white" />
          ) : (
            <ChevronRight size={20} className="pointer-events-none text-white" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}