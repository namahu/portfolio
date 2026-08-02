import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@portfolio/types";
import { render } from "vitest-browser-react";
import { Suspense } from "react";
import { ProfileField } from "./profile";
import { page } from "vitest/browser";

const mockProfile: Profile = {
  "id": "profile",
  "firstName": "hoge",
  "lastName": "huga",
  "kanjiName": "漢字",
  "nickName": "hogehuga",
  "birthDate": "1983-03-26",
  "bio": "bio",
  "skills": ["React", "TypeScript"],
  "socials": {
    "github": "https://github.com/xxxx",
  },
};

const renderProfile = (promise: Promise<Profile>) => (
  render(
    <Suspense fallback={<div>...Loading</div>}>
      <ProfileField profilePromise={promise} />
    </Suspense>
  )
);

describe("Profile component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-02"));
  });

  afterEach(() => vi.useRealTimers());

  it("should render profile field when profile exists", async () => {
    await renderProfile(Promise.resolve(mockProfile));

    await expect.element(page.getByText(`${mockProfile.kanjiName} (${mockProfile.nickName})`)).toBeVisible();
    await expect.element(page.getByText(`${mockProfile.lastName} ${mockProfile.firstName}`, { exact: true})).toBeVisible();
    await expect.element(page.getByText(`${mockProfile.birthDate} (43)`)).toBeVisible();
    await expect.element(page.getByText(mockProfile.skills.join(", "))).toBeVisible();
    await expect.element(page.getByText(mockProfile.socials.github)).toBeVisible();
    await expect.element(page.getByText(mockProfile.bio)).toBeVisible();
  });

  it("should not render profile field when profile does not exist", async () => {
    await renderProfile(Promise.resolve({} as Profile));
    await expect.element(page.getByRole("heading")).not.toBeInTheDocument();
  });
});
