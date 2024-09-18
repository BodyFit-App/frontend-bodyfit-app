import {
  formatExercisesWithFavorites,
  formatProgramsWithFavorites,
  getRange,
  slugify,
} from "./helpers";
import { Tables } from "../types/database.types";

describe("Test helpers", () => {
  describe("getRange", () => {
    it.each([
      [1, 10, [0, 9]],
      [2, 10, [10, 19]],
      [3, 5, [10, 14]],
      [0, 10, [0, 9]],
      [-1, 10, [0, 9]],
    ])(
      "should return %p for page %p with %p items per page",
      (page, perPage, expected) => {
        const result = getRange(page, perPage);
        expect(result).toEqual(expected);
      },
    );
  });
});

describe("formatProgramsWithFavorites", () => {
  it("should correctly mark programs as favorites", () => {
    const programs = [
      {
        id: 1,
        title: "Fitness Program",
        profile_id: 1,
        created_at: "2000-12-20",
        description: "Exemple",
        visible: true,
      },
      {
        id: 2,
        title: "Yoga Program",
        profile_id: 2,
        created_at: "2001-05-10",
        description: "Exemple",
        visible: false,
      },
    ];
    const favorites = [1];
    const nextCursor = null;

    const result = formatProgramsWithFavorites(programs, favorites, nextCursor);

    expect(result).toEqual({
      nextCursor: null,
      programs: [
        {
          id: 1,
          title: "Fitness Program",
          profile_id: 1,
          created_at: "2000-12-20",
          description: "Exemple",
          visible: true,
          isFav: true,
        },
        {
          id: 2,
          title: "Yoga Program",
          profile_id: 2,
          created_at: "2001-05-10",
          description: "Exemple",
          visible: false,
          isFav: false,
        },
      ],
    });
  });

  it("should return programs with correct nextCursor", () => {
    const programs = [
      {
        id: 1,
        title: "Fitness Program",
        profile_id: 1,
        created_at: "2000-12-20",
        description: "Exemple",
        visible: true,
      },
    ];
    const favorites: any = [];
    const nextCursor = 456;

    const result = formatProgramsWithFavorites(programs, favorites, nextCursor);

    expect(result).toEqual({
      nextCursor: 456,
      programs: [
        {
          id: 1,
          title: "Fitness Program",
          profile_id: 1,
          created_at: "2000-12-20",
          description: "Exemple",
          visible: true,
          isFav: false,
        },
      ],
    });
  });

  it("should handle empty programs array", () => {
    const programs: Tables<"programs">[] = [];
    const favorites = [1, 2, 3];
    const nextCursor = null;

    const result = formatProgramsWithFavorites(programs, favorites, nextCursor);

    expect(result).toEqual({
      nextCursor: null,
      programs: [],
    });
  });
});

describe("formatExercisesWithFavorites", () => {
  it("should correctly mark exercises as favorites", () => {
    const exercises = [
      {
        id: 1,
        title: "Pull Up",
        description: "Example",
        profile_id: 1,
        created_at: "2000-10-20",
        visible: true,
        banner_image: null,
        estimated_time_seconds: null,
        categories: [],
        profiles: null,
      },
      {
        id: 2,
        title: "Push Up",
        description: "Example",
        profile_id: 2,
        created_at: "2001-01-15",
        visible: true,
        banner_image: null,
        estimated_time_seconds: null,
        categories: [],
        profiles: null,
      },
    ];

    const favorites = [1];
    const nextCursor = null;

    const result = formatExercisesWithFavorites(
      exercises,
      favorites,
      nextCursor,
    );

    expect(result).toEqual({
      nextCursor: null,
      exercises: [
        {
          id: 1,
          title: "Pull Up",
          description: "Example",
          profile_id: 1,
          created_at: "2000-10-20",
          visible: true,
          banner_image: null,
          estimated_time_seconds: null,
          isFav: true,
          categories: [],
          profiles: null,
        },
        {
          id: 2,
          title: "Push Up",
          description: "Example",
          profile_id: 2,
          created_at: "2001-01-15",
          visible: true,
          banner_image: null,
          estimated_time_seconds: null,
          isFav: false,
          categories: [],
          profiles: null,
        },
      ],
    });
  });

  it("should return exercises with correct nextCursor", () => {
    const exercises = [
      {
        id: 1,
        title: "Pull Up",
        description: "Example",
        profile_id: 1,
        created_at: "2000-10-20",
        visible: true,
        banner_image: null,
        estimated_time_seconds: null,
        categories: [],
        profiles: null,
      },
    ];
    const favorites: any = [];
    const nextCursor = 123;

    const result = formatExercisesWithFavorites(
      exercises,
      favorites,
      nextCursor,
    );

    expect(result).toEqual({
      nextCursor: 123,
      exercises: [
        {
          id: 1,
          title: "Pull Up",
          description: "Example",
          profile_id: 1,
          created_at: "2000-10-20",
          visible: true,
          banner_image: null,
          estimated_time_seconds: null,
          isFav: false,
          categories: [],
          profiles: null,
        },
      ],
    });
  });

  it("should handle empty exercises array", () => {
    const exercises: any = [];
    const favorites = [1, 2, 3];
    const nextCursor = null;

    const result = formatExercisesWithFavorites(
      exercises,
      favorites,
      nextCursor,
    );

    expect(result).toEqual({
      nextCursor: null,
      exercises: [],
    });
  });
});

describe("slugify", () => {
  it("should convert a title to a slug", () => {
    expect(slugify("Hello World! This is a test / title.")).toBe(
      "hello-world-this-is-a-test-title",
    );
  });

  it("should handle multiple spaces and slashes", () => {
    expect(slugify("   Multiple   spaces / and slashes /   ")).toBe(
      "multiple-spaces-and-slashes",
    );
  });

  it("should handle special characters", () => {
    expect(slugify("Special @#$% characters!")).toBe("special-characters");
  });

  it("should handle empty strings", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle strings with only special characters", () => {
    expect(slugify("!@#$%^&*()")).toBe("");
  });
});
