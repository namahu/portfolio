import { ProfileField } from "@/features/profile/components/profile";
import { RootLayout } from "./layout";
import { ProjectList } from "@/features/projects/components/project-list";
import { getProfile } from "@/features/profile/api/get-profile";
import { getProjects } from "@/features/projects/api/get-projects";
import { Suspense, useState, useEffect } from "react";
import { Welcome } from "@/components/welcome";
import type { ProfileResponseDTO, Project } from "@portfolio/types";
import { CircleLoader } from "@/components/circle-loader";
import { CertificationList } from "@/features/profile/components/certification-list";

export function App() {
  const [profilePromise, setProfilePromise] =
    useState<Promise<ProfileResponseDTO> | null>(null);
  const [projectPromise, setProjectPromise] = useState<Promise<
    Project[]
  > | null>(null);
  const [animationEnd, setanimationEnd] = useState(false);

  useEffect(() => {
    setProfilePromise(getProfile());
    setProjectPromise(getProjects());
  }, []);

  const showContents = profilePromise && projectPromise && animationEnd;

  return (
    <>
      {profilePromise && projectPromise && (
        <div className={showContents ? "block" : "hidden"}>
          <Suspense fallback={null}>
            <RootLayout>
              <ProfileField profilePromise={profilePromise} />
              <CertificationList profilePromise={profilePromise} />
              <ProjectList projectPromise={projectPromise} />
            </RootLayout>
          </Suspense>
        </div>
      )}
      {profilePromise && projectPromise && !animationEnd && (
        <div>
          <Welcome />
          <CircleLoader
            animationName="animate-ripple"
            onComplete={() => setanimationEnd(true)}
          />
        </div>
      )}
    </>
  );
}
