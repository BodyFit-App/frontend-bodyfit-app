import {
  deleteProgram,
  fetchProgramById,
  fetchPrograms,
  getFavoriteStatusForPrograms,
  upsertProgram,
} from "./programs";
import { Tables } from "../types/database.types";

const { setTestData, setTestError } = require("@supabase/supabase-js");

describe("Tests api/programs", () => {
  afterEach(() => {
    jest.clearAllMocks();
    setTestData(null);
    setTestError(null);
  });

  describe("fetchProgramById", () => {
    it("should return data when the fetch is successful", async () => {
      const mockData = {
        id: 1,
        name: "Fitness Program",
        description: "A program for general fitness",
      };
      setTestData(mockData);

      const data = await fetchProgramById(1);

      expect(data).toEqual(mockData);
    });

    it("should throw when the fetch is unsuccessful", async () => {
      setTestError(new Error("Something went wrong"));

      await expect(fetchProgramById(1)).rejects.toThrow(
        "Something went wrong",
      );
    });
  });

  describe("fetchPrograms", () => {
    it("should return data when fetch is successful without filters or order", async () => {
      const mockData: Tables<"programs">[] = [];
      setTestData(mockData);

      const data = await fetchPrograms(1);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: [],
      });
    });

    it("should handle multiple filters applied", async () => {
      const mockData: Tables<"programs">[] = [
        {
          id: 1,
          title: "Fitness Program",
          profile_id: 1,
          created_at: "2000-12-20",
          description: "Exemple",
          visible: true,
        },
      ];
      setTestData(mockData);

      const filter = {
        category: "Strength",
        profile_id: 1,
        profile_pseudo: "User1",
        title: "Fitness Program",
      };
      const data = await fetchPrograms(1, filter);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: mockData,
      });
    });

    it("should return data with filter and order applied", async () => {
      const mockData = [
        {
          id: 1,
          title: "Fitness Program",
          profile_id: 1,
          created_at: "2000-12-20",
          description: "Exemple",
          visible: true,
        },
      ];
      setTestData(mockData);

      const filter = { category: "Strength", profile_id: 1 };
      const data = await fetchPrograms(1, filter, {
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
        title: "Running",
      };
      const data = await fetchPrograms(1, filter);

      expect(data).toEqual({
        count: undefined,
        nextCursor: null,
        data: [],
      });
    });

    it("should return data with only order applied", async () => {
      const mockData = [
        {
          id: 1,
          title: "Fitness Program",
          profile_id: 1,
          created_at: "2000-12-20",
          description: "Exemple",
          visible: true,
        },
      ];
      setTestData(mockData);

      const data = await fetchPrograms(1, undefined, {
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
      setTestError(new Error("Failed to fetch programs"));

      await expect(fetchPrograms(1)).rejects.toThrow(
        "Failed to fetch programs",
      );
    });
  });

  describe("upsertProgram", () => {
    it(
      "should return data when upsert is successful",
      async () => {
        const body = { title: "New Program", description: "A new program" };
        const mockData = [{ id: 1, ...body }];
        setTestData(mockData);

        await expect(upsertProgram(body)).resolves.not.toThrow();
      },
    );

    it("should throw when upsert fails", async () => {
      setTestError(new Error("Failed to upsert program"));

      const body = { title: "New Program", description: "A new program" };

      await expect(upsertProgram(body)).rejects.toThrow(
        "Failed to upsert program",
      );
    });
  });

  describe("deleteProgram", () => {
    it("should not throw when delete is successful", async () => {
      await expect(deleteProgram(1)).resolves.not.toThrow();
    });

    it("should throw when delete fails", async () => {
      setTestError(new Error("Failed to delete program"));

      await expect(deleteProgram(1)).rejects.toThrow(
        "Failed to delete program",
      );
    });
  });
});

describe("getFavoriteStatusForPrograms", () => {
  it("should return favorite program IDs when fetch is successful", async () => {
    const programIds = [1, 2, 3];
    const mockData = [{ program_id: 1 }, { program_id: 2 }];
    setTestData(mockData);

    const result = await getFavoriteStatusForPrograms(programIds);

    expect(result).toEqual([1, 2]);
  });

  it("should return an empty array when no programs are favorites", async () => {
    const programIds = [1, 2, 3];
    setTestData([]);

    const result = await getFavoriteStatusForPrograms(programIds);

    expect(result).toEqual([]);
  });

  it("should throw an error when fetch fails", async () => {
    setTestError(new Error("Failed to fetch favorite programs"));

    await expect(getFavoriteStatusForPrograms([1, 2, 3])).rejects.toThrow(
      "Failed to fetch favorite programs",
    );
  });
});
