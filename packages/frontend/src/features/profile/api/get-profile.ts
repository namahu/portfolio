import { api } from "@/lib/api-client";
import type { ProfileResponseDTO } from "@portfolio/types";

export const getProfile = async (): Promise<ProfileResponseDTO> => {
  try {
    const { data } = await api.get<ProfileResponseDTO>("/profile");
    return data;
  } catch (err) {
    return {
      id: "profile",
      firstName: "Masami",
      lastName: "Nakaoka",
      kanjiName: "中岡 政巳",
      nickName: "namahu",
      birthDate: "1983-03-26",
      bio: "test",
      skills: [
        "React",
        "TypeScript",
        "React",
        "TypeScript",
        "React",
        "TypeScript",
        "React",
        "TypeScript",
        "React",
        "TypeScript",
        "React",
        "TypeScript",
      ],
      socials: {
        github: "https://github.com/namahu",
        zenn: "",
      },
      avatarUrl: "https://avatars.githubusercontent.com/u/6575515?v=4",
    };
  }
};
