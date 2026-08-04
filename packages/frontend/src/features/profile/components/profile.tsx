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
    <div
      className="m-2 p-2 bg-zinc-200 rounded-lg flex flex-col gap-2"
    >
      {/* Contents Title */}
      <h1>Profile</h1>

      {/* Contents Body */}
      <div className="mx-4 flex flex-row gap-4">
        
        {/* Image Field */}
        <div className="self-center">
          <img src={profile.avatar} alt="Self Image"
            className="size-60"
          />
        </div>

        {/* Base Information Field */}
        <div className="w-full max-w-1/3">
          <div className="flex flex-col">
            <h2>{profile.kanjiName} ({profile.nickName})</h2>
            <span className="text-sm">{profile.lastName} {profile.firstName}</span>
            <span>{profile.birthDate} (age: {calculateAge(profile.birthDate)})</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3>Tech stack</h3>
            <div className="flex flex-row flex-wrap gap-1">
            {profile.skills.map(skill => (
              <span className="bg-zinc-100 border border-zinc-300 rounded-xl text-xs mx-1 px-4 py-1">
                {skill}
              </span>
            ))}
            </div>
          </div>
          <div>
            <h3>Links</h3>
            {(Object.keys(profile.socials) as Array<keyof typeof profile.socials>).map((key) => (
              <div className="mx-2 flex flex-row gap-1">
                <span>{key}: </span>
                <a href={profile.socials[key]}>{profile.socials[key]}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Bio Field */}
        <div className="w-full max-w-1/3 flex flex-col gap-1">
          <h3>Biography</h3>
          <p className="mx-2">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};
