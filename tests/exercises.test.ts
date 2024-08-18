import { NB_ELTS_PER_PAGE } from "../lib/constants";
import {
  addExerciseCategories,
  deleteExercise,
  deleteExerciseCategories,
  fetchExerciseById,
  fetchExercises,
  upsertExercise,
} from "../api/exercises";
import mockClient from "../__mocks__/mockClient";

describe("Tests api/exercices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchExerciseById", () => {
    it("should return data when client request is successful", async () => {
      const data = { id: 1, title: "Exercise 1" };
      mockClient.single.mockResolvedValue({
        data: data,
        error: null,
      });

      const result = await fetchExerciseById(1);

      expect(result).toEqual(data);
      expect(mockClient.from).toHaveBeenCalledWith("exercises");
      expect(mockClient.eq).toHaveBeenCalledWith(
        "exercise_id",
        1,
      );
    });

    it("should throw an error when client request fails", async () => {
      const error = { message: "Something went wrong" };
      mockClient.single.mockResolvedValue({ data: null, error });

      await expect(fetchExerciseById(1)).rejects.toThrow(
        "Something went wrong",
      );
    });
  });

  describe("fetchExercises", () => {
    it("should return data when client request is successful", async () => {
      const data = [{ id: 1, title: "Exercise 1" }, {
        id: 2,
        title: "Exercise 2",
      }];
      mockClient.range.mockResolvedValue({ data: data, error: null });

      const result = await fetchExercises(1);

      expect(result).toEqual(data);
      expect(mockClient.from).toHaveBeenCalledWith("exercises");
      expect(mockClient.range).toHaveBeenCalledWith(
        1 * NB_ELTS_PER_PAGE,
        1 * NB_ELTS_PER_PAGE + NB_ELTS_PER_PAGE,
      );
    });

    it("should throw an error when client request fails", async () => {
      const error = { message: "Something went wrong" };
      mockClient.range.mockResolvedValue({ data: null, error: error });

      await expect(fetchExercises(1)).rejects.toThrow("Something went wrong");
    });
  });

  describe("upsertExercise", () => {
    it("should return data when upsert is successful", async () => {
      const data = [{ id: 1, title: "Exercise 1" }];
      const categories = [1, 2];

      mockClient.from("exercises").select.mockResolvedValue({
        data: data,
        error: null,
      });

      const result = await upsertExercise(
        { id: 1, title: "Exercise 1" },
        categories,
      );

      expect(result).toEqual(data);
      expect(mockClient.from).toHaveBeenCalledWith("exercises");
      expect(mockClient.from("exercises").upsert).toHaveBeenCalledWith({
        id: 1,
        title: "Exercise 1",
      });
      expect(mockClient.from("categories_exercises").insert)
        .toHaveBeenCalledWith([
          { exercise_id: 1, category_id: 1 },
          { exercise_id: 1, category_id: 2 },
        ]);
    });

    it("should throw an error when upsert fails", async () => {
      const error = { message: "Upsert failed" };
      mockClient.from("exercises").select.mockResolvedValue({
        data: null,
        error: error,
      });

      await expect(upsertExercise({ id: 1, title: "Exercise 1" })).rejects
        .toThrow("Upsert failed");
    });
  });

  describe("deleteExercise", () => {
    it("should not throw an error when delete is successful", async () => {
      mockClient.from("exercises").eq.mockResolvedValue({ error: null });

      await expect(deleteExercise(1)).resolves.not.toThrow();
      expect(mockClient.from).toHaveBeenCalledWith("exercises");
      expect(mockClient.from("exercises").delete).toHaveBeenCalled();
      expect(mockClient.from("exercises").eq).toHaveBeenCalledWith("id", 1);
    });

    it("should throw an error when delete fails", async () => {
      const error = { message: "Delete failed" };
      mockClient.from("exercises").eq.mockResolvedValue({
        error: error,
      });

      await expect(deleteExercise(1)).rejects.toThrow("Delete failed");
    });
  });

  describe("addExerciseCategories", () => {
    it("should return data when insert is successful", async () => {
      const categories = [{ exercise_id: 1, category_id: 1 }];

      addExerciseCategories(categories);

      expect(mockClient.from).toHaveBeenCalledWith("categories_exercises");
      expect(mockClient.from("categories_exercises").insert)
        .toHaveBeenCalledWith(categories);
    });

    it("should throw an error when insert fails", async () => {
      const error = { message: "Insert failed" };
      mockClient.from("categories_exercises").insert.mockResolvedValue({
        data: null,
        error: error,
      });

      await expect(addExerciseCategories([{ exercise_id: 1, category_id: 1 }]))
        .rejects.toThrow("Insert failed");
    });
  });

  describe("deleteExerciseCategories", () => {
    it("should not throw an error when delete is successful", async () => {
      mockClient.from("categories_exercises").eq.mockImplementationOnce(() =>
        mockClient
      )
        .mockImplementationOnce(() => ({ data: [], error: null }));

      await expect(deleteExerciseCategories(1, 1)).resolves.not.toThrow();

      expect(mockClient.from).toHaveBeenCalledWith("categories_exercises");
      expect(mockClient.from("categories_exercises").delete).toHaveBeenCalled();
      expect(mockClient.from("categories_exercises").eq).toHaveBeenCalledWith(
        "category_id",
        1,
      );
      expect(mockClient.from("categories_exercises").eq).toHaveBeenCalledWith(
        "exercise_id",
        1,
      );
    });

    it("should throw an error when delete fails", async () => {
      const error = { message: "Delete failed" };
      mockClient.from("categories_exercises").eq.mockImplementationOnce(() =>
        mockClient
      ).mockImplementationOnce(() => ({ error }));

      await expect(deleteExerciseCategories(1, 1)).rejects.toThrow(
        "Delete failed",
      );
    });
  });
});
