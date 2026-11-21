export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Who are you, and what do you build?",
    a: "I'm Rama, a software engineer in Jakarta. By day I'm a full stack developer at WPP Media, working with Spring Boot and React. Outside that I build web, mobile and AI products, mostly with Laravel, Next.js and React.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. A one-page store site like Rama Tani is a lot quicker than a multi-store POS like SaaS POS. Tell me what you have in mind and I'll give you an honest estimate before we start.",
  },
  {
    q: "Can you work on an existing system?",
    a: "Yes. Pandawa.AI, for example, is a set of Spring Boot services, a React front end and a Python AI service behind company sign-on. Picking up a system that already exists is normal work for me.",
  },
  {
    q: "Do you build mobile apps too?",
    a: "Yes. Tembi Attendance App runs on iOS and Android, with face recognition and a location check for clocking in, plus an admin panel for shifts, leave and payroll.",
  },
  {
    q: "How do we get started?",
    a: "Send me an email or a message on LinkedIn. Tell me a bit about the project, and we'll take it from there.",
  },
];
