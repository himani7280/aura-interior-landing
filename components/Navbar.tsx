"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { NAV, type Site } from "@/data/data";

type NavbarProps = {
  brand: Site["brand"];
  image: string;
  navigation?: Site["navigation"];
  consultationButton?: Site["consultationButton"];
};

// Global navigation bar and drawer menu
export default function Navbar({ brand, image, navigation, consultationButton }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navItems = navigation && navigation.length > 0
    ? navigation.map((n: any) => [n.label || n.name || "", n.href] as const)
    : NAV;

  const cta = {
    text: consultationButton?.text || (consultationButton as any)?.label || "Enquire",
    href: consultationButton?.href || "#contact",
  };
  const bar = "block h-px bg-current transition-all duration-300";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-paper/90 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 text-ink backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
          <a href="#top" aria-label={`${brand.name} ${brand.tag}`}><Logo className="h-10 sm:h-11" /></a>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <a href={cta.href} className="btn inline-flex !py-1.5 !px-3.5 sm:!py-2 sm:!px-5 text-sm">{cta.text}</a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 sm:h-10 sm:w-10 flex-col items-center justify-center gap-[5px] sm:gap-[6px] rounded-full border border-ink/20 transition hover:bg-ink hover:text-paper"
            >
              <span className={`${bar} w-4 sm:w-5`} />
              <span className={`${bar} w-4 sm:w-5`} />
              <span className={`${bar} w-2.5 sm:w-3 self-end mr-2 sm:mr-2.5`} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            />
            <motion.aside
              key="dr"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
              className="fixed right-0 top-0 z-[55] flex h-full w-[min(92vw,460px)] flex-col justify-between overflow-y-auto no-scrollbar bg-ink p-5 sm:p-7 text-paper"
            >
              <div className="flex items-center justify-between">
                <Logo light className="h-9" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper/25 text-xl transition hover:bg-paper hover:text-ink"
                >
                  ✕
                </button>
              </div>
              <nav className="my-6 flex flex-col">
                {navItems.map(([label, href], i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.07, duration: 0.6 }}
                    className="group flex items-baseline gap-4 border-b border-paper/10 py-3 font-display text-4xl italic transition hover:pl-3 hover:text-brass"
                  >
                    <span className="font-body text-sm not-italic tracking-[.25em] text-brass">0{i + 1}</span>
                    {label}
                  </motion.a>
                ))}
              </nav>
              <div>
                <div className="relative mb-5 h-32 overflow-hidden">
                  <Image src={image} alt="" fill sizes="460px" className="object-cover" />
                  <div className="absolute inset-0 bg-ink/30" />
                </div>
                <p className="text-sm opacity-75">{brand.email}<br />{brand.phone}<br />{brand.address}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
