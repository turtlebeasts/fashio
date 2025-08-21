// src/components/AnimatedWord.jsx
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function AnimatedWord({ words, interval = 3000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="inline-block origin-bottom font-serif text-green-500"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
