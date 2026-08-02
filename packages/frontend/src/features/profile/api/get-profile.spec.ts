import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "@/lib/api-client";
import { getProfile } from "./get-profile";
import { mockProfile } from "../__mocks__/profile.mock"

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("get-profile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return a profile when profile exists", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockProfile});
    const result = await getProfile();
    expect(result).toEqual(mockProfile);
    expect(api.get).toHaveBeenCalledWith("/profile");
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it("should return an empty object when profile does not exist", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: {}});
    const result = await getProfile();
    expect(result).toEqual({});
    expect(api.get).toHaveBeenCalledWith("/profile");
    expect(api.get).toHaveBeenCalledTimes(1);
  })

  it("should throw an error when unsuccessfully fetch", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Network Error"));
    await expect(getProfile()).rejects.toThrow("Network Error");
  });
});
