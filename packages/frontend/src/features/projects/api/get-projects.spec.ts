import { api } from "@/lib/api-client";
import type { Project } from "@portfolio/types";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getProjects } from "./get-projects";

vi.mock("@/lib/api-client.ts", () => ({
  api: {
    get: vi.fn(),
  },
}));

const buildProject = (override: Partial<Project> = {}) => ({
  id: "project-1",
  title: "project-1",
  description: "test project",
  techStack: ["React", "TypeScript"],
  link: "https://xxx.xx",
  createdAt: "2026-07-31 00:00:00",
  ...override,
}) as Project;

describe("get-projects", () => {
  afterEach(() => vi.resetAllMocks());
  it("should return an array of projects when projects exist", async () => {
    const mockProjects = [ buildProject(), buildProject({ id: "project-2", title: "project-2" })];
    vi.mocked(api.get).mockResolvedValue({ data: mockProjects });

    const projects = await getProjects();

    console.log(projects);

    expect(projects).toEqual(mockProjects);
    expect(api.get).toHaveBeenCalledWith("/projects");
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it("should return a empty array when projects not exist", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    const projects = await getProjects();

    expect(projects).toHaveLength(0);
    expect(api.get).toHaveBeenCalledWith("/projects");
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
