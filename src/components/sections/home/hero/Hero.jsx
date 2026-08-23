import { useState, useEffect, useRef } from "react";
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
export default function Hero() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [cursorDirection, setCursorDirection] = useState("right");
  const [isExpanding, setIsExpanding] = useState(false);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [isOverUI, setIsOverUI] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const radius = useMotionValue(0);
  const lensClipPath = useMotionTemplate`circle(${radius}px at ${mouseX}px ${mouseY}px)`;
  useEffect(() => {
    let lastX = -500;
    let lastY = -500;
    let currentZone = ZONE.OUTSIDE;
    const evaluatePointerState = (clientX, clientY) => {
      if (!containerRef.current || !targetRef.current || isExpanding) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const localX = clientX - containerRect.left;
      const localY = clientY - containerRect.top;
      mouseX.set(localX);
      mouseY.set(localY);
      setCursorDirection(localX < containerRect.width / 2 ? "left" : "right");
      const isInsideX =
        clientX >= targetRect.left && clientX <= targetRect.right;
      const isInsideY =
        clientY >= targetRect.top && clientY <= targetRect.bottom;
      const isInsideHero = isInsideX && isInsideY;
      setIsHoveringHero(isInsideHero);
      let nextZone = ZONE.OUTSIDE;
      if (isInsideHero) {
        const isHeaderZone = clientY < 75;
        const elAtPoint = document.elementFromPoint(clientX, clientY);
        const isOverInteractive = Boolean(
          elAtPoint && elAtPoint.closest("button, a, [data-interactive]"),
        );
        nextZone =
          isHeaderZone || isOverInteractive
            ? ZONE.INSIDE_UI
            : ZONE.INSIDE_CLEAR;
      }
      if (nextZone === currentZone) return;
      setIsOverUI(nextZone === ZONE.INSIDE_UI);
      if (nextZone === ZONE.OUTSIDE) {
        animate(radius, 0, { duration: 0.25, ease: "easeIn" });
      } else if (nextZone === ZONE.INSIDE_UI) {
        animate(radius, 0, { duration: 0.25, ease: "easeInOut" });
      } else if (nextZone === ZONE.INSIDE_CLEAR) {
        if (currentZone === ZONE.OUTSIDE) {
          animate(radius, 100, { duration: 0.3, ease: "easeOut" });
        } else {
          animate(radius, 100, { duration: 0.25, ease: "easeInOut" });
        }
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
    };
  }, [radius, isExpanding, mouseX, mouseY]);
  const nextIndex =
    cursorDirection === "left"
      ? (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
      : (index + 1) % HERO_SLIDES.length;
  const handleHeroClick = (e) => {
    if (isExpanding || !isHoveringHero || isOverUI) return;
    if (e.target.closest("button, a, [data-interactive]")) return;
    setIsExpanding(true);
    animate(radius, 2200, {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        setIndex(nextIndex);
        setIsExpanding(false);
        radius.set(0);
        if (isHoveringHero && !isOverUI) {
          animate(radius, 100, { duration: 0.3, ease: "easeOut" });
        }
      },
    });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveringHero && !isExpanding) {
        setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isHoveringHero, isExpanding]);
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
  const showCustomCursor = isHoveringHero && !isOverUI;
  return (
    <section
      ref={targetRef}
      className={`relative h-[125vh] w-full -mt-20 select-none ${showCustomCursor ? "cursor-none" : "cursor-auto"}`}
      onClick={handleHeroClick}
    >
      {" "}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden gpu-layer transform-gpu will-change-transform bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        {" "}
        <motion.div
          ref={containerRef}
          className="relative overflow-hidden bg-[#121212] border-theme transition-colors duration-300 w-full h-full origin-center"
          style={{ scale, borderRadius }}
        >
          {" "}
          <HeroMediaLayers
            index={index}
            nextIndex={nextIndex}
            isHoveringHero={isHoveringHero}
            lensClipPath={lensClipPath}
          />{" "}
          <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />{" "}
          <HeroContent index={index} /> <HeroLandmarkCard />{" "}
          <HeroCursorBadge
            showCustomCursor={showCustomCursor}
            cursorDirection={cursorDirection}
            mouseX={mouseX}
            mouseY={mouseY}
          />{" "}
        </motion.div>{" "}
      </div>{" "}
    </section>
  );
}
