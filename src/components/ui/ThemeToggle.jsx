import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ onToggle }) {
  const [isDark, setIsDark] = useState(true);
  const [ripple, setRipple] = useState(null);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const handleToggle = (e) => {
    if (ripple) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextDark = !isDark;

    setRipple({ x, y, nextDark });

    setTimeout(() => {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      setIsDark(nextDark);
      if (onToggle) onToggle();
    }, 350);

    setTimeout(() => {
      setRipple(null);
    }, 850);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="p-2 text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark relative z-[10000] group transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun
            size={18}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]"
          />
        ) : (
          <Moon
            size={18}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(30,41,59,0.8)]"
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
              backgroundColor: ripple.nextDark ? "#121212" : "#FBF9F5",
              borderRadius: "50%",
              zIndex: 9998,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
