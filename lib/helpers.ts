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
) => {
  return exercises.map((exercise) => ({
    ...exercise,
    isFav: favorites.includes(exercise.id),
  }));
};
