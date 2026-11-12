import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#0b1731", moss: "#0f5560", paper: "#f6f3ee", brass: "#d0652a" },
      fontFamily: { display: ["var(--font-display)", "serif"], body: ["var(--font-body)", "sans-serif"] },
      keyframes: { marquee: { to: { transform: "translateX(-50%)" } } },
      animation: { marquee: "marquee 55s linear infinite" },
    },
  },
  plugins: [
    // Global styles yahan hain (CSS file me kuch nahi likhna padta)
    plugin(({ addBase, addComponents, addUtilities }) => {
      addBase({
        "h1, h2, h3": { "@apply font-display font-normal leading-[1.05]": {} },
        ":focus-visible": { "@apply outline outline-2 outline-offset-4 outline-brass": {} },
        "@media (prefers-reduced-motion: reduce)": { "*": { animation: "none !important", transition: "none !important" } },
      });
      addComponents({
        ".btn": { "@apply inline-flex cursor-pointer items-center gap-2 rounded-full bg-brass px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition hover:bg-paper": {} },
        ".field-dark": { "@apply w-full border-b border-ink/25 bg-transparent py-3.5 text-ink outline-none transition placeholder:text-ink/50 focus:border-brass": {} },
      });
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": { display: "none" },
        ".no-scrollbar": { "-ms-overflow-style": "none", "scrollbar-width": "none" },
      });
    }),
  ],
} satisfies Config;
