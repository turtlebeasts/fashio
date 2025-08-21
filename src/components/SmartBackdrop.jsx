import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Props:
 *  - videoSrc: { webm?: string, mp4?: string }
 *  - poster: string (fallback still)
 *  - imageSrc: string (fallback background image)
 *  - parallaxStyle: style object for motion transforms (y/scale) coming from parent
 */
export default function SmartBackdrop({
  videoSrc = {},
  poster,
  imageSrc,
  parallaxStyle,
}) {
  const [mode, setMode] = useState("image"); // "video" | "image"

  useEffect(() => {
    let cancelled = false;

    async function decide() {
      // Respect reduced motion
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        if (!cancelled) setMode("image");
        return;
      }

      // If mobile Safari often blocks autoplay with sound; we keep muted anyway
      const isCoarse = matchMedia?.("(pointer: coarse)")?.matches;

      // Check network (optional but useful)
      const downlink = navigator.connection?.downlink || 5; // Mbps
      const saveData = navigator.connection?.saveData;

      // Heuristic: only use video if not on data‑saving, link >= 2Mbps
      const canStream = !saveData && downlink >= 2;

      // Try a quick autoplay probe
      const probe = document.createElement("video");
      probe.muted = true;
      probe.playsInline = true;
      probe.src = videoSrc.webm || videoSrc.mp4 || "";
      const canPlay =
        probe.canPlayType("video/webm") || probe.canPlayType("video/mp4");

      if (!canPlay || !canStream) {
        if (!cancelled) setMode("image");
        return;
      }

      try {
        await probe.play();
        probe.pause();
        if (!cancelled) setMode("video");
      } catch {
        if (!cancelled) setMode("image");
      }
    }

    decide();
    return () => {
      cancelled = true;
    };
  }, [videoSrc]);

  // Render
  return (
    <>
      {mode === "video" ? (
        <motion.video
          key="vid"
          style={parallaxStyle}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          {videoSrc.webm && <source src={videoSrc.webm} type="video/webm" />}
          {videoSrc.mp4 && <source src={videoSrc.mp4} type="video/mp4" />}
        </motion.video>
      ) : (
        <motion.img
          key="img"
          style={parallaxStyle}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={imageSrc || poster}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      )}
    </>
  );
}
