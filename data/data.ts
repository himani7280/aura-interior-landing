import siteData from "@/data/site.json";

export type NavItem = { name: string; href: string };

export type Site = {
  brand: {
    name: string;
    tag: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    hours: string;
    insta: string;
    social: { instagram: string; facebook: string; linkedin: string; youtube: string };
  };
  navigation: NavItem[];
  consultationButton: { text: string; href: string };
  hero: {
    image: string;
    images?: string[];
    badge?: string;
    title?: string;
    description?: string;
    primaryButton?: string;
    primaryLink?: string;
    secondaryButton?: string;
    secondaryLink?: string;
  };
  spaces: {
    badge?: string;
    label: string;
    line: string;
    text: string;
    buttonText?: string;
    buttonLink?: string;
    subtitle?: string;
    items: { id?: string; title: string; image: string }[];
  };
  intro: {
    badge?: string;
    label: string;
    line: string;
    paragraphs: string[];
    founder: string;
    role: string;
    caption: string;
    images: string[];
    quote: string;
    features: { title: string; text: string }[];
    stats: { value: number; suffix: string; label: string }[];
  };
  projects: {
    badge?: string;
    title?: string;
    items: { title: string; place: string; year: number; image: string }[];
  };
  services: {
    badge?: string;
    title?: string;
    description?: string;
    enquireText?: string;
    enquireLink?: string;
    items: { id?: string; title: string; text: string; tags: string[]; image: string }[];
  };
  gallery: {
    badge?: string;
    title?: string;
    items: { src: string; cat: string }[];
  };
  process: {
    badge?: string;
    title?: string;
    items: { n: string; title: string; image: string }[];
  };
  testimonials: {
    badge?: string;
    title?: string;
    items: { text: string; by: string; image: string }[];
  };
  contact: {
    badge?: string;
    title?: string;
    formTitle?: string;
    image: string;
    address?: string;
    city?: string;
    phone?: string;
    email?: string;
    hours?: string;
    submitText?: string;
  };
  footer: {
    copyright: string;
    quickLinks: NavItem[];
  };
};

// Fallback navigation items
export const NAV: readonly [string, string][] = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Services", "#services"],
  ["Gallery", "#gallery"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

// Resolves site configuration from site.json
export async function getSite(): Promise<Site> {
  const raw = siteData as Record<string, any>;
  const root = raw.Interior || raw.Investment || raw;

  if (root.sections && root.templateComponents) {
    const template = root.templateComponents["template-1"] || {};
    const sections = root.sections || {};
    const homeComponents: { key: string; component: string }[] =
      template.pages?.home?.components || [];

    const getVariant = (componentName: string) => {
      for (const secKey of Object.keys(sections)) {
        const variants = sections[secKey]?.variants;
        if (variants && variants[componentName]) {
          return variants[componentName];
        }
      }
      return null;
    };

    const getSectionByHomeKey = (key: string, fallbackComponent: string) => {
      const compName = homeComponents.find((c: { key: string }) => c.key === key)?.component || fallbackComponent;
      return getVariant(compName) || {};
    };

    const chromeVariant = template.shared?.Header || "InteriorSiteChrome1";
    const chrome = sections.SiteChromeContent?.variants?.[chromeVariant] || {};

    const hero = getSectionByHomeKey("Hero", "InteriorHomeHero1");
    const spaces = getSectionByHomeKey("Spaces", "InteriorSpaces1");
    const about = getSectionByHomeKey("About", "InteriorAbout1");
    const projects = getSectionByHomeKey("Projects", "InteriorProjects1");
    const services = getSectionByHomeKey("Services", "InteriorServices1");
    const gallery = getSectionByHomeKey("Gallery", "InteriorGallery1");
    const process = getSectionByHomeKey("Process", "InteriorProcess1");
    const testimonials = getSectionByHomeKey("Testimonials", "InteriorTestimonials1");
    const contact = getSectionByHomeKey("Contact", "InteriorContact1");

    const rawNav = chrome.header?.navigation?.items || [];
    const navItems: NavItem[] = rawNav.length > 0
      ? rawNav.map((item: any) => ({
          name: item.label || item.name || "",
          href: item.href || "#",
        }))
      : [
          { name: "About", href: "#about" },
          { name: "Work", href: "#work" },
          { name: "Services", href: "#services" },
          { name: "Gallery", href: "#gallery" },
          { name: "Process", href: "#process" },
          { name: "Contact", href: "#contact" },
        ];

    const rawCta = chrome.header?.navigation?.consultationButton;
    const consultationButton = {
      text: rawCta?.text || rawCta?.label || "Enquire",
      href: rawCta?.href || "#contact",
    };

    const formatTitle = (start?: string, highlight?: string, end?: string) => {
      return [start, highlight, end].filter(Boolean).join(" ");
    };

    return {
      brand: chrome.brand || {
        name: "Aura",
        tag: "Interior Studio",
        email: "info@xyz.com",
        phone: "+1 00000 00000",
        city: "New York, USA",
        address: "450 Lexington Ave, New York, NY 10017, USA",
        hours: "Mon - Sat: 9:00 AM - 6:00 PM",
        insta: "@aura.interiorstudio",
        social: {
          instagram: "https://instagram.com/",
          facebook: "https://facebook.com/",
          linkedin: "https://linkedin.com/",
          youtube: "https://youtube.com/",
        },
      },
      navigation: navItems,
      consultationButton,
      hero: {
        image: hero.image || "/images/hero-slide-1.webp",
        images: hero.images || [
          "/images/hero-slide-1.webp",
          "/images/hero-slide-2.webp",
          "/images/hero-slide-3.webp",
        ],
        badge: hero.badge || "LUXURY ARCHITECTURAL INTERIORS",
        title: formatTitle(hero.titleStart, hero.titleHighlight, hero.titleEnd) || "Aura Interior Studio",
        description: hero.description || "Every space has an aura.",
        primaryButton: hero.primaryButton || "Explore Work",
        primaryLink: hero.primaryLink || "#work",
        secondaryButton: hero.secondaryButton || "Start a Project",
        secondaryLink: hero.secondaryLink || "#contact",
      },
      spaces: {
        badge: spaces.badge || "SPACES WE DESIGN",
        label: spaces.label || "Spaces we design",
        line: spaces.line || "Rooms for every day.",
        text: spaces.text || spaces.description || "Living rooms that gather people.",
        buttonText: spaces.buttonText || "View gallery →",
        buttonLink: spaces.buttonLink || "#gallery",
        subtitle: spaces.subtitle || "Residential · Commercial · Hospitality",
        items: spaces.items || [],
      },
      intro: {
        badge: about.badge || "Studio",
        label: about.label || "About Aura",
        line: about.line || "Every space has an aura.",
        paragraphs: about.paragraphs || [],
        founder: about.founder || "Ira Mehra",
        role: about.role || "Founder & Principal Designer",
        caption: about.caption || "Est. 2017 · Studio of 12",
        images: about.images || [
          "/images/intro-architect.webp",
          "/images/intro-studio.webp",
        ],
        quote: about.quote || "Good design is quiet. You feel it before you notice it.",
        features: about.features || [],
        stats: about.stats || [],
      },
      projects: {
        badge: projects.badge || "SELECTED WORK",
        title: formatTitle(projects.titleStart, projects.titleHighlight) || "Selected Projects",
        items: projects.items || [],
      },
      services: {
        badge: services.badge || "What we do",
        title: formatTitle(services.titleStart, services.titleHighlight) || "Four ways we work.",
        description: services.description || "Turnkey or design-only.",
        enquireText: "Enquire →",
        enquireLink: "#contact",
        items: services.items || [],
      },
      gallery: {
        badge: gallery.badge || "Portfolio",
        title: formatTitle(gallery.titleStart, gallery.titleHighlight) || "Gallery",
        items: gallery.items || [],
      },
      process: {
        badge: process.badge || "HOW WE WORK",
        title: formatTitle(process.titleStart, process.titleHighlight) || "Process",
        items: process.items || [],
      },
      testimonials: {
        badge: testimonials.badge || "WORDS FROM CLIENTS",
        title: formatTitle(testimonials.titleStart, testimonials.titleHighlight) || "Testimonials",
        items: testimonials.items || [],
      },
      contact: {
        badge: contact.badge || "Start a project",
        title: formatTitle(contact.titleStart, contact.titleHighlight) || "Let's talk.",
        formTitle: contact.formTitle || "Tell us about your space",
        image: contact.image || "/images/contact-bg.webp",
        address: contact.address || chrome.brand?.address,
        city: contact.city || chrome.brand?.city,
        phone: contact.phone || chrome.brand?.phone,
        email: contact.email || chrome.brand?.email,
        hours: contact.hours || chrome.brand?.hours,
        submitText: "Send enquiry →",
      },
      footer: {
        copyright: chrome.footer?.copyright || `© ${new Date().getFullYear()} Aura Interior Studio. All rights reserved · Powered by Lestow`,
        quickLinks: chrome.footer?.quickLinks || navItems,
      },
    };
  }

  return root as Site;
}
