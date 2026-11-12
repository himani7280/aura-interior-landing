"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Site } from "@/data/data";

type ProjectsProps = {
  items?: Site["projects"]["items"];
  projects?: Site["projects"];
};

// Horizontal scroll gallery
export default function Projects({ items: propItems, projects }: ProjectsProps) {
  const items = propItems || projects?.items || [];
  const badge = projects?.badge || "SELECTED WORK";
  const title = projects?.title || "Featured Projects";

  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDistance, setMaxDistance] = useState(0);

  useEffect(() => {
    const update = () => {
      if (trackRef.current && containerRef.current) {
        const diff = trackRef.current.scrollWidth - containerRef.current.clientWidth;
        setMaxDistance(Math.max(0, diff));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxDistance]);

  return (
    <>
      {/* Mobile view: natural section spacing matching all other sections */}
      <section id="work" className="md:hidden overflow-hidden bg-paper px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4">
            <p className="text-sm uppercase tracking-[.3em] text-brass">{badge}</p>
            <h2 className="mt-1.5 font-display text-[clamp(34px,4.5vw,56px)] italic leading-[1.05]">{title}</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-2">
            {items.map((p, i) => (
              <article
                key={p.title}
                style={{
                  ...(i % 2 === 1
                    ? {
                        borderTopLeftRadius: "50% 50%",
                        borderTopRightRadius: "50% 50%",
                      }
                    : {}),
                }}
                className="group relative h-[48svh] w-[82vw] shrink-0 overflow-hidden snap-center"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="85vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-paper">
                  <p className="text-sm font-medium tracking-[.25em]">
                    0{i + 1} · {p.place.toUpperCase()}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(28px,4.5vw,84px)] italic leading-none">
                    {p.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop view: sticky horizontal scroll gallery */}
      <section ref={ref} style={{ height: `${items.length * 60 + 100}vh` }} className="relative bg-paper hidden md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div ref={containerRef} className="mx-auto w-full max-w-[1440px] px-6 lg:px-8 overflow-hidden">
            <div className="mb-3 sm:mb-5">
              <p className="text-sm uppercase tracking-[.3em] text-brass">{badge}</p>
              <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{title}</h2>
            </div>
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 lg:gap-8 w-max"
            >
              {items.map((p, i) => (
                <article
                  key={p.title}
                  style={{
                    ...(i % 2 === 1
                      ? {
                          borderTopLeftRadius: "50% 50%",
                          borderTopRightRadius: "50% 50%",
                        }
                      : {}),
                  }}
                  className="group relative h-[52svh] md:h-[54svh] lg:h-[58svh] md:w-[600px] lg:w-[720px] shrink-0 overflow-hidden"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 80vw, 720px"
                    quality={90}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 text-paper">
                    <p className="text-sm font-medium tracking-[.25em] sm:tracking-[.35em]">
                      0{i + 1} · {p.place.toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-display text-[clamp(28px,4.5vw,84px)] italic leading-none">
                      {p.title}
                    </h3>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
