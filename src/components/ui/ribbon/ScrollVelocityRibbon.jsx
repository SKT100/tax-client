import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
export function ScrollVelocityRibbon({ children, baseVelocity = 0.25 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 1000],
    [-0.8, 0.8],
    { clamp: true },
  );
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 16);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy * 0.025);
  });
  const x = useTransform(baseX, (v) => `${(((v % 50) + 50) % 50) - 50}%`);
  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full">
      {" "}
      <motion.div
        className="flex flex-nowrap shrink-0 items-center gap-8 md:gap-12 lg:gap-16 pr-8 md:pr-12 lg:pr-16"
        style={{ x }}
      >
        {" "}
        {children} {children} {children} {children}{" "}
      </motion.div>{" "}
    </div>
  );
}
