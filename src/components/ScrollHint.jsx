// src/components/ScrollHint.jsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowCircleDownIcon } from "@phosphor-icons/react";

/** Shows a tiny animated hint, then hides after first wheel/touch/keydown */
export default function ScrollHint({ text = "SCROLL", side = "bottom" }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hide = () => setShow(false);
    window.addEventListener("wheel", hide, { once: true });
    window.addEventListener("touchstart", hide, { once: true });
    window.addEventListener("keydown", hide, { once: true });
    const t = setTimeout(hide, 5000); // auto-hide after 5s anyway
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const base =
    "pointer-events-none fixed z-[996] text-[10px] tracking-[0.25em] text-white/80 flex items-center justify-center";
  const pos =
    side === "bottom"
      ? "left-1/2 -translate-x-1/2 bottom-6"
      : "top-1/2 right-6 -translate-y-1/2 rotate-90"; // for horizontal carousels

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${base} ${pos}`}
    >
      {text}
      <motion.span
        aria-hidden
        className="ml-2 inline-block"
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowCircleDownIcon className="text-sm" />
      </motion.span>
    </motion.div>
  );
}
