export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  /** Extra screenshots shown on the project detail page. */
  gallery?: { src: string; caption?: string }[];
  /** Key features, shown as a list on the detail page. */
  features?: string[];
  /** Full tech stack for the detail page; `tags` stays short for cards. */
  stack?: string[];
  tags: string[];
  status: "completed" | "in-progress" | "coming-soon";
  teamSize?: number;
  link?: string;
  year?: string;
  client?: string;
}
