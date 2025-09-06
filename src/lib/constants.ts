export const SITE_CONFIG = {
  name: "Adri Khamid",
  title: "Fullstack Developer",
  description: "Code with purpose. Design with empathy. Deliver with impact.",
  location: "Yogyakarta, Indonesia",
  email: "adri@example.com",
  phone: "+62 123 456 7890",
} as const;

export const NAVIGATION_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "work", label: "Work", href: "#work" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { platform: "GitHub", url: "https://github.com/adrikhamid" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/adrikhamid" },
  { platform: "Twitter", url: "https://twitter.com/adrikhamid" },
] as const;
