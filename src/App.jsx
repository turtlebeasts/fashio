import { useState } from "react";
import PageVeil from "./components/PageVeil";
import SplitSequence from "./components/SplitSequence";
import BagsGrid from "./sections/BagsGrid";
import Story from "./sections/Story";
import LookbookCarousel from "./sections/LookbookCarousel"; // fixed case
import HorizontalParallaxCarousel from "./sections/HorizontalParallaxCarousel";
import CustomCursor from "./components/CustomCursor";
import Magnetic from "./components/Magnetic";
import ScrollProgressBar from "./components/ScrollProgressBar";
import FilmGrain from "./components/FilmGrain";
import Vignette from "./components/Vignette";
import { ArrowRight } from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";

export default function App() {
  const [veil, setVeil] = useState(false);

  function handleCTA() {
    setVeil(true);
    setTimeout(() => {
      setVeil(false);
      alert("Next scene would load here ✨");
    }, 1000);
  }

  return (
    <div className="relative bg-black text-white">
      {/* Custom cursor (renders via fixed portal) */}
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      {/* Hero */}
      <section id="hero" className="h-screen flex items-center justify-center">
        <Hero />
      </section>

      {/* Split-screen cinematic sequence */}
      <section id="collections">
        <SplitSequence />
      </section>

      {/* CTA */}
      <section className="h-screen flex items-center justify-center bg-neutral-900">
        <Magnetic className="inline-block">
          <button
            onClick={handleCTA} // now triggers veil
            className="px-8 py-4 rounded-full border border-white/30 backdrop-blur text-lg flex justify-between items-center"
          >
            Experience the Collection
            <ArrowRight className="w-5 h-5" />
          </button>
        </Magnetic>
      </section>

      <section id="bags">
        <BagsGrid />
      </section>

      <section id="story">
        <Story />
      </section>

      <section id="frames">
        <HorizontalParallaxCarousel />
      </section>

      <section id="lookbook">
        <LookbookCarousel />
      </section>

      {/* Cinematic Veil Overlay */}
      <Footer />
      <Vignette strength={0.18} />
      <FilmGrain opacity={0.06} />
      <PageVeil show={veil} />
    </div>
  );
}
