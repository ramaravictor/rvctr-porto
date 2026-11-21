export type Service = { title: string; tags: string[] };

// Tags come from the stacks used in src/data/projects.ts.
export const SERVICES: Service[] = [
  {
    title: "Fullstack Web Apps",
    tags: ["Next.js & React", "TypeScript", "Laravel & Filament", "Spring Boot"],
  },
  {
    title: "Mobile Engineering",
    tags: ["React Native", "iOS & Android apps", "Face Recognition", "Geolocation"],
  },
  {
    title: "UI & Motion",
    tags: ["GSAP & ScrollTrigger", "Lenis smooth scroll", "Tailwind CSS", "Responsive layouts"],
  },
  {
    title: "Backend & Cloud",
    tags: ["PostgreSQL & MySQL", "REST APIs", "Google Cloud & Docker", "SSO (Okta)"],
  },
  {
    title: "AI Integration",
    tags: ["OpenAI & FastAPI", "Brief & document processing", "Voice assistant", "Computer vision"],
  },
];
