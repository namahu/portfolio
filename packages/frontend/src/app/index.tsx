import { ProfileField } from "@/features/profile/components/profile";
import { RootLayout } from "./layout";
import { ProjectList } from "@/features/projects/components/project-list";
import { getProfile } from "@/features/profile/api/get-profile";
import { getProjects } from "@/features/projects/api/get-projects";
import { Suspense } from "react";

export function App() {
  const profilePromise = getProfile();
  const projectPromise = getProjects();
  return (
    <RootLayout>
      <Suspense fallback={<div>....Loading</div>}>
        <ProfileField profilePromise={profilePromise} />
        <ProjectList projectPromise={projectPromise} />
      </Suspense>
    </RootLayout>
  );
};
