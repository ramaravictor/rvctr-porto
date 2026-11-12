import type { Project } from "@/types";

export const STATUS_LABEL: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "coming-soon": "Coming soon",
};

export const formatTeam = (size?: number) =>
  size ? (size === 1 ? "Solo" : `${size} people`) : undefined;

export const formatIndex = (i: number) => String(i + 1).padStart(2, "0");

/** A project link counts only when it points somewhere real. */
export const hasExternalLink = (project: Project) =>
  Boolean(project.link && project.link !== "#");
