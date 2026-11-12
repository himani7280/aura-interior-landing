"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import Pic from "./Pic";
import type { Site } from "@/data/data";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);

  return <span ref={ref}>{v}{suffix}</span>;
}

// About studio section
export default function Intro({ intro }: { intro: Site["intro"] }) {
  const studioBadge = intro.badge || "Studio";

  return (
    <section id="about" className="overflow-hidden bg-[#ece8e0] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 pb-3 sm:pb-4">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-end gap-5 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm uppercase tracking-[.3em] text-brass">{intro.label}</p>
            <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{intro.line}</h2>
          </div>
          <div className="space-y-3 opacity-75 lg:max-w-lg">
            {intro.paragraphs.map((t) => <p key={t}>{t}</p>)}
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:gap-4 lg:grid-cols-12 lg:items-stretch">
          <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] lg:col-span-8 overflow-hidden">
            <Pic src={intro.images[1]} alt="Aura Studio Interior" sizes="(max-width:1024px) 100vw, 66vw" className="h-full w-full" />
            <div className="absolute bottom-0 left-0 bg-moss px-4 py-3 sm:px-6 sm:py-4 text-paper">
              <p className="text-sm uppercase tracking-[.25em] text-brass">{studioBadge}</p>
              <p className="mt-1 font-display text-xl sm:text-2xl italic">{intro.caption}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            <div className="grid flex-1 grid-cols-3 content-center gap-2 bg-ink p-4 sm:p-6 text-center text-paper">
              {intro.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl sm:text-4xl lg:text-3xl xl:text-5xl text-brass">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[.2em] opacity-75">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 sm:gap-5 bg-brass p-5 sm:p-6 text-paper">
              <p className="font-display text-[clamp(20px,1.9vw,34px)] italic leading-tight">“{intro.quote}”</p>
              <div className="mt-2">
                <p className="font-display text-lg sm:text-xl italic">{intro.founder}</p>
                <p className="text-sm uppercase tracking-[.2em] opacity-90 leading-normal">{intro.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-px bg-ink/15 lg:grid-cols-4">
          {intro.features.map((f, i) => (
            <div key={f.title} className="bg-[#ece8e0] p-4 sm:p-5 transition duration-500 hover:bg-ink hover:text-paper">
              <span className="font-display text-lg sm:text-xl text-brass">0{i + 1}</span>
              <h3 className="mt-1 text-xl sm:text-2xl">{f.title}</h3>
              <p className="mt-1 text-sm opacity-75">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
