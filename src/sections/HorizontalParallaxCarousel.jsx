// src/sections/HorizontalParallaxCarousel.jsx
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Magnetic from "../components/Magnetic";

const SLIDES = [
  {
    img: "https://picsum.photos/id/1011/1600/2200",
    title: "Look I",
    caption: "Silhouettes in shadow",
  },
  {
    img: "https://picsum.photos/id/1035/1600/2200",
    title: "Look II",
    caption: "Sculpted textures",
  },
  {
    img: "https://picsum.photos/id/1060/1600/2200",
    title: "Look III",
    caption: "Velvet & chrome",
  },
  {
    img: "https://picsum.photos/id/1068/1600/2200",
    title: "Look IV",
    caption: "Edge of couture",
  },
];

function Slide({ s, scrollYProgress }) {
  // per-slide inner parallax (gentle)
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);
  const capY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div className="relative h-full w-screen flex-shrink-0 overflow-hidden">
      <motion.img
        src={s.img}
        alt={s.title}
        style={{ x, scale }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      <motion.div
        style={{ y: capY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <Magnetic>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-3 font-serif text-5xl md:text-7xl"
          >
            {s.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-2xl text-white/90 tracking-wide"
          >
            {s.caption}
          </motion.p>
        </Magnetic>
      </motion.div>
    </div>
  );
}

export default function HorizontalParallaxCarousel() {
  const trackRef = useRef(null);
  const spacerRef = useRef(null);
  const [baseTop, setBaseTop] = useState(0); // page Y where spacer starts
  const [vh, setVh] = useState(0); // cached viewport height

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const distanceVW = (SLIDES.length - 1) * 100;
  const xTrack = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${distanceVW}vw`]
  );

  // compute page position of spacer & viewport height
  useEffect(() => {
    function measure() {
      const rect = spacerRef.current.getBoundingClientRect();
      setBaseTop(window.scrollY + rect.top);
      setVh(window.innerHeight);
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // derive active index from progress (0..slides-1)
  const [active, setActive] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const idx = Math.round(p * (SLIDES.length - 1));
      setActive(idx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  function scrollToIndex(i) {
    if (!vh) return;
    // our spacer height is slides * 100vh
    const y = baseTop + i * vh;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <section ref={trackRef} className="relative bg-black text-white">
      {/* spacer defines vertical length */}
      <div ref={spacerRef} className={`h-[${SLIDES.length * 100}vh]`}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x: xTrack }}
            className="flex h-full will-change-transform"
          >
            {SLIDES.map((s, i) => (
              <Slide key={i} s={s} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>

          {/* Progress dots (right side) */}
          <div className="pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className="group relative h-4 w-4"
              >
                {/* outer faint ring */}
                <span className="absolute inset-0 rounded-full ring-1 ring-white/30 group-hover:ring-white/60 transition" />
                {/* inner dot fills when active */}
                <span
                  className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                    i === active
                      ? "bg-white"
                      : "bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
