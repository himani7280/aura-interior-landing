"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import type { Site } from "@/data/data";

const smoothEase = [0.16, 1, 0.3, 1] as const;
const view = { once: true, amount: 0.1 } as const;

type ContactProps = {
  brand: Site["brand"];
  image: string;
  contact?: Site["contact"];
};

// Contact form and studio location
export default function Contact({ brand, image, contact }: ContactProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const badge = contact?.badge || "Start a project";
  const title = contact?.title || "Let's talk.";
  const formTitle = contact?.formTitle || "Tell us about your space";
  const submitText = contact?.submitText || "Send enquiry →";

  const address = contact?.address || brand.address;
  const phone = contact?.phone || brand.phone;
  const email = contact?.email || brand.email;

  const q = encodeURIComponent(address);
  const info = [
    ["Visit", address],
    ["Call", phone],
    ["Mail", email],
  ];

  return (
    <section id="contact" className="relative overflow-hidden text-paper">
      <Image src={image} alt="" fill sizes="100vw" quality={85} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/55" />
      <div className="relative mx-auto max-w-[1440px] grid items-center gap-8 px-4 sm:px-6 lg:px-8 pt-[12px] pb-6 sm:pb-8 md:min-h-[100svh] md:grid-cols-2 md:gap-8 lg:gap-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ duration: 1, ease: smoothEase }} className="w-full max-w-lg mx-auto md:mx-0">
          <p className="text-sm uppercase tracking-[.3em] text-brass">{badge}</p>
          <h2 className="mt-1.5 sm:mt-2.5 font-display text-[clamp(34px,4.5vw,56px)] lg:text-[72px] italic leading-[1.05]">{title}</h2>
          <dl className="mt-5 sm:mt-6 grid max-w-lg gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {info.map(([k, v]) => (
              <div key={k}>
                <dt className="text-sm font-medium uppercase tracking-[.25em] text-brass">{k}</dt>
                <dd className="mt-1 text-sm sm:text-base opacity-85 leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="relative mt-5 sm:mt-6 max-w-lg overflow-hidden ring-1 ring-paper/30">
            <iframe title={`${brand.name} location`} src={`https://www.google.com/maps?q=${q}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-32 sm:h-36 w-full border-0 grayscale" />
            <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer" className="absolute bottom-2.5 right-2.5 bg-ink px-3 py-1.5 text-sm uppercase tracking-[.2em] transition hover:bg-brass hover:text-ink">Open in Maps ↗</a>
          </div>
        </motion.div>
        <motion.form onSubmit={onSubmit} initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ duration: 1.2, ease: smoothEase }} className="grid gap-2 sm:gap-2.5 bg-paper p-4 sm:p-6 md:p-6 lg:p-8 text-ink shadow-2xl w-full max-w-lg lg:max-w-xl mx-auto md:mx-0 h-auto self-center">
          <h3 className="mb-1 sm:mb-2 font-display text-xl sm:text-2xl lg:text-3xl italic">{formTitle}</h3>
          <div className="grid gap-2 sm:gap-x-4 sm:grid-cols-2">
            <input name="name" placeholder="Name" required className="field-dark py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base placeholder:text-sm" />
            <input name="phone" placeholder="Phone" className="field-dark py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base placeholder:text-sm" />
          </div>
          <input name="email" type="email" placeholder="Email" required className="field-dark py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base placeholder:text-sm" />
          <select name="type" className="field-dark py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base" defaultValue="Home">
            <option>Home</option>
            <option>Office</option>
            <option>Café or hotel</option>
            <option>Furniture</option>
          </select>
          <textarea name="msg" rows={3} placeholder="Your space, in a few words" className="field-dark py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base placeholder:text-sm resize-none" />
          <button className="btn mt-3 sm:mt-4 lg:mt-5 w-full sm:w-fit justify-center py-3 sm:py-3.5 px-6 sm:px-8 text-sm hover:!bg-ink hover:!text-paper" disabled={status === "sending"}>
            {status === "sending" ? "Sending" : submitText}
          </button>
          <p role="status" className="text-sm text-moss">
            {status === "done" && "Thank you. We will call you soon."}
            {status === "error" && "Something went wrong. Try again."}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
