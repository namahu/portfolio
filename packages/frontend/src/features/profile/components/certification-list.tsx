import { use } from "react";
import type { ProfileResponseDTO } from "@portfolio/types";

export type CertificationListProps = {
  profilePromise: Promise<ProfileResponseDTO>;
};

export function CertificationList({ profilePromise }: CertificationListProps) {
  const profile = use(profilePromise);
  return (
    <div className="m-2 p-2 flex flex-col gap-1">
      {/* Contents Title */}
      <h1 className="border-b-2 border-zinc-200">Certifications</h1>

      {/* Contents Body */}
      <div className="p-4 bg-zinc-200 rounded-lg">
        <ul className="flex flex-col gap-2">
          { profile.certifications.map(certification => (
            <li key={ certification.id } >{ certification.dateObtained } / { certification.name }</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
