import { supabase } from "../__mocks__/supabase";
import { fetchExerciseById } from "../api/exercises";
import { client } from "../lib/supabase";

jest.mock("../lib/supabase", () => ({
  client: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  },
}));

describe("Tests api/exercises", () => {
  beforeEach(() => {
    supabase();
  });

  describe("Tests fetchExerciseById", () => {
    it("should return a valid response", async () => {
      // @ts-ignore
      client.single.mockResolvedValueOnce({
        data: { id: 1 },
        error: null,
      });

      const result = await fetchExerciseById(1);
      expect(result).toEqual({ id: 1 });
    });

    it("should throw with message 'Error occurred'", async () => {
      // @ts-ignore
      client.single.mockResolvedValueOnce({
        data: null,
        error: { message: "Error occurred" },
      });

      await expect(fetchExerciseById(1)).rejects.toThrow("Error occurred");
    });
  });
});
