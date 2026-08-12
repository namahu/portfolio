import { ProjectCard } from "@/components/project-card";
import type { Project } from "@portfolio/types";
import { use } from "react";

export type ProjectListProps = {
  projectPromise: Promise<Project[]>;
};

export function ProjectList({ projectPromise }: ProjectListProps) {
  const projects = use(projectPromise);
  const personalProject = projects.filter(
    (project) => project.type === "personal",
  );
  const businessProject = projects.filter(
    (project) => project.type === "business",
  );
  const oss = projects.filter((project) => project.type === "oss");

  return (
    <div className="w-98% m-4 flex flex-col gap-2">
      {/* Contents Title */}
      <h1 className="border-b-2 border-zinc-200">Projects</h1>

      {/* Contents Body */}
      <div className="mx-2 flex flex-col gap-4">
        {/* Parsoal */}
        <div>
          <h2>Personal Projects</h2>
          <div className="mx-2 flex flex-row flex-wrap gap-4">
            {personalProject.map((project) => (
              <ProjectCard key={project.id} type={"personal"} project={project} />
            ))}
          </div>
        </div>

        {/* Business */}
        <div>
          <h2>Business Projects</h2>
          <div className="mx-2 flex flex-row flex-wrap gap-4">
            {businessProject.map((project) => (
              <ProjectCard key={project.id} type={"business"} project={project} />
            ))}
          </div>
        </div>

        {/* OSS */}
        <div>
          <h2>OSS Contribute</h2>
          <div className="mx-2 flex flex-row flex-wrap gap-4">
            {oss.map((project) => (
              <ProjectCard key={project.id} type={"oss"} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
