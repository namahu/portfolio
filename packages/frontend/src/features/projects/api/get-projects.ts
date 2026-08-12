import { api } from "@/lib/api-client";
import type { Project } from "@portfolio/types";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await api.get<Project[]>("/projects");
    return data;
  } catch (err) {
    return [
      {
        id: "project-1",
        title: "ポートフォリオ",
        type: "personal",
        description:
          "React, AWS CDK, DynamoDB を使用したフルサーバレスなポートフォリオサイト。",
        techStack: ["React", "TypeScript", "AWS CDK", "DynamoDB", "Lambda"],
        link: "https://github.com/namahu/portfolio",
        repository: null,
        createdAt: new Date().toISOString(),
      },
    ];
  }
};
