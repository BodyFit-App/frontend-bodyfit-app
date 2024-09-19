import { fetchExercises } from "../api/exercises";
import { fetchPrograms } from "../api/programs";
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
  nextCursor: number | null,
) => {
  return {
    nextCursor,
    exercises: exercises.map((exercise) => ({
      ...exercise,
      isFav: exercise.favorite_exercises.length > 0,
    })),
  };
};

export const formatProgramsWithFavorites = (
  programs: Awaited<ReturnType<typeof fetchPrograms>>["data"],
  nextCursor: number | null,
) => {
  return {
    nextCursor,
    programs: programs.map((program) => ({
      ...program,
      isFav: program.favorite_programs.length > 0,
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
