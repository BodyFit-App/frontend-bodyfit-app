import {
  addExerciseCategories,
  deleteExercise,
  fetchExerciseById,
  fetchExercises,
  upsertExercise,
} from "../api/exercises";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/exercices", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("fetchExerciseById", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = {
        id: 1,
        name: "Push-up",
        categories: [{ name: "Strength" }],
      };
      setTestData(mockData);

      const data = await fetchExerciseById(1);

      expect(data).toEqual(mockData);
    });

    it("should throw when the fetch is unsuccessful", async () => {
      setTestError(new Error("Something went wrong"));

      await expect(fetchExerciseById(1)).rejects.toThrow(
        "Something went wrong",
      );
    });
  });

  describe("fetchExercises", () => {
    it("should return data when fetch is successful", async () => {
      const mockData = [
        {
          id: 1,
          title: "Push-up",
          categories: [{ id: 1, name: "Strength" }],
          profiles: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
        },
        {
          id: 2,
          title: "Squat",
          categories: [{ id: 2, name: "Legs" }],
          profiles: { id: 2, pseudo: "User2", avatar: "avatar2.png" },
        },
      ];
      setTestData(mockData);

      const data = await fetchExercises(1);

      expect(data).toEqual(mockData);
    });

    it("should apply filters correctly", async () => {
      const mockData = [
        {
          id: 1,
          title: "Push-up",
          categories: [{ id: 1, name: "Strength" }],
          profiles: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
        },
      ];
      setTestData(mockData);

      const filter = { category: "Strength", author: "User1", title: "Push" };
      const data = await fetchExercises(1, filter);

      expect(data).toEqual(mockData);
    });

    it("should return empty array if no data matches filters", async () => {
      setTestData([]);

      const filter = { category: "Cardio", author: "User3", title: "Run" };
      const data = await fetchExercises(1, filter);

      expect(data).toEqual([]);
    });

    it("should throw when fetch fails", async () => {
      setTestError(new Error("Failed to fetch exercises"));

      await expect(fetchExercises(1)).rejects.toThrow(
        "Failed to fetch exercises",
      );
    });
  });

  describe("upsertExercise", () => {
    it(
      "should return data and categories when upsert is successful",
      async () => {
        const body = { title: "Push-up" };
        const categories = [1, 2];
        const mockData = [{ id: 1, ...body }];
        setTestData(mockData);

        await expect(upsertExercise(body, categories)).resolves.not.toThrow();
      },
    );

    it("should throw when upsert fails", async () => {
      setTestError(new Error("Failed to upsert exercise"));

      const body = { title: "Push-up" };

      await expect(upsertExercise(body)).rejects.toThrow(
        "Failed to upsert exercise",
      );
    });
  });

  it("should throw when upsert fails", async () => {
    setTestError(new Error("Failed to upsert exercise"));

    const body = { title: "Push-up" };

    await expect(upsertExercise(body)).rejects.toThrow(
      "Failed to upsert exercise",
    );
  });

  describe("addExerciseCategories", () => {
    it("should return data when insert is successful", async () => {
      const categories = [
        { exercise_id: 1, category_id: 1 },
        { exercise_id: 1, category_id: 2 },
      ];

      await expect(addExerciseCategories(categories)).resolves.not.toThrow();
    });

    it("should throw when insert fails", async () => {
      setTestError(new Error("Failed to add exercise categories"));

      const categories = [
        { exercise_id: 1, category_id: 1 },
        { exercise_id: 1, category_id: 2 },
      ];

      await expect(addExerciseCategories(categories)).rejects.toThrow(
        "Failed to add exercise categories",
      );
    });
  });

  describe("deleteExercise", () => {
    it("should not throw when delete is successful", async () => {
      await expect(deleteExercise(1)).resolves.not.toThrow();
    });

    it("should throw when delete fails", async () => {
      setTestError(new Error("Failed to delete exercise"));

      await expect(deleteExercise(1)).rejects.toThrow(
        "Failed to delete exercise",
      );
    });
  });
});
