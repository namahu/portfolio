import { api } from "@/lib/api-client";
import type { Profile } from "@portfolio/types";

export const getProfile = async (): Promise<Profile> => {
  const { data } = await api.get<Profile>("/profile");
  return data;
};
