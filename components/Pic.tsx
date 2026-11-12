"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = { src: string; alt?: string; className?: string; sizes?: string; delay?: number; pos?: string };

// Scroll reveal image
export default function Pic({ src, alt = "", className = "", sizes = "50vw", delay = 0, pos = "center" }: Props) {
  const ease = [0.2, 0.7, 0.2, 1] as const;
  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay }}
    >
      <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease, delay }}>
        <Image src={src} alt={alt} fill sizes={sizes} quality={85} style={{ objectPosition: pos }} className="object-cover transition-transform duration-1000 group-hover:scale-105" />
      </motion.div>
    </motion.div>
  );
}
