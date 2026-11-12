"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Site } from "@/data/data";

type HeroProps = {
  image?: string;
  images?: string[];
  name?: string;
  hero?: Site["hero"];
};

// Full-screen hero carousel with smooth parallax
export default function Hero({ image: propImage, images: propImages, name: propName, hero }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const ease = [0.2, 0.7, 0.2, 1] as const;

  const resolvedImages = propImages || hero?.images;
  const resolvedImage = propImage || hero?.image || "/images/hero-slide-1.webp";
  const slides = resolvedImages && resolvedImages.length > 0 ? resolvedImages : [resolvedImage];

  const brandName = propName || hero?.title || "Aura";
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurr((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="top" ref={ref} className="relative h-[68svh] sm:h-[78svh] md:h-[100svh] overflow-hidden bg-black text-paper">
      <motion.div style={{ y }} className="absolute inset-0 bg-black">
        {slides.map((src, idx) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: idx === curr ? 1 : 0,
              scale: idx === curr ? 1 : 1.08,
            }}
            transition={{ duration: 1.6, ease }}
          >
            <Image
              src={src}
              alt={`${brandName} - Slide ${idx + 1}`}
              fill
              priority={idx === 0}
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h1 aria-label={brandName} className="absolute bottom-[3svh] sm:bottom-[4svh] left-4 sm:left-6 lg:left-8 flex overflow-hidden pb-3 sm:pb-5 font-display text-[clamp(44px,11vw,180px)] italic leading-[.95]">
            {brandName.toUpperCase().split("").map((l, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.08, ease }}
                className="inline-block"
              >
                {l}
              </motion.span>
            ))}
          </h1>

          {slides.length > 1 && (
            <div className="absolute bottom-[4svh] sm:bottom-[6svh] right-4 sm:right-6 lg:right-8 z-10 flex items-center gap-2 pointer-events-auto">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurr(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === curr ? "w-8 bg-brass" : "w-2.5 bg-paper/40 hover:bg-paper/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
