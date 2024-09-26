import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";

/**
 * Fetches favorite exercises for the current user, paginated.
 *
 * @param {number} page - The current page number.
 * @returns {Promise<any[]>} - Returns a promise resolving to the list of favorite exercises.
 * @throws {Error} - Throws an error if the fetch fails.
 */

export const fetchFavExercises = async (page: number) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  const { data, error } = await client.from("favorite_exercises").select(
    "*,exercises(*,categories(*),profiles(id,pseudo,avatar))",
  ).range(start, end);

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Adds an exercise to the user's list of favorite exercises.
 *
 * @param {number} exerciseId - The ID of the exercise to add to favorites.
 * @returns {Promise<void>} - Returns a promise that resolves when the exercise is added to favorites.
 * @throws {Error} - Throws an error if the insert fails.
 */

export const addFavExercise = async (exerciseId: number) => {
  const { error } = await client.from("favorite_exercises").insert({
    exercise_id: exerciseId,
  });
  if (error) throw new Error(error.message);
};

/**
 * Deletes a favorite exercise by its exercise ID.
 *
 * @param {number} id - The ID of the exercise to remove from favorites.
 * @returns {Promise<void>} - Returns a promise that resolves when the exercise is removed from favorites.
 * @throws {Error} - Throws an error if the delete request fails.
 */

export const deleteFavExercise = async (id: number) => {
  const { error } = await client.from("favorite_exercises").delete().eq(
    "exercise_id",
    id,
  );
  if (error) throw new Error(error.message);
};

/**
 * Fetches favorite programs for the current user, paginated.
 *
 * @param {number} page - The current page number.
 * @returns {Promise<any[]>} - Returns a promise resolving to the list of favorite programs.
 * @throws {Error} - Throws an error if the fetch fails.
 */

export const fetchFavPrograms = async (page: number) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  const { data, error } = await client.from("favorite_programs").select(
    "*,programs(*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar))),profiles(*))",
  ).range(start, end);

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Adds a program to the user's list of favorite programs.
 *
 * @param {number} programId - The ID of the program to add to favorites.
 * @returns {Promise<void>} - Returns a promise that resolves when the program is added to favorites.
 * @throws {Error} - Throws an error if the insert fails.
 */

export const addFavProgram = async (programId: number) => {
  const { error } = await client.from("favorite_programs").insert({
    program_id: programId,
  });
  if (error) throw new Error(error.message);
};

/**
 * Deletes a favorite program by its program ID.
 *
 * @param {number} programId - The ID of the program to remove from favorites.
 * @returns {Promise<void>} - Returns a promise that resolves when the program is removed from favorites.
 * @throws {Error} - Throws an error if the delete request fails.
 */

export const deleteFavProgram = async (programId: number) => {
  const { error } = await client.from("favorite_programs").delete().eq(
    "program_id",
    programId,
  );
  if (error) throw new Error(error.message);
};
