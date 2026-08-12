import type { Project } from "@portfolio/types";

export const buildProject = (override: Partial<Project> = {}) =>
  ({
    id: "project-1",
    title: "project-1",
    description: "test project",
    techStack: ["React", "TypeScript"],
    link: "https://xxx.xx",
    createdAt: "2026-07-31 00:00:00",
    ...override,
  }) as Project;
