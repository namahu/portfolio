import { api } from "@/lib/api-client";
import type { Project } from "@portfolio/types";

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<Project[]>("/projects");
  return data;
};
