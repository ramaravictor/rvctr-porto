export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  /** Extra screenshots shown on the project detail page. */
  gallery?: { src: string; caption?: string }[];
  tags: string[];
  status: "completed" | "in-progress" | "coming-soon";
  teamSize?: number;
  link?: string;
  year?: string;
  client?: string;
}
