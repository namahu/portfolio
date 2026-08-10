import { api } from "@/lib/api-client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getProjects } from "./get-projects";
import { buildProject } from "../__mocks__/project.mock";

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("get-projects", () => {
  afterEach(() => vi.resetAllMocks());
  it("should return an array of projects when projects exist", async () => {
    const mockProjects = [
      buildProject(),
      buildProject({ id: "project-2", title: "project-2" }),
    ];
    vi.mocked(api.get).mockResolvedValue({ data: mockProjects });

    const projects = await getProjects();

    expect(projects).toEqual(mockProjects);
    expect(api.get).toHaveBeenCalledWith("/projects");
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array when no projects exist", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    const projects = await getProjects();

    expect(projects).toHaveLength(0);
    expect(api.get).toHaveBeenCalledWith("/projects");
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when API request fails", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Network Error"));
    await expect(getProjects()).rejects.toThrow("Network Error");
  });
});
