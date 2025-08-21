// src/components/FilmGrain.jsx
/**
 * Very subtle animated film grain using CSS.
 * Cheap on GPU, sits above content via pointer-events:none.
 */
export default function FilmGrain({ opacity = 0.06 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[998]"
      style={{
        mixBlendMode: "overlay",
        opacity,
        backgroundImage:
          // layered noise via gradients for cheap “grain”
          `radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.08) 50%, transparent 51%),
           radial-gradient(1px 1px at 20% 35%, rgba(255,255,255,0.06) 50%, transparent 51%),
           radial-gradient(1px 1px at 30% 55%, rgba(255,255,255,0.05) 50%, transparent 51%),
           radial-gradient(1px 1px at 40% 75%, rgba(255,255,255,0.07) 50%, transparent 51%),
           radial-gradient(1px 1px at 50% 25%, rgba(255,255,255,0.05) 50%, transparent 51%),
           radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.06) 50%, transparent 51%),
           radial-gradient(1px 1px at 70% 65%, rgba(255,255,255,0.07) 50%, transparent 51%),
           radial-gradient(1px 1px at 80% 85%, rgba(255,255,255,0.05) 50%, transparent 51%)`,
        backgroundSize:
          "11px 13px, 13px 11px, 17px 15px, 19px 13px, 23px 21px, 29px 19px, 31px 27px, 37px 33px",
        animation: "grain-shift 1.6s steps(2) infinite",
      }}
    />
  );
}
