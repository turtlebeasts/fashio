import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function SplitShowcase({
  leftImage,
  rightImage,
  title,
  subtitle,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex overflow-hidden bg-black text-white"
    >
      {/* Left image */}
      <div className="w-1/2 relative overflow-hidden flex items-center justify-center">
        <motion.img
          src={leftImage}
          style={{ y: yLeft }}
          className="object-cover h-full w-full"
        />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-10 left-10 text-3xl font-serif"
        >
          {title}
        </motion.h2>
      </div>

      {/* Right image */}
      <div className="w-1/2 relative overflow-hidden flex items-center justify-center">
        <motion.img
          src={rightImage}
          style={{ y: yRight }}
          className="object-cover h-full w-full"
        />
        <motion.p
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-10 right-10 text-lg tracking-wide"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
