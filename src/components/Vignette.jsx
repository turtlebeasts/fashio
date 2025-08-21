// src/components/Vignette.jsx
export default function Vignette({ strength = 0.22 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[997]"
      style={{
        background: `radial-gradient(120% 85% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`,
      }}
    />
  );
}
