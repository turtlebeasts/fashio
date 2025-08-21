// src/components/CustomCursor.jsx
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/** simple linear interpolation */
const lerp = (a, b, n) => a + (b - a) * n;

/** detect coarse pointers (touch) — we'll disable the custom cursor there */
const isCoarse = () =>
  typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for dot (tight) and ring (looser)
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 80, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 80, mass: 0.3 });
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 35, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 35, mass: 0.8 });

  // Sizes (adjust to taste)
  const DOT = 14;
  const RING = 50;

  // Scale ring subtly with pointer speed (faster move → slightly larger ring)
  const speedScale = useTransform([ringX, ringY], ([x, y], prev) => {
    // crude speed calc
    const prevX = prev?.x ?? x;
    const prevY = prev?.y ?? y;
    const dx = Math.abs(x - prevX);
    const dy = Math.abs(y - prevY);
    const v = Math.min(Math.sqrt(dx * dx + dy * dy) / 30, 1); // normalize
    return lerp(1, 1.12, v);
  });

  // State refs for magnetic behavior
  const targetRef = useRef(null);
  const rafRef = useRef(null);

  // Keep ring centered visually
  const ringTranslateX = useTransform(ringX, (v) => v - RING / 2);
  const ringTranslateY = useTransform(ringY, (v) => v - RING / 2);
  const dotTranslateX = useTransform(dotX, (v) => v - DOT / 2);
  const dotTranslateY = useTransform(dotY, (v) => v - DOT / 2);

  useEffect(() => {
    if (isCoarse()) return; // disable on touch devices

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Magnetic mode: elements with data-cursor="magnetic"
    const onOver = (e) => {
      const el = e.target.closest("[data-cursor]");
      targetRef.current = el || null;
    };
    const onOut = (e) => {
      // if leaving the tracked element entirely
      if (targetRef.current && !e.relatedTarget?.closest?.("[data-cursor]")) {
        targetRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    // Magnetic animation loop: if target exists, gently steer ring toward its center
    const loop = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const newX = lerp(ringX.get(), cx, 0.2);
        const newY = lerp(ringY.get(), cy, 0.2);
        ringX.set(newX);
        ringY.set(newY);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (isCoarse()) return null;

  // Visual variants
  const isMagnetic = !!targetRef.current;
  const ringScale = isMagnetic ? 1.4 : speedScale;
  const ringBorder = isMagnetic
    ? "ring-2 ring-white/90"
    : "ring-1 ring-white/50";
  const dotScale = isMagnetic ? 0.6 : 1;

  return (
    <>
      {/* Ring */}
      <motion.div
        aria-hidden
        style={{
          translateX: ringTranslateX,
          translateY: ringTranslateY,
          scale: ringScale,
          width: RING,
          height: RING,
        }}
        className={`pointer-events-none fixed z-[9999] rounded-full ${ringBorder} bg-transparent mix-blend-difference`}
      />

      {/* Dot */}
      <motion.div
        aria-hidden
        style={{
          translateX: dotTranslateX,
          translateY: dotTranslateY,
          scale: dotScale,
          width: DOT,
          height: DOT,
        }}
        className="pointer-events-none fixed z-[10000] rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
