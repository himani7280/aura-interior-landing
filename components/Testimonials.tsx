"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Site } from "@/data/data";

type TestimonialsProps = {
  items?: Site["testimonials"]["items"];
  testimonials?: Site["testimonials"];
};

// Client testimonials slider
export default function Testimonials({ items: propItems, testimonials }: TestimonialsProps) {
  const items = propItems || testimonials?.items || [];
  const badge = testimonials?.badge || "WORDS FROM CLIENTS";
  const title = testimonials?.title || "What Clients Say";

  const [i, setI] = useState(0);
  const n = items.length;

  useEffect(() => {
    if (n === 0) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [n, i]);

  if (n === 0) return null;

  const go = (d: number) => setI((x) => (x + d + n) % n);
  const t = items[i];
  const btn = "grid h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 place-items-center rounded-full border border-paper/30 transition hover:bg-paper hover:text-ink text-sm sm:text-base";

  return (
    <section className="overflow-hidden bg-moss text-paper">
      <div className="mx-auto max-w-[1440px] grid lg:grid-cols-2">
        <div className="relative h-[32svh] sm:h-[40svh] md:h-[42svh] md:min-h-[360px] overflow-hidden lg:h-auto lg:min-h-[85svh]">
          <AnimatePresence>
            <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>
              <Image src={t.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" quality={90} className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-3 lg:gap-6 px-4 py-5 sm:px-6 md:px-10 lg:px-12 md:h-[42svh] md:min-h-[360px] lg:h-auto lg:min-h-[85svh] max-[425px]:px-4 max-[425px]:py-4 max-[425px]:gap-2.5">
          <span aria-hidden className="-mb-1 sm:-mb-2 md:-mb-1 lg:-mb-4 font-display text-5xl sm:text-6xl md:text-5xl lg:text-8xl leading-none text-brass select-none">“</span>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="min-h-[105px] max-[425px]:min-h-[95px] sm:min-h-[130px] md:min-h-[140px] lg:min-h-[220px]">
              <h2 className="font-display text-[clamp(19px,4.5vw,26px)] sm:text-[clamp(22px,3.2vw,36px)] lg:text-[clamp(32px,4.2vw,68px)] italic leading-[1.14] sm:leading-[1.1]">{t.text}</h2>
              <p className="mt-2 sm:mt-3 lg:mt-6 text-sm uppercase tracking-[.25em] text-brass">{t.by}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-3 sm:gap-5 mt-1 sm:mt-2 lg:mt-0">
            <button onClick={() => go(-1)} aria-label="Previous" className={btn}>←</button>
            <button onClick={() => go(1)} aria-label="Next" className={btn}>→</button>
            <span className="text-sm tracking-[.2em]">0{i + 1} / 0{n}</span>
            <div className="h-px flex-1 bg-paper/20"><motion.div key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 7, ease: "linear" }} className="h-full origin-left bg-brass" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
