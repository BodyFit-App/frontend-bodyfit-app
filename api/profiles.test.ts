import {
  deleteProfile,
  fetchProfileById,
  fetchProfiles,
  upsertProfile,
} from "./profiles";
const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/goals", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("fetchProfileById", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = [{ id: 1, pseudo: "User1", avatar: "avatar1.png" }];
      setTestData(mockData);

      const data = await fetchProfileById(1);

      expect(data).toEqual(mockData);
    });

    it("should throw an error when the fetch fails", async () => {
      setTestError(new Error("Failed to fetch profile"));

      await expect(fetchProfileById(1)).rejects.toThrow(
        "Failed to fetch profile",
      );
    });
  });

  describe("fetchProfiles", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = [
        {
          id: 1,
          pseudo: "User1",
          avatar: "avatar1.png",
          exercises: [{
            id: 1,
            title: "Push-up",
            categories: [{ id: 1, name: "Strength" }],
          }],
        },
        {
          id: 2,
          pseudo: "User2",
          avatar: "avatar2.png",
          exercises: [{
            id: 2,
            title: "Squat",
            categories: [{ id: 2, name: "Legs" }],
          }],
        },
      ];
      setTestData(mockData);

      const data = await fetchProfiles(1, { pseudo: "User1" });

      expect(data).toEqual(mockData);
    });

    it("should apply filters correctly", async () => {
      const mockData = [
        {
          id: 1,
          pseudo: "User1",
          avatar: "avatar1.png",
          exercises: [{
            id: 1,
            title: "Push-up",
            categories: [{ id: 1, name: "Strength" }],
          }],
        },
      ];
      setTestData(mockData);

      const data = await fetchProfiles(1, { pseudo: "User1" });

      expect(data).toEqual(mockData);
    });

    it("should return empty array if no data matches filters", async () => {
      setTestData([]);

      const data = await fetchProfiles(1, { pseudo: "NonExistentUser" });

      expect(data).toEqual([]);
    });

    it("should throw an error when the fetch fails", async () => {
      setTestError(new Error("Failed to fetch profiles"));

      await expect(fetchProfiles(1, { pseudo: "User1" })).rejects.toThrow(
        "Failed to fetch profiles",
      );
    });
  });

  describe("deleteProfile", () => {
    it("should not throw an error when the deletion is successful", async () => {
      setTestData(null);

      await expect(deleteProfile(1)).resolves.not.toThrow();
    });

    it("should throw an error when the deletion fails", async () => {
      setTestError(new Error("Failed to delete profile"));

      await expect(deleteProfile(1)).rejects.toThrow(
        "Failed to delete profile",
      );
    });
  });

  describe("upsertProfile", () => {
    it("should return data when the upsert is successful", async () => {
      const mockData = [{ id: 1, pseudo: "User1", avatar: "avatar1.png" }];
      setTestData(mockData);

      const data = await upsertProfile({
        id: 1,
        pseudo: "User1",
        avatar: "avatar1.png",
      });

      expect(data).toEqual(mockData);
    });

    it("should throw an error when the upsert fails", async () => {
      setTestError(new Error("Failed to upsert profile"));

      await expect(
        upsertProfile({ id: 1, pseudo: "User1", avatar: "avatar1.png" }),
      ).rejects.toThrow("Failed to upsert profile");
    });
  });
});
