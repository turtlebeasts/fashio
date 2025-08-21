// src/sections/Story.jsx
import { motion } from "motion/react";

const lines = [
  "Crafted in ateliers that honor time.",
  "Tailored silhouettes meet sculptural bags.",
  "Every thread a quiet declaration of intent.",
  "This is couture in motion.",
];

export default function Story() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="max-w-4xl">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mb-8 font-serif text-4xl md:text-6xl"
        >
          The Story
        </motion.h3>

        <div className="space-y-4 md:space-y-5">
          {lines.map((t, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true, amount: 0.6 }}
              className="text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {t}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
