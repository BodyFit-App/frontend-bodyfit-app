import {
  deleteGoal,
  fetchGoalById,
  fetchGoals,
  upsertGoal,
} from "../api/goals";
import { Tables } from "../types/database.types";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/goals", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("fetchGoalById", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = {
        id: 1,
        title: "Weight Loss Goal",
        description: "A goal to lose weight",
      };
      setTestData(mockData);

      const data = await fetchGoalById(1);

      expect(data).toEqual(mockData);
    });

    it("should throw when the fetch is unsuccessful", async () => {
      setTestError(new Error("Something went wrong"));

      await expect(fetchGoalById(1)).rejects.toThrow(
        "Something went wrong",
      );
    });
  });

  describe("fetchGoals", () => {
    it("should return data when fetch is successful", async () => {
      const mockData: Tables<"goals">[] = [];
      setTestData(mockData);

      const data = await fetchGoals(1);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: [],
      });
    });

    it("should throw when fetch fails", async () => {
      setTestError(new Error("Failed to fetch goals"));

      await expect(fetchGoals(1)).rejects.toThrow(
        "Failed to fetch goals",
      );
    });
  });

  describe("upsertGoal", () => {
    it("should return data when upsert is successful", async () => {
      const body = { title: "New Goal", description: "A new goal" };
      const mockData = [{ id: 1, ...body }];
      setTestData(mockData);

      await expect(upsertGoal(body)).resolves.not.toThrow();
    });

    it("should throw when upsert fails", async () => {
      setTestError(new Error("Failed to upsert goal"));

      const body = { title: "New Goal", description: "A new goal" };

      await expect(upsertGoal(body)).rejects.toThrow(
        "Failed to upsert goal",
      );
    });
  });

  describe("deleteGoal", () => {
    it("should not throw when delete is successful", async () => {
      await expect(deleteGoal(1)).resolves.not.toThrow();
    });

    it("should throw when delete fails", async () => {
      setTestError(new Error("Failed to delete goal"));

      await expect(deleteGoal(1)).rejects.toThrow(
        "Failed to delete goal",
      );
    });
  });
});
