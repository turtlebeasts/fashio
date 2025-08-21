// src/components/SplitSequence.jsx
import SplitShowcase from "./SplitSchowcase";

const slides = [
  {
    leftImage:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1080",
    rightImage: "https://picsum.photos/id/1011/1080/1600",
    title: "Collection 01",
    subtitle: "Couture in Motion",
  },
  {
    leftImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1080",
    rightImage:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1080",
    title: "Collection 02",
    subtitle: "Textured Elegance",
  },
  {
    leftImage:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1080",
    rightImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1080",
    title: "Collection 03",
    subtitle: "Shadows & Silk",
  },
];

export default function SplitSequence() {
  return (
    <div>
      {slides.map((s, i) => (
        <SplitShowcase
          key={i}
          leftImage={s.leftImage}
          rightImage={s.rightImage}
          title={s.title}
          subtitle={s.subtitle}
        />
      ))}
    </div>
  );
}
