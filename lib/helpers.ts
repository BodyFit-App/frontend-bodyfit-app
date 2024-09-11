import { Tables } from "../types/database.types";

export const getRange = (page: number, perPage: number): [number, number] => {
  if (page < 1) {
    return [0, perPage - 1];
  }
  const start = (page - 1) * perPage;
  const end = start + perPage - 1;
  return [start, end];
};

export const formatExercisesWithFavorites = (
  exercises: Tables<"exercises">[],
  favorites: number[],
  nextCursor: number | null,
) => {
  return {
    nextCursor,
    exercises: exercises.map((exercise) => ({
      ...exercise,
      isFav: favorites.includes(exercise.id),
    })),
  };
};

export const formatProgramsWithFavorites = (
  programs: Tables<"programs">[],
  favorites: number[],
  nextCursor: number | null,
) => {
  return {
    nextCursor,
    programs: programs.map((program) => ({
      ...program,
      isFav: favorites.includes(program.id),
    })),
  };
};

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
        },
      ],
    });
  });

  it("should handle empty exercises array", () => {
    const exercises: Tables<"exercises">[] = [];
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
