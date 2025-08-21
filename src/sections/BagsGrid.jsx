import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useMemo } from "react";
import Magnetic from "../components/Magnetic";

const IMAGES = [
  "https://picsum.photos/id/237/800/1000",
  "https://picsum.photos/id/1074/800/1000",
  "https://picsum.photos/id/1025/800/1000",
  "https://picsum.photos/id/1035/800/1000",
  "https://picsum.photos/id/1060/800/1000",
  "https://picsum.photos/id/1068/800/1000",
  "https://picsum.photos/id/1011/800/1000",
  "https://picsum.photos/id/103/800/1000",
  "https://picsum.photos/id/433/800/1000",
];

/** simple splitter: distributes items across N columns evenly */
function splitIntoColumns(items, cols = 3) {
  const out = Array.from({ length: cols }, () => []);
  items.forEach((src, i) => {
    out[i % cols].push(src);
  });
  return out;
}

function Card({ src, delay = 0 }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  return (
    <motion.div
      data-cursor="magnetic"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ rx: py * -8, ry: px * 8 });
      }}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <img src={src} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-3 left-3 text-sm tracking-wide text-white/90"
      >
        Limited Edition
      </motion.span>
    </motion.div>
  );
}

export default function BagsGrid() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // start moving as the section enters, finish as it leaves
  });

  // Column drift speeds (adjust values to taste).
  // Scrolling DOWN should make columns move UP, so we use negative y for drift.
  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]); // left (gentle)
  const yMedium = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]); // middle
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]); // right (fastest)

  // Optional: the whole section can have a subtle opacity drift
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0.7, 1, 0.9]
  );

  const columns = useMemo(() => splitIntoColumns(IMAGES, 3), []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 bg-black text-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 max-w-5xl px-6 text-center font-serif text-5xl md:text-6xl"
      >
        Designer Bags — Floating Gallery
      </motion.h2>

      {/* Grid wrapper: 2 cols on small, 3 cols on md+ */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {/* Column 0 (left / slow) */}
        <motion.div style={{ y: ySlow }} className="space-y-4 md:space-y-6">
          {columns[0].map((src, i) => (
            <Magnetic key={i} strength={10} scale={1.02} className="block">
              <Card src={src} delay={i * 0.06} />
            </Magnetic>
          ))}
        </motion.div>

        {/* Column 1 (middle / medium) */}
        <motion.div style={{ y: yMedium }} className="space-y-4 md:space-y-6">
          {columns[1].map((src, i) => (
            <Magnetic key={i} strength={10} scale={1.02} className="block">
              <Card src={src} delay={i * 0.06} />
            </Magnetic>
          ))}
        </motion.div>

        {/* Column 2 (right / fast) */}
        <motion.div style={{ y: yFast }} className="space-y-4 md:space-y-6">
          {columns[2].map((src, i) => (
            <Magnetic key={i} strength={10} scale={1.02} className="block">
              <Card src={src} delay={i * 0.06} />
            </Magnetic>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
