export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  status: "completed" | "in-progress" | "coming-soon";
  teamSize?: number;
  link?: string;
  year?: string;
  client?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}
