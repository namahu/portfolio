import { use } from "react";
import type { ProfileResponseDTO } from "@portfolio/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons"; 

export type ProfileProps = {
  profilePromise: Promise<ProfileResponseDTO>;
};

const calculateAge = (birthString: string): number => {
  const birthDateNumber = Number(birthString.replace(/-/g, ""));
  const now = new Date();
  const todayNumber = Number(
    `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`,
  );
  return Math.floor((todayNumber - birthDateNumber) / 10000);
};

export function ProfileField({ profilePromise }: ProfileProps) {
  const profile = use(profilePromise);

  if (!profile.id) {
    return <></>;
  }

  return (
    <div className="m-2 p-2 flex flex-col gap-1">
      {/* Contents Title */}
      <h2 className="font-bold border-b-2 border-zinc-200">Profile</h2>

      {/* Contents Body */}
      <div className="p-4 bg-zinc-200 rounded-lg flex flex-col lg:flex-row gap-2 lg:gap-8">
        {/* Image Field */}
        <div className="self-center">
          <img src={profile.avatarUrl} alt="Self Image" className="size-40 lg:size-56" />
        </div>

        {/* Base Information Field */}
        <div className="lg:max-w-1/3 flex flex-col gap-2">

          {/* Name and birth date */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-semibold">{profile.nickName}</h3>
            <span>
              {profile.birthDate} (age: {calculateAge(profile.birthDate)})
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <h3 className="lg:w-full border-b border-zinc-400 lg:border-none px-2 lg:px-0">Skills</h3>
            <div className="mx-1 flex flex-row flex-wrap justify-center lg:justify-start gap-1">
              {profile.skills.map((skill) => (
                <span className="bg-zinc-50 border border-zinc-300 rounded-xl text-xs mx-1 px-4 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <h3 className="lg:w-full border-b border-zinc-400 lg:border-none px-2 lg:px-0">Links</h3>
            <div className="mx-2 flex flex-row gap-4">
              <div className="w-8">
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} size="2xl" />
                </a>
              </div>
              <div className="w-8">
                <a href={profile.socials.zenn} target="_blank" rel="noopener noreferrer">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Zenn</title>
                    <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Field */}
        <div className="w-full lg:max-w-1/3 flex flex-col items-center lg:items-start gap-1">
          <h3 className="lg:w-full border-b border-zinc-400 lg:border-none px-2 lg:px-0">About Me</h3>
          <p className="mx-2">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
}
