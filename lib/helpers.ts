import { fetchExercises } from "../api/exercises";
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
  exercises: Awaited<ReturnType<typeof fetchExercises>>["data"],
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

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\/]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
