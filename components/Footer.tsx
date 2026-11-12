import Logo from "./Logo";
import { NAV, type Site } from "@/data/data";

const icons: Record<string, React.ReactNode> = {
  instagram: <><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>,
  youtube: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></>,
};

type FooterProps = {
  brand: Site["brand"];
  footer?: Site["footer"];
  navigation?: Site["navigation"];
};

// Global footer with brand links, social channels, and top scroller
export default function Footer({ brand, footer, navigation }: FooterProps) {
  const links = footer?.quickLinks && footer.quickLinks.length > 0
    ? footer.quickLinks.map((l: any) => [l.label || l.name || "", l.href] as const)
    : (navigation && navigation.length > 0 ? navigation.map((n: any) => [n.label || n.name || "", n.href] as const) : NAV);

  const copyrightText = footer?.copyright || `© ${new Date().getFullYear()} ${brand.name} ${brand.tag}. All rights reserved · Powered by Lestow`;

  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <div className="h-px bg-gradient-to-r from-transparent via-brass to-transparent" />
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-8 md:flex-row">
        <Logo light className="h-10 sm:h-11" />
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm uppercase tracking-[.2em]">
          {links.map(([l, href]) => (
            <a key={href} href={href} className="opacity-70 transition hover:text-brass hover:opacity-100">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          {Object.entries(brand.social).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 transition hover:border-brass hover:bg-brass hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {icons[name]}
              </svg>
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 text-sm text-center sm:flex-row sm:text-left">
          <span className="opacity-60">{copyrightText}</span>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full border border-paper/30 transition hover:border-brass hover:bg-brass hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m18 15-6-6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
