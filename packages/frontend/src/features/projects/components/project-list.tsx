import type { Project } from "@portfolio/types";
import { use } from "react";

export type ProjectListProps = {
  projectPromise: Promise<Project[]>;
};

export function ProjectList({ projectPromise }: ProjectListProps) {
  const projects = use(projectPromise);

  return (
    <div className="m-4 flex gap-4">
      {projects.map(project => (
        <div key={project.id}
          className="w-lg bg-zinc-100 p-2 border border-zinc-300 rounded-xl flex flex-col gap-2"
        >
          <h2>{project.title}</h2>
          <div className="mx-4">
            <p>{project.description}</p>
          </div>
          <div className="mx-4 flex flex-col items-start">
            <span className="font-semibold">技術スタック</span>
            <span className="mx-4">{project.techStack.join(", ")}</span>
          </div>
          <div className="mx-4 flex flex-col items-start">
            <span className="font-semibold">Link</span>
            <span className="mx-4">{project.link}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
