import {
  addExerciseSession,
  deleteExerciseSession,
  deleteSession,
  upsertSession,
} from "../api/sessions";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/sessions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("upsertSession", () => {
    it(
      "should return data when upsert is successful",
      async () => {
        const body = { title: "New Session", description: "A new session" };
        const mockData = [{ id: 1, ...body }];
        setTestData(mockData);

        await expect(upsertSession(body)).resolves.not.toThrow();
      },
    );

    it("should throw when upsert fails", async () => {
      setTestError(new Error("Failed to upsert session"));

      const body = { title: "New Session", description: "A new session" };

      await expect(upsertSession(body)).rejects.toThrow(
        "Failed to upsert session",
      );
    });
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
      await expect(addExerciseSession({ exercise_id: 1, session_id: 1 }))
        .resolves.not.toThrow();
    });

    it("should throw when adding exercise fails", async () => {
      setTestError(new Error("Failed to add exercise to session"));

      await expect(addExerciseSession({ exercise_id: 1, session_id: 1 }))
        .rejects.toThrow(
          "Failed to add exercise to session",
        );
    });
  });

  describe("deleteExerciseSession", () => {
    it("should not throw when delete is successful", async () => {
      await expect(deleteExerciseSession(1)).resolves.not.toThrow();
    });

    it("should throw when delete fails", async () => {
      setTestError(new Error("Failed to delete exercise from session"));

      await expect(deleteExerciseSession(1)).rejects.toThrow(
        "Failed to delete exercise from session",
      );
    });
  });
});
