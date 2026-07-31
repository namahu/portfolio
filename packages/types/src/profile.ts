export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  kanjiName: string;
  nickName: string;
  birthDate: string;
  bio: string;
  skills: string[];
  socials: {
    github: string;
  };
}
