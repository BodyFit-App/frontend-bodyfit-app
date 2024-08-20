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
          name: "Push-up",
          categories: [{ id: 1, name: "Strength" }],
          profiles: { id: 1, pseudo: "User1", avatar: "avatar1.png" },
        },
        {
          id: 2,
          name: "Squat",
          categories: [{ id: 2, name: "Legs" }],
          profiles: { id: 2, pseudo: "User2", avatar: "avatar2.png" },
        },
      ];
      setTestData(mockData);

      const data = await fetchExercises(1);

      expect(data).toEqual(mockData);
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
        const mockData = [{ id: 1, title: "Push-up" }];
        const mockCats = [
          { exercise_id: 1, category_id: 1 },
          { exercise_id: 1, category_id: 2 },
        ];
        setTestData(mockData);

        const body = { title: "Push-up" };
        const categories = [1, 2];

        const result = await upsertExercise(body, categories);
        expect(result).toEqual({
          data: mockData,
          categories: mockCats,
        });
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
      const mockData = [
        { exercise_id: 1, category_id: 1 },
        { exercise_id: 1, category_id: 2 },
      ];
      setTestData(mockData);

      const categories = [
        { exercise_id: 1, category_id: 1 },
        { exercise_id: 1, category_id: 2 },
      ];

      const data = await addExerciseCategories(categories);

      expect(data).toEqual(mockData);
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
