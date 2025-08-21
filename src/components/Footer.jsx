// src/components/Footer.jsx
import { motion } from "motion/react";
import Magnetic from "./Magnetic";
import {
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-neutral-950 text-white border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-12 md:grid-cols-2"
        >
          {/* Left side */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Fashio</h2>
            <p className="mt-3 text-sm text-white/70 max-w-xs">
              Redefining couture with motion, texture, and timeless design.
            </p>

            {/* socials */}
            <div className="mt-6 flex gap-4">
              {[InstagramLogo, TwitterLogo, YoutubeLogo].map((Icon, i) => (
                <Magnetic key={i}>
                  <button className="p-2 hover:text-white/90">
                    <Icon size={20} weight="regular" />
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {/* Nav links */}
            <nav className="flex flex-wrap gap-6 text-sm uppercase tracking-widest text-white/70">
              {["Collections", "Bags", "Story", "Lookbook"].map((link) => (
                <Magnetic key={link}>
                  <button className="hover:text-white">{link}</button>
                </Magnetic>
              ))}
            </nav>

            {/* newsletter */}
            <div className="w-full max-w-xs">
              <label
                htmlFor="newsletter"
                className="block text-xs tracking-[0.25em] uppercase mb-2 text-white/50"
              >
                Subscribe
              </label>
              <div className="flex items-center">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent border-b border-white/30 px-2 py-2 text-sm focus:outline-none"
                />
                <Magnetic>
                  <button
                    aria-label="Subscribe"
                    className="ml-2 px-3 py-2 rounded-full border border-white/30 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                  >
                    Join
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </motion.div>

        {/* bottom note */}
        <div className="mt-16 flex flex-col items-center text-xs text-white/40 gap-2">
          <p>© {new Date().getFullYear()} MRIGANKA — All Rights Reserved.</p>
          <p>Made with motion & couture ✨</p>
        </div>
      </div>
    </footer>
  );
}
