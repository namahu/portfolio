import { use } from "react";
import type { Profile } from "@portfolio/types";

export type ProfileProps = {
  profilePromise: Promise<Profile>
};

const calculateAge = (birthString: string): number => {
  const birthDateNumber = Number(birthString.replace(/-/g, ""));
  const now = new Date();
  const todayNumber = Number(
    `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`
  );
  return Math.floor((todayNumber - birthDateNumber) / 10000);
};

export function ProfileField({ profilePromise}: ProfileProps) {
  const profile = use(profilePromise);

  if (!profile.id) {
    return (<></>);
  }

  return (
    <div>
      <h2>{profile.kanjiName} ({profile.nickName})</h2>
      <span>{profile.lastName} {profile.firstName}</span>
      <span>{profile.birthDate} ({calculateAge(profile.birthDate)})</span>
      <span>{profile.skills.join(", ")}</span>
      <span>{profile.socials.github}</span>
      <p>{profile.bio}</p>
    </div>
  );
};
