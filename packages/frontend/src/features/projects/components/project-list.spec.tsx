import type { Project } from "@portfolio/types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { getProjects } from "../api/get-projects";
import { ProjectList } from "./project-list";
import { page } from "vitest/browser";
import { Suspense } from "react";
import { buildProject } from "../__mocks__/project.mock";

vi.mock("../api/get-projects", () => ({
  getProjects: vi.fn(),
}));

const renderProjectList = (promise: Promise<Project[]>) => (
  render(
    <Suspense fallback={ <div>...Loading</div> }>
      <ProjectList projectPromise={promise} />
    </Suspense>
  )
);

describe("ProjectList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render project cards when projects exist", async () => {
    const mockProjects = [
      buildProject(),
      buildProject({
        id: "project-2",
        title: "project-2",
        description: "test project 2",
        link: "https://xxx.xxx",
        techStack: ["React", "TypeScript", "AWS"],
      })
    ];
    vi.mocked(getProjects).mockResolvedValue(mockProjects);
    
    await renderProjectList(getProjects());

    await expect.element(page.getByText(mockProjects[0].title, { exact: true })).toBeVisible();
    await expect.element(page.getByText(mockProjects[0].description, { exact: true })).toBeVisible();
    await expect.element(page.getByText(mockProjects[0].link, { exact: true })).toBeVisible();
    await expect.element(page.getByText(mockProjects[0].techStack.join(", "), { exact: true })).toBeVisible();

    await expect.element(page.getByText(mockProjects[1].title, { exact: true })).toBeVisible();
    await expect.element(page.getByText(mockProjects[1].description, { exact: true })).toBeVisible();
    await expect.element(page.getByText(mockProjects[1].link, { exact: true })).toBeVisible();
    await expect.element(page.getByText(mockProjects[1].techStack.join(", "), { exact: true })).toBeVisible();

  });

  it("should not render any project cards when no projects exist", async () => {
    vi.mocked(getProjects).mockResolvedValue([]);
    await renderProjectList(getProjects());
    await expect.element(page.getByRole("heading")).not.toBeInTheDocument();
  })

});
