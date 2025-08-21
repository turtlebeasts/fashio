// src/sections/LookbookCarousel.jsx
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const slides = [
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

function Look({ img, title, caption }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // when the panel enters/leaves viewport
  });

  // Parallax background drift & subtle zoom
  const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  // Caption parallax + fade
  const yCap = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const capOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.8]
  );

  return (
    <section
      ref={ref}
      className="relative h-screen w-full snap-start overflow-hidden bg-black text-white"
    >
      {/* Background image (fills, parallax drifts) */}
      <motion.img
        src={img}
        alt={title}
        style={{ y: yImg, scale: scaleImg }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient veil for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      {/* Caption block */}
      <motion.div
        style={{ y: yCap, opacity: capOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-serif text-5xl md:text-7xl"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-lg md:text-2xl text-white/90 tracking-wide"
        >
          {caption}
        </motion.p>
      </motion.div>

      {/* Subtle bottom cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/70">
        SCROLL
      </div>
    </section>
  );
}

export default function LookbookCarousel() {
  return (
    <div className="relative bg-black text-white">
      {/* Sticky title that fades as carousel starts */}
      <div className="sticky top-0 z-10 flex h-16 items-center justify-center bg-gradient-to-b from-black/80 to-transparent">
        <span className="font-serif text-xl tracking-wide">
          Editorial Lookbook
        </span>
      </div>

      {/* Scroll-snap vertical container */}
      <div className="h-[400vh] snap-y snap-mandatory">
        {slides.map((s, i) => (
          <Look key={i} img={s.img} title={s.title} caption={s.caption} />
        ))}
      </div>
    </div>
  );
}
