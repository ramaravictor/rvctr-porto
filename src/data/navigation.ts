import { SITE_CONFIG } from "@/lib/constants";
import { SHOWCASE_PROJECTS } from "@/data/projects";

// Right-hand links; `section` is the element id whose visibility marks the link active.
export const NAV_LINKS = [
  { label: "Work", href: "/#portfolio", section: "portfolio" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Contact", href: "/#footer", section: "footer" },
] as const;

export const CONTACT_EMAIL = SITE_CONFIG.email;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ramarvctr_/",
  linkedin: "https://www.linkedin.com/in/ramasoniravictor/",
  github: "https://github.com/ramaravictor",
} as const;

export const FOOTER_COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Rama",
    links: [
      { label: "Work", href: "/#portfolio" },
      { label: "Services", href: "/#services" },
      { label: "Tech Stack", href: "/#clientblur" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Projects",
    links: SHOWCASE_PROJECTS.slice(0, 4).map((p) => ({ label: p.title, href: `/work/${p.id}` })),
  },
  {
    title: "Follow",
    links: [
      { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, external: true },
      { label: "GitHub", href: SOCIAL_LINKS.github, external: true },
      { label: "Instagram", href: SOCIAL_LINKS.instagram, external: true },
      { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];
