// src/sections/Hero.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Magnetic from "../components/Magnetic";
import SmartBackdrop from "../components/SmartBackdrop";
import AnimatedWord from "../components/AnimatedWord";

export default function Hero() {
  const ref = useRef(null);
  const words = ["Motion", "Life", "You", "City", "Style"];

  // Scroll-linked parallax for background (gentle) + Ken Burns zoom
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // move as hero exits
  });

  // Drift background slightly and zoom out a touch as you scroll
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* BACKDROP: choose one of the two below (video OR image). Keep both if you want automatic fallback. */}
      <SmartBackdrop
        parallaxStyle={{ y: yBg, scale: scaleBg }}
        poster="/hero-poster.jpg" // lightweight still frame
        imageSrc="https://picsum.photos/id/1011/2000/1200" // fallback image
        videoSrc={{
          webm: "/hero.webm", // encode both if you can
          mp4: "/hero.mp4",
        }}
      />
      {/* A) Background VIDEO (drop your .mp4/.webm in /public and update src) */}
      <motion.video
        style={{ y: yBg, scale: scaleBg }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4" // <-- replace with your file
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* B) Fallback IMAGE (comment out if you always have a video) */}
      {/* <motion.img
        style={{ y: yBg, scale: scaleBg }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="https://picsum.photos/id/1011/2000/1200"
        alt="Couture backdrop"
        decoding="async"
        fetchpriority="high"
      /> */}

      {/* Legibility gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Top kicker */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-3 text-xs tracking-[0.35em] text-white/80"
        >
          COLLECTION · 2025
        </motion.span>

        {/* Headline (staggered words) */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: "0.02em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight"
          >
            Fashion in <AnimatedWord words={words} />
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-xl text-base md:text-lg text-white/80"
        >
          Couture silhouettes, sculpted textures, and editorial elegance.
        </motion.p>

        {/* CTA (magnetic) */}
        <Magnetic className="mt-8 inline-block">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full border border-white/30 backdrop-blur text-sm tracking-widest uppercase"
            onClick={() => {
              // smooth scroll to next section
              const next = document.getElementById("collections");
              if (next) {
                const y =
                  next.getBoundingClientRect().top + window.scrollY - 64;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            Explore Collection
          </motion.button>
        </Magnetic>
      </div>

      {/* Subtle corner vignette (hero-only) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 100%)",
        }}
      />

      {/* Scroll hint (auto hides once you scroll anyway) */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] text-white/80">
        SCROLL
        <motion.span
          aria-hidden
          className="ml-2 inline-block"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ▾
        </motion.span>
      </div>
    </section>
  );
}
