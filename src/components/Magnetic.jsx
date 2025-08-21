// src/components/Magnetic.jsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Wrap any element to give it a magnetic hover lift that follows the cursor.
 * Also sets data-cursor="magnetic" so your custom cursor snaps to it.
 */
export default function Magnetic({
  strength = 12, // how far it moves toward cursor
  scale = 1.04, // hover scale
  className = "",
  children,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 300, damping: 25, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 25, mass: 0.6 });

  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(px * strength);
    y.set(py * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      data-cursor="magnetic"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ translateX: tx, translateY: ty }}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
