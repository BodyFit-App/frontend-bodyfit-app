import {
  addExerciseSession,
  deleteSession,
  resetExerciseSession,
} from "./sessions";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/sessions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("deleteSession", () => {
    it("should not throw when delete is successful", async () => {
      await expect(deleteSession(1)).resolves.not.toThrow();
    });

    it("should throw when delete fails", async () => {
      setTestError(new Error("Failed to delete session"));

      await expect(deleteSession(1)).rejects.toThrow(
        "Failed to delete session",
      );
    });
  });

  describe("addExerciseSession", () => {
    it("should not throw when adding exercise is successful", async () => {
      await expect(addExerciseSession(1, [1]))
        .resolves.not.toThrow();
    });

    it("should throw when adding exercise fails", async () => {
      setTestError(new Error("Failed to add exercise to session"));

      await expect(addExerciseSession(1, [1]))
        .rejects.toThrow(
          "Failed to add exercise to session",
        );
    });
  });

  describe("deleteExerciseSession", () => {
    it("should not throw when delete is successful", async () => {
      await expect(resetExerciseSession(1)).resolves.not.toThrow();
    });

    it("should throw when delete fails", async () => {
      setTestError(new Error("Failed to delete exercise from session"));

      await expect(resetExerciseSession(1)).rejects.toThrow(
        "Failed to delete exercise from session",
      );
    });
  });
});
