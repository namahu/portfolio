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
      <h2 className="font-bold border-b-2 border-zinc-200">Projects</h2>

      {/* Contents Body */}
      <div className="mx-2 flex flex-col gap-4">
        {/* Personal */}
        <div>
          <h3 className="font-semibold">Personal Projects</h3>
          <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {personalProject.map((project) => (
              <ProjectCard key={project.id} type={"personal"} project={project} />
            ))}
          </div>
        </div>

        {/* Business */}
        <div>
          <h3 className="font-semibold">Business Projects</h3>
          <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessProject.map((project) => (
              <ProjectCard key={project.id} type={"business"} project={project} />
            ))}
          </div>
        </div>

        {/* OSS */}
        <div>
          <h3 className="font-semibold">OSS Contribute</h3>
          <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oss.map((project) => (
              <ProjectCard key={project.id} type={"oss"} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
