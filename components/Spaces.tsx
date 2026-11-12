import Pic from "./Pic";
import type { Site } from "@/data/data";

// Staggered space showcase
export default function Spaces({ spaces }: { spaces: Site["spaces"] }) {
  const btnText = spaces.buttonText || "View gallery →";
  const btnLink = spaces.buttonLink || "#gallery";
  const subtitle = spaces.subtitle || "Residential · Commercial · Hospitality";

  return (
    <section className="overflow-hidden px-4 sm:px-6 lg:px-8 pt-[12px] pb-6 sm:pb-8">
      <div className="mx-auto max-w-[1440px] grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-sm uppercase tracking-[.3em] text-brass">{spaces.label}</p>
          <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{spaces.line}</h2>
          <p className="mt-5 max-w-sm opacity-70">{spaces.text}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a href={btnLink} className="btn">{btnText}</a>
            <span className="text-sm uppercase tracking-[.2em] opacity-75">{subtitle}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {spaces.items.map((s, i) => (
            <a key={s.title} href={btnLink} className={`block ${i % 2 ? "mt-6 md:mt-10" : ""}`}>
              <Pic src={s.image} alt={`${s.title} interior`} sizes="(max-width:1024px) 50vw, 30vw" delay={i * 0.1} className="aspect-[4/5]" />
              <div className="mt-3 flex items-baseline justify-between gap-2 border-b border-ink/15 pb-2">
                <h3 className="font-display text-lg sm:text-2xl lg:text-3xl italic">{s.title}</h3>
                <span className="shrink-0 text-sm tracking-[.2em] text-brass font-medium">0{i + 1}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
