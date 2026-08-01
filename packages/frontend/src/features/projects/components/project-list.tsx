import type { Project } from "@portfolio/types";
import { use } from "react";

export type ProjectListProps = {
  projectPromise: Promise<Project[]>;
};

export function ProjectList({ projectPromise }: ProjectListProps) {
  const projects = use(projectPromise);

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <span>{project.techStack.join(", ")}</span>
          <span>{project.link}</span>
        </div>
      ))}
    </div>
  );
};
