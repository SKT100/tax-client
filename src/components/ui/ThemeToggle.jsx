// src/components/ui/ThemeToggle.jsx

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ onToggle }) {
  // Synchronously read the pre-hydrated DOM state (correct now that
  // index.html sets the real theme class before React ever mounts)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  const [ripple, setRipple] = useState(null);

  // Ref, not state, for the rapid-click guard. Refs mutate synchronously —
  // no render/commit gap for a fast second click to slip through, unlike
  // checking `ripple` state directly (which can read a stale closure).
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggle = (e) => {
    if (isAnimatingRef.current) return; // hard, synchronous lock
    isAnimatingRef.current = true;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextDark = !isDark;

    // Ripple starts growing immediately — this IS the instant tactile
    // feedback, so there's no perceived lag even though the actual
    // theme swap below is deliberately timed to land mid-animation.
    setRipple({ x, y, nextDark });

    // Swap the theme once the ripple has grown enough to visually
    // "reveal" it, instead of at t=0 (which made the ripple look like
    // decoration on an already-changed page) or at t=850ms (which was
    // the original sluggish-feeling delay). ~350ms lines up with the
    // ripple covering most of the viewport under the easeInOut curve.
    setTimeout(() => {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      if (onToggle) onToggle();
    }, 350);

    setTimeout(() => {
      setRipple(null);
      isAnimatingRef.current = false; // release the lock only once the animation is done
    }, 850);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        className="p-2 text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark relative z-[10000] group transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun
            size={18}
            className="transition-all duration-300 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <Moon
            size={18}
            className="transition-all duration-300 opacity-80 group-hover:opacity-100"
          />
        )}
      </button>

      <AnimatePresence>
        {ripple && (
          <motion.div
            initial={{ scale: 0, opacity: 0.92 }}
            animate={{ scale: 35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            style={{
              position: "fixed",
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
              backgroundColor: ripple.nextDark ? "#141313" : "#FBF9F5",
              borderRadius: "50%",
              zIndex: 9998,
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}