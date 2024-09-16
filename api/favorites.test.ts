import {
  addFavExercise,
  addFavProgram,
  deleteFavExercise,
  deleteFavProgram,
  fetchFavExercises,
  fetchFavPrograms,
} from "./favorites";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/favorites", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("fetchFavExercises", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = [
        {
          id: 1,
          exercises: {
            id: 1,
            title: "Push-up",
            categories: [{ id: 1, name: "Strength" }],
            profiles: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
          },
        },
      ];
      setTestData(mockData);

      const data = await fetchFavExercises(1);

      expect(data).toEqual(mockData);
    });

    it("should throw when the fetch is unsuccessful", async () => {
      setTestError(new Error("Something went wrong"));

      await expect(fetchFavExercises(1)).rejects.toThrow(
        "Something went wrong",
      );
    });
  });

  describe("addFavExercise", () => {
    it("should not throw when the insertion is successful", async () => {
      setTestData(null);

      await expect(addFavExercise(1)).resolves.not.toThrow();
    });

    it("should throw when the insertion fails", async () => {
      setTestError(new Error("Failed to add favorite exercise"));

      await expect(addFavExercise(1)).rejects.toThrow(
        "Failed to add favorite exercise",
      );
    });
  });

  describe("deleteFavExercise", () => {
    it("should not throw when the deletion is successful", async () => {
      setTestData(null); // Pas de retour de données

      await expect(deleteFavExercise(1)).resolves.not.toThrow();
    });

    it("should throw when the deletion fails", async () => {
      setTestError(new Error("Failed to delete favorite exercise"));

      await expect(deleteFavExercise(1)).rejects.toThrow(
        "Failed to delete favorite exercise",
      );
    });
  });

  describe("fetchFavPrograms", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = [
        {
          id: 1,
          programs: {
            id: 1,
            title: "Program 1",
            sessions: [
              {
                id: 1,
                exercises: {
                  id: 1,
                  title: "Push-up",
                  categories: [{ id: 1, name: "Strength" }],
                  profiles: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
                },
              },
            ],
            profiles: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
          },
        },
      ];
      setTestData(mockData);

      const data = await fetchFavPrograms(1);

      expect(data).toEqual(mockData);
    });

    it("should throw when the fetch is unsuccessful", async () => {
      setTestError(new Error("Something went wrong"));

      await expect(fetchFavPrograms(1)).rejects.toThrow("Something went wrong");
    });
  });

  describe("addFavProgram", () => {
    it("should not throw when the insertion is successful", async () => {
      setTestData(null);

      await expect(addFavProgram(1)).resolves.not.toThrow();
    });

    it("should throw when the insertion fails", async () => {
      setTestError(new Error("Failed to add favorite program"));

      await expect(addFavProgram(1)).rejects.toThrow(
        "Failed to add favorite program",
      );
    });
  });

  describe("deleteFavProgram", () => {
    it("should not throw when the deletion is successful", async () => {
      setTestData(null);

      await expect(deleteFavProgram(1)).resolves.not.toThrow();
    });

    it("should throw when the deletion fails", async () => {
      setTestError(new Error("Failed to delete favorite program"));

      await expect(deleteFavProgram(1)).rejects.toThrow(
        "Failed to delete favorite program",
      );
    });
  });
});
