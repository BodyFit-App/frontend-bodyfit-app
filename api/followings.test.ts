import {
  addFollowing,
  deleteFolowing,
  fetchFolloweesActivity,
  fetchFollowingsByProfileId,
} from "./followings";
const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/favorites", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  jest.mock("../lib/supabase");

  describe("fetchFollowingsByProfileId", () => {
    it("should return data with profile and followee details when the fetch is successful", async () => {
      const mockData = [
        {
          id: 1,
          profile_id: 1,
          followee_id: 2,
          profile: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
          followee: { id: 2, pseudo: "User2", avatar: "avatar2.png" },
        },
        {
          id: 2,
          profile_id: 1,
          followee_id: 3,
          profile: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
          followee: { id: 3, pseudo: "User3", avatar: "avatar3.png" },
        },
      ];
      setTestData(mockData);

      const data = await fetchFollowingsByProfileId(1, 1);

      expect(data).toEqual(mockData);
    });

    it("should throw an error when the fetch fails", async () => {
      setTestError(new Error("Failed to fetch followings"));

      await expect(fetchFollowingsByProfileId(1, 1)).rejects.toThrow(
        "Failed to fetch followings",
      );
    });
  });

  describe("addFollowing", () => {
    it("should not throw an error when the insertion is successful", async () => {
      setTestData(null);

      await expect(addFollowing(2)).resolves.not.toThrow();
    });

    it("should throw an error when the insertion fails", async () => {
      setTestError(new Error("Failed to add following"));

      await expect(addFollowing(2)).rejects.toThrow("Failed to add following");
    });
  });

  describe("deleteFollowing", () => {
    it("should not throw an error when the deletion is successful", async () => {
      setTestData(null);

      await expect(deleteFolowing(1)).resolves.not.toThrow();
    });

    it("should throw an error when the deletion fails", async () => {
      setTestError(new Error("Failed to delete following"));

      await expect(deleteFolowing(1)).rejects.toThrow(
        "Failed to delete following",
      );
    });
  });

  describe("fetchFolloweesActivity", () => {
    it("should not throw an error when the deletion is successful", async () => {
      setTestData([]);

      await expect(fetchFolloweesActivity()).resolves.not.toThrow();
    });

    it("should throw an error when the deletion fails", async () => {
      setTestError(new Error("Failed to delete following"));

      await expect(fetchFolloweesActivity()).rejects.toThrow(
        "Failed to delete following",
      );
    });
  });
});
