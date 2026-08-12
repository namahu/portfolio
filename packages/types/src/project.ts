export interface Project {
  id: string;
  type: "personal" | "business" | "oss";
  title: string | null;
  description: string;
  techStack: string[];
  link: string | null;
  repository: {
    name: string;
    url: string;
    issues: {
      number: number;
      title: string;
    }[] | null;
    ownerName: string;
  } | null;
  createdAt: string;
}
