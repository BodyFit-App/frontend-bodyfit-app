import {
  addExerciseCategories,
  deleteExercise,
  fetchExerciseById,
  fetchExercises,
  resetExerciseCategories,
  upsertExercise,
} from "./exercises";
import { Tables } from "../types/database.types";

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
    it("should return data when fetch is successful without filters or order", async () => {
      const mockData: Tables<"exercises">[] = [];
      setTestData(mockData);

      const data = await fetchExercises(1);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: [],
      });
    });

    it("should handle multiple filters applied", async () => {
      const mockData = [
        {
          id: 2,
          title: "Pull Up",
          description: "Example",
          profile_id: 1,
          created_at: "2000-10-20",
          visible: true,
          banner_image: null,
          estimated_time_minutes: null,
        },
      ];
      setTestData(mockData);

      const filter = {
        category: "Strength",
        profile_id: 1,
        profile_pseudo: "User1",
        title: "Push Up",
      };
      const data = await fetchExercises(1, filter);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: mockData,
      });
    });

    it("should return data with filter and order applied", async () => {
      const mockData = [
        {
          id: 2,
          title: "Pull Up",
          description: "Example",
          profile_id: 1,
          created_at: "2000-10-20",
          visible: true,
          banner_image: null,
          estimated_time_minutes: null,
        },
      ];
      setTestData(mockData);

      const filter = { category: "Strength", profile_id: 1 };
      const data = await fetchExercises(1, filter, {
        field: "title",
        asc: true,
      });

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: mockData,
      });
    });

    it("should return empty array if no data matches filters", async () => {
      setTestData([]);

      const filter = {
        category: "Cardio",
        profile_id: 3,
        profile_pseudo: "User3",
        title: "Run",
      };
      const data = await fetchExercises(1, filter);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: [],
      });
    });

    it("should return data with only order applied", async () => {
      const mockData: Tables<"exercises">[] = [
        {
          id: 2,
          title: "Pull Up",
          description: "Example",
          profile_id: 1,
          created_at: "2000-10-20",
          visible: true,
          banner_image: null,
          estimated_time_minutes: null,
        },
      ];
      setTestData(mockData);

      const data = await fetchExercises(1, undefined, {
        field: "title",
        asc: true,
      });

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: mockData,
      });
    });

    it("should throw when fetch fails", async () => {
      setTestError(new Error("Failed to fetch exercises"));

      await expect(fetchExercises(1)).rejects.toThrow(
        "Failed to fetch exercises",
      );
    });
  });

  describe("upsertExercise", () => {
    it("should return data with id when upsert is successful without id", async () => {
      const body = { title: "Push-up" };
      const mockData = { id: 1, ...body };

      // Simulate the data response
      setTestData(mockData);

      const result = await upsertExercise(body);

      expect(result).toEqual(mockData);
    });

    it("should return the same body if id is provided", async () => {
      const body = { id: 1, title: "Pull-up" };
      const mockData = { ...body };

      // Simulate the data response
      setTestData(mockData);

      const result = await upsertExercise(body);

      expect(result).toEqual(mockData);
    });

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

describe("deleteExerciseCategories", () => {
  it("should not throw when deletion is successful", async () => {
    setTestError(null);

    const exerciseId = 1;
    const catId = 2;

    await expect(resetExerciseCategories(exerciseId)).resolves.not
      .toThrow();
  });

  it("should throw an error when deletion fails", async () => {
    setTestError(new Error("Failed to delete exercise category"));

    const exerciseId = 1;
    const catId = 2;

    await expect(resetExerciseCategories(exerciseId)).rejects.toThrow(
      "Failed to delete exercise category",
    );
  });
});
