"use client";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Site } from "@/data/data";

// 6x4 flush grid template
const areas = ["1/1/3/3", "1/3/2/5", "1/5/3/7", "2/3/3/4", "2/4/3/5", "3/1/5/2", "3/2/4/4", "3/4/5/5", "3/5/4/7", "4/2/5/3", "4/3/5/4", "4/5/5/7"];

type GalleryProps = {
  items?: Site["gallery"]["items"];
  gallery?: Site["gallery"];
};

// Portfolio photo gallery
export default function Gallery({ items: propItems, gallery }: GalleryProps) {
  const items = propItems || gallery?.items || [];
  const badge = gallery?.badge || "Portfolio";
  const title = gallery?.title || "Gallery";

  const [open, setOpen] = useState<number | null>(null);
  const shown = items.slice(0, areas.length);

  useEffect(() => {
    if (open === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const n = shown.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % n));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, shown.length]);

  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length));

  return (
    <section id="gallery" className="overflow-hidden px-4 sm:px-6 lg:px-8 pt-[12px] pb-6 sm:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6">
          <div>
            <p className="text-sm uppercase tracking-[.3em] text-brass">{badge}</p>
            <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{title}</h2>
          </div>
        </div>
        <div className="grid auto-rows-[38vw] grid-cols-2 gap-2 md:auto-rows-[min(14vw,21svh)] md:grid-cols-6 md:gap-3">
          {shown.map((g, i) => (
            <motion.button
              key={g.src}
              onClick={() => setOpen(i)}
              aria-label={`Open ${g.cat} photo`}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08 }}
              style={{ "--a": areas[i] } as CSSProperties}
              className="group relative overflow-hidden md:[grid-area:var(--a)]"
            >
              <Image src={g.src} alt={`${g.cat} interior`} fill sizes="(max-width:768px) 50vw, 33vw" quality={85} className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/70 py-2 text-center text-sm uppercase tracking-[.25em] text-paper transition duration-500 group-hover:translate-y-0">{g.cat}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-ink/95" onClick={() => setOpen(null)}>
            <div className="absolute inset-[6vh_6vw]"><Image src={shown[open].src} alt="" fill sizes="90vw" quality={90} className="object-contain" /></div>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-5 top-5 text-3xl text-paper">✕</button>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous" className="absolute left-4 top-1/2 text-4xl text-paper">‹</button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next" className="absolute right-4 top-1/2 text-4xl text-paper">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
