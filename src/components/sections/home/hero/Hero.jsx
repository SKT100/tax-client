// src/components/sections/home/hero/Hero.jsx

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { HERO_SLIDES, ZONE } from "../../../../data/heroSlides";
import HeroMediaLayers from "./HeroMediaLayers";
import HeroContent from "./HeroContent";
import HeroLandmarkCard from "./HeroLandmarkCard";
import HeroCursorBadge from "./HeroCursorBadge";

const AUTO_EXPAND_DELAY = 5500; // 5.5s idle interval

export default function Hero() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [cursorDirection, setCursorDirection] = useState("right");
  const [isExpanding, setIsExpanding] = useState(false);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [isOverUI, setIsOverUI] = useState(false);

  // Synchronous refs to prevent animation race conditions
  const isExpandingRef = useRef(false);
  const isHoveringHeroRef = useRef(false);
  const isOverUIRef = useRef(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const radius = useMotionValue(0);
  const lensClipPath = useMotionTemplate`circle(${radius}px at ${mouseX}px ${mouseY}px)`;

  useEffect(() => {
    isExpandingRef.current = isExpanding;
    isHoveringHeroRef.current = isHoveringHero;
    isOverUIRef.current = isOverUI;
  }, [isExpanding, isHoveringHero, isOverUI]);

  const nextIndex =
    cursorDirection === "left"
      ? (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
      : (index + 1) % HERO_SLIDES.length;

  // Unified circular expansion trigger
  const triggerTransition = useCallback(
    (targetIdx, origin) => {
      if (isExpandingRef.current) return;
      isExpandingRef.current = true;
      setIsExpanding(true);

      // If expanding without an active cursor (mouse outside), expand from center
      if (origin) {
        mouseX.set(origin.x);
        mouseY.set(origin.y);
      }

      animate(radius, 2400, {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1],
        onComplete: () => {
          setIndex(targetIdx);
          radius.set(0);
          setIsExpanding(false);
          isExpandingRef.current = false;

          // If user is actively hovering over the hero, smoothly restore the 100px lens
          if (isHoveringHeroRef.current && !isOverUIRef.current) {
            animate(radius, 100, { duration: 0.35, ease: "easeOut" });
          }
        },
      });
    },
    [mouseX, mouseY, radius]
  );

  // Mouse coordinate and interactive boundary tracker
  useEffect(() => {
    let lastX = -500;
    let lastY = -500;
    let currentZone = ZONE.OUTSIDE;

    const evaluatePointerState = (clientX, clientY) => {
      if (!containerRef.current || !targetRef.current || isExpandingRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const localX = clientX - containerRect.left;
      const localY = clientY - containerRect.top;
      mouseX.set(localX);
      mouseY.set(localY);
      setCursorDirection(localX < containerRect.width / 2 ? "left" : "right");

      const isInsideX = clientX >= targetRect.left && clientX <= targetRect.right;
      const isInsideY = clientY >= targetRect.top && clientY <= targetRect.bottom;
      const isInsideHero = isInsideX && isInsideY;
      setIsHoveringHero(isInsideHero);

      let nextZone = ZONE.OUTSIDE;
      if (isInsideHero) {
        const isHeaderZone = clientY < 75;
        const elAtPoint = document.elementFromPoint(clientX, clientY);
        const isOverInteractive = Boolean(
          elAtPoint && elAtPoint.closest("button, a, [data-interactive]")
        );
        nextZone =
          isHeaderZone || isOverInteractive
            ? ZONE.INSIDE_UI
            : ZONE.INSIDE_CLEAR;
      }

      if (nextZone === currentZone) return;
      setIsOverUI(nextZone === ZONE.INSIDE_UI);

      if (nextZone === ZONE.OUTSIDE || nextZone === ZONE.INSIDE_UI) {
        animate(radius, 0, { duration: 0.25, ease: "easeInOut" });
      } else if (nextZone === ZONE.INSIDE_CLEAR) {
        animate(radius, 100, { duration: 0.25, ease: "easeOut" });
      }
      currentZone = nextZone;
    };

    let rAF = null;
    const handleWindowMouseMove = (e) => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        evaluatePointerState(e.clientX, e.clientY);
      });
    };

    const handleScroll = () => {
      evaluatePointerState(lastX, lastY);
    };

    const handleWindowMouseLeave = (e) => {
      if (e.relatedTarget === null && e.target.nodeName === "HTML") {
        evaluatePointerState(-500, -500);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleWindowMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleWindowMouseLeave);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, [radius, mouseX, mouseY]);

  // Manual click trigger
  const handleHeroClick = (e) => {
    if (isExpanding || !isHoveringHero || isOverUI) return;
    if (e.target.closest("button, a, [data-interactive]")) return;

    triggerTransition(nextIndex, null);
  };

  // 5.5-second idle auto-expansion
  useEffect(() => {
    if (isExpanding || isOverUI) return;

    const timer = setTimeout(() => {
      if (!containerRef.current || isExpandingRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const isHovered = isHoveringHeroRef.current && !isOverUIRef.current;
      const origin = isHovered
        ? null
        : { x: rect.width / 2, y: rect.height / 2 };

      triggerTransition(nextIndex, origin);
    }, AUTO_EXPAND_DELAY);

    return () => clearTimeout(timer);
  }, [index, nextIndex, isExpanding, isOverUI, triggerTransition]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.92]);
  const scale = useSpring(rawScale, { stiffness: 250, damping: 28, mass: 0.5 });
  const rawBorderRadius = useTransform(scrollYProgress, [0, 0.85], [0, 28]);
  const smoothBorderRadius = useSpring(rawBorderRadius, {
    stiffness: 250,
    damping: 28,
    mass: 0.5,
  });
  const borderRadius = useTransform(smoothBorderRadius, (val) => `${val}px`);
  const showCustomCursor = isHoveringHero && !isOverUI && !isExpanding;

  return (
    <section
      ref={targetRef}
      className={`relative h-[125vh] w-full -mt-20 select-none ${
        showCustomCursor ? "cursor-none" : "cursor-auto"
      }`}
      onClick={handleHeroClick}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        <motion.div
          ref={containerRef}
          className="relative overflow-hidden bg-surface-dark border-theme transition-colors duration-300 w-full h-full origin-center"
          style={{ scale, borderRadius }}
        >
          <HeroMediaLayers
            index={index}
            nextIndex={nextIndex}
            isHoveringHero={isHoveringHero}
            isExpanding={isExpanding}
            lensClipPath={lensClipPath}
          />
          <div className="absolute inset-0 bg-black/45 z-20 pointer-events-none" />
          <HeroContent index={index} />
          <HeroLandmarkCard />
          <HeroCursorBadge
            showCustomCursor={showCustomCursor}
            cursorDirection={cursorDirection}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </motion.div>
      </div>
    </section>
  );
}