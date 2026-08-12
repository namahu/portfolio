import type { ProfileResponseDTO } from "@portfolio/types";

export const mockProfile: ProfileResponseDTO = {
  id: "profile",
  firstName: "hoge",
  lastName: "huga",
  kanjiName: "漢字",
  nickName: "hogehuga",
  birthDate: "1983-03-26",
  bio: "bio",
  skills: ["React", "TypeScript"],
  socials: {
    github: "https://github.com/xxxx",
    zenn: "http://www.zenn.com/xxx",
  },
  avatarUrl: "http://www.xxxx",
};
