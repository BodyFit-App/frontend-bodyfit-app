import { fetchExerciseById } from "../api/exercises";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/exercices", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("fetchExerciseById", () => {
    it("should return data when the fetch is successful", async () => {
      setTestData({
        id: 1,
        name: "Push-up",
        categories: [{ name: "Strength" }],
      });

      const data = await fetchExerciseById(1);

      expect(data).toEqual({
        id: 1,
        name: "Push-up",
        categories: [{ name: "Strength" }],
      });
    });

    it("should throw when the fetch is unsuccessful", async () => {
      setTestError(new Error("Something went wrong"));

      await expect(fetchExerciseById(1)).rejects.toThrow(
        "Something went wrong",
      );
    });
  });
});
