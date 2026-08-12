interface BaseProfile {
  id: string;
  firstName: string;
  lastName: string;
  kanjiName: string;
  nickName: string;
  birthDate: string;
  bio: string;
  skills: string[];
  certifications: {
    id: string;
    dateObtained: string;
    name: string;
  }[];
  socials: {
    github: string;
    zenn: string;
  };
}

export interface ProfileWithAvatarKey extends BaseProfile {
  avatarKey: string;
}

export interface ProfileResponseDTO extends BaseProfile {
  avatarUrl: string;
}
