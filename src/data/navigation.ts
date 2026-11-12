import { SITE_CONFIG } from "@/lib/constants";
import { projectsData } from "@/data/projects";

// Right-hand links; `section` is the element id whose visibility marks the link active.
export const NAV_LINKS = [
  { label: "Work", href: "/#portfolio", section: "portfolio" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Contact", href: "/#footer", section: "footer" },
] as const;

export const CONTACT_EMAIL = SITE_CONFIG.email || "hello@example.com";

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
    links: projectsData
      .filter((p) => p.image?.startsWith("/images/work/"))
      .slice(0, 4)
      .map((p) => ({ label: p.title.split(" — ")[0], href: `/work/${p.id}` })),
  },
  {
    // TODO: replace "#" with the real profile URLs.
    title: "Follow",
    links: [
      { label: "LinkedIn", href: "#", external: true },
      { label: "GitHub", href: "#", external: true },
      { label: "Instagram", href: "#", external: true },
      { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];
