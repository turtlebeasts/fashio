// src/components/Navbar.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import Magnetic from "./Magnetic";
import {
  List as IconMenu,
  X as IconClose,
  MagnifyingGlass as IconSearch,
  ShoppingBag as IconBag,
} from "@phosphor-icons/react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "collections", label: "Collections" },
  { id: "bags", label: "Bags" },
  { id: "story", label: "Story" },
  { id: "lookbook", label: "Lookbook" },
  { id: "frames", label: "Frames" }, // your horizontal carousel
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up
  const { scrollY } = useScroll();
  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setHidden(y > lastY.current && y > 80); // after initial area
      setScrolled(y > 32);
      lastY.current = y;
    });
    return () => unsub();
  }, [scrollY]);

  // Scroll spy (observe sections)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const goTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64; // offset for nav
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const wrapperCls = useMemo(() => {
    const base =
      "fixed left-0 right-0 top-0 z-[900] transition-transform duration-300";
    const hide = hidden ? "-translate-y-full" : "translate-y-0";
    return `${base} ${hide}`;
  }, [hidden]);

  return (
    <>
      {/* BAR */}
      <div className={wrapperCls}>
        <div
          className={[
            "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
            "transition-colors duration-300",
            scrolled
              ? "backdrop-blur-md bg-white/5 border-b border-white/10"
              : "bg-transparent",
          ].join(" ")}
        >
          {/* Left: Brand */}
          <Magnetic strength={6} scale={1.02} className="inline-block">
            <button
              onClick={() => goTo("hero")}
              className="font-serif text-xl tracking-wide font-bold text-green-300"
            >
              Fashio
            </button>
          </Magnetic>

          {/* Center: Links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <Magnetic key={s.id} strength={6} className="inline-block">
                <button
                  onClick={() => goTo(s.id)}
                  className={[
                    "relative text-sm tracking-widest uppercase",
                    active === s.id ? "text-white" : "text-white/70",
                  ].join(" ")}
                >
                  {s.label}
                  {/* underline sweep on hover */}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-white/80 transition-[width] duration-300 hover:w-full" />
                </button>
              </Magnetic>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-3">
            <Magnetic strength={5} scale={1.06}>
              <button aria-label="Search" className="p-2">
                <IconSearch size={18} weight="regular" />
              </button>
            </Magnetic>
            <Magnetic strength={5} scale={1.06}>
              <button aria-label="Bag" className="p-2">
                <IconBag size={18} weight="regular" />
              </button>
            </Magnetic>
            {/* Mobile menu */}
            <Magnetic strength={6} scale={1.04} className="md:hidden">
              <button
                aria-label="Menu"
                onClick={() => setOpen(true)}
                className="p-2"
              >
                <IconMenu size={22} weight="regular" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      {open && (
        <div className="fixed inset-0 z-[950]">
          {/* dim bg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-neutral-950/95 backdrop-blur-md border-l border-white/10 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <IconClose size={22} />
              </button>
            </div>

            <ul className="mt-8 space-y-4">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <Magnetic strength={8} scale={1.02} className="inline-block">
                    <button
                      onClick={() => goTo(s.id)}
                      className={[
                        "text-xl font-serif",
                        active === s.id ? "text-white" : "text-white/80",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  </Magnetic>
                </motion.li>
              ))}
            </ul>

            {/* Footer icons */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <Magnetic strength={6}>
                <button className="inline-flex items-center gap-2 text-sm text-white/80">
                  <IconSearch size={18} /> Search
                </button>
              </Magnetic>
              <Magnetic strength={6}>
                <button className="inline-flex items-center gap-2 text-sm text-white/80">
                  <IconBag size={18} /> Bag
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
