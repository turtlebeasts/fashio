import { motion } from "motion/react";

export default function PageVeil({ show }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-black pointer-events-none z-[100]"
    />
  );
}
