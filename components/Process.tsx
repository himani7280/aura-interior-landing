"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Site } from "@/data/data";

const heights = [
  "h-[220px] sm:h-[280px] md:h-[44svh] lg:h-[48svh]",
  "h-[260px] sm:h-[330px] md:h-[52svh] lg:h-[56svh]",
  "h-[210px] sm:h-[270px] md:h-[42svh] lg:h-[46svh]",
  "h-[250px] sm:h-[320px] md:h-[50svh] lg:h-[54svh]",
];

type ProcessProps = {
  items?: Site["process"]["items"];
  process?: Site["process"];
};

// Architecture design process steps
export default function Process({ items: propItems, process }: ProcessProps) {
  const items = propItems || process?.items || [];
  const badge = process?.badge || "HOW WE WORK";
  const title = process?.title || "Our Process";

  return (
    <section id="process" className="overflow-hidden px-4 sm:px-6 lg:px-8 pt-[12px] pb-6 sm:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 sm:mb-8">
          <p className="text-sm uppercase tracking-[.3em] text-brass">{badge}</p>
          <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{title}</h2>
        </div>
        <div className="grid grid-cols-2 items-end gap-3 sm:gap-4 md:grid-cols-4">
          {items.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className={`group relative overflow-hidden rounded-t-full ${heights[i % 4]}`}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={90}
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-3.5 sm:bottom-5 md:bottom-6 text-center text-paper px-2 drop-shadow-sm">
                <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic leading-none">{s.n}</p>
                <p className="mt-1 sm:mt-1.5 text-sm uppercase tracking-[.2em] sm:tracking-[.25em] font-medium leading-tight">{s.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
