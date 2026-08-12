import type { Project } from "@portfolio/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export type ProjectCardProps = {
  type?: "personal" | "business" | "oss";
  project: Project;
};

export function ProjectCard({ type = "personal", project }: ProjectCardProps) {
  const hasProjectUrl = project.link || project.repository?.url ? true : false;

  return (
    <div
      className="w-116 h-max bg-zinc-200 px-2 py-4 border border-zinc-300 rounded-xl flex flex-col gap-2"
    >
      {/* Card Title */}
      <h2>{type === "oss" ? project.repository?.name : project.title}</h2>

      {/* Card Body */}
      <div className="mx-4 flex flex-col gap-2">
        <div>
          <p>{project.description}</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="font-semibold">Tech Stack</span>
          <div className="mx-2 flex flex-row flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <span key={tech}
                className="bg-zinc-50 border border-zinc-300 rounded-xl text-xs mx-1 px-4 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {type === "oss" ? (
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Addressed Issue</span>
            <ul className="w-full max-h-24 overflow-y-auto">
              {project.repository?.issues?.map((issue) => (
                <li key={issue.number} className="w-full">
                  <a
                    href={`${project.repository?.url}issues/${issue.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-94 max-w-94 bg-zinc-50 border border-zinc-300 rounded-md mx-2 px-2 py-1 truncate"
                  >
                    {issue.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        {hasProjectUrl ? (
          <div className="flex flex-col items-start">
            <span className="font-semibold">Link</span>
            <div className="mx-2 flex flex-row gap-2">
              {project.link
                ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe} />
                  </a>
                )
                : null
              }
              {project.repository?.url
                ? (
                  <a href={project.repository.url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                )
                : null
              }
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
