import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function PracticeHeader({ title = "Specialized Practices" }) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div
      ref={headerRef}
      className="w-full flex items-end justify-between border-b border-white/15 pb-3 md:pb-5 shrink-0"
    >
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-light text-white tracking-tight leading-[1.05] flex flex-wrap"
      >
        {title.split("").map((char, index) => {
          if (char === " ") {
            return (
              <span key={index} className="inline-block w-[0.25em]">
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={index}
              className="overflow-hidden inline-block pt-1 pb-1 -mt-1 -mb-1"
            >
              <motion.span variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            </span>
          );
        })}
      </motion.h2>
    </div>
  );
}