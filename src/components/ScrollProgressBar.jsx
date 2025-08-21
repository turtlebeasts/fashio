// src/components/ScrollProgressBar.jsx
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll(); // 0..1 across the whole page
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 h-[2px] w-full origin-left bg-white/80 z-[999]"
    />
  );
}
