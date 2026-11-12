import Image from "next/image";
import type { Site } from "@/data/data";

const themes = ["bg-ink text-paper", "bg-moss text-paper", "bg-[#16233b] text-paper", "bg-brass text-paper"];

type ServicesProps = {
  items?: Site["services"]["items"];
  services?: Site["services"];
};

// Stacking service cards
export default function Services({ items: propItems, services }: ServicesProps) {
  const items = propItems || services?.items || [];
  const badge = services?.badge || "What we do";
  const title = services?.title || "Four ways we work.";
  const enquireText = services?.enquireText || "Enquire →";
  const enquireLink = services?.enquireLink || "#contact";

  return (
    <section id="services" className="relative z-10 overflow-x-clip px-4 sm:px-6 lg:px-8 -mt-5 sm:-mt-5 md:-mt-1 lg:-mt-2 pt-0 pb-6 sm:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 sm:mb-6">
          <div>
            <p className="text-sm uppercase tracking-[.3em] text-brass">{badge}</p>
            <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{title}</h2>
          </div>
        </div>
        <div>
          {items.map((s, i) => (
            <div key={s.title} className="sticky mb-6 sm:mb-8 md:mb-[6svh] last:mb-0" style={{ top: `calc(5rem + ${i * 1.25}rem)` }}>
              <article className={`grid overflow-hidden shadow-2xl md:min-h-[480px] lg:min-h-[520px] md:grid-cols-2 ${themes[i % themes.length]}`}>
                <div className={`relative h-56 sm:h-72 md:h-auto md:min-h-full ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={s.image} alt={s.title} fill sizes="(max-width:768px) 100vw, 50vw" quality={90} className="object-cover" />
                </div>
                <div className="flex flex-col justify-between gap-5 p-5 sm:p-7 md:p-8 lg:p-10 xl:p-12">
                  <div className="flex items-center justify-between text-sm tracking-[.3em]">
                    <span>0{i + 1} / 0{items.length}</span>
                    <span className="text-2xl">↗</span>
                  </div>
                  <div className="my-auto py-2">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-[clamp(32px,3.8vw,72px)] italic leading-tight">{s.title}</h3>
                    <p className="mt-2.5 sm:mt-4 max-w-sm text-sm sm:text-base opacity-80">{s.text}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-3">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="inline-flex items-center rounded-full border border-current/40 px-3 py-1 text-sm uppercase tracking-[.15em] leading-none whitespace-nowrap">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a href={enquireLink} className="ml-auto text-sm underline underline-offset-4 opacity-85 transition hover:opacity-100 whitespace-nowrap sm:ml-0">
                      {enquireText}
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
