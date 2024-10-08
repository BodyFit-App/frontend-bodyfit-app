import { User } from "@supabase/supabase-js";
import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ExerciseFilter } from "../types/filters.types";
import { ExerciseOrder } from "../types/orders.types";

/**
 * Fetches an exercise by its ID, optionally checking if it is a favorite for a specific profile.
 *
 * @param {number} id - The ID of the exercise to fetch.
 * @param {number} [profileIdForFavorites] - The profile ID to check if the exercise is a favorite.
 * @returns {Promise<Tables<"exercises">>} - Returns a promise resolving to the exercise data.
 * @throws {Error} - Throws an error if the fetch fails.
 */

export const fetchExerciseById = async (
  id: number,
  profileIdForFavorites?: number,
) => {
  let query = client
    .from("exercises")
    .select(
      "*,categories(*),profiles(id,pseudo,avatar_url,firstname,lastname),favorite_exercises!left(profile_id)",
    )
    .eq("id", id);

  if (profileIdForFavorites) {
    query = query.eq("favorite_exercises.profile_id", profileIdForFavorites);
  }

  const { data, error } = await query.single();
  if (error) throw new Error(error.message);

  return data;
};

/**
 * Fetches exercises based on pagination, filters, and ordering.
 *
 * @param {number} [page=1] - The current page number.
 * @param {ExerciseFilter} [filter] - Optional filters to apply to the exercises query.
 * @param {ExerciseOrder} [order={ field: "created_at", asc: false }] - The order in which to sort the exercises.
 * @param {number} [profileIdForFavorites] - The profile ID to check if exercises are favorited by the user.
 * @returns {Promise<{ data: any[], nextCursor: number | null, count: number }>} - Returns a promise resolving to the exercise data, next page cursor, and total count.
 * @throws {Error} - Throws an error if the fetch fails.
 */

export const fetchExercises = async (
  page: number = 1,
  filter?: ExerciseFilter,
  order: ExerciseOrder = { field: "created_at", asc: false },
  profileIdForFavorites?: number,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("exercises")
    .select(
      `*,categories(*),profiles(*),favorite_exercises!left(profile_id)`,
      {
        count: "exact",
      },
    )
    .range(start, end);

  if (profileIdForFavorites) {
    query = query.eq("favorite_exercises.profile_id", profileIdForFavorites);
  }

  if (filter?.category) {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.profile_id) {
    query = query.eq("profile_id", filter.profile_id);
  }

  if (filter?.profile_pseudo) {
    query = query.ilike("profiles.pseudo", `%${filter.profile_pseudo}%`);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  query = query.order(order.field, { ascending: order.asc });

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;

  return { data, nextCursor, count };
};

/**
 * Fetches exercises for a dropdown list where the user has visibility and ownership.
 *
 * @returns {Promise<Array<{ id: number, title: string, profile_id: number, favorite_exercises: any[] }>>} - Returns a promise resolving to an array of exercises.
 * @throws {Error} - Throws an error if the fetch fails.
 */

export const fetchDropdownExercises = async () => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;
  const profile_id = user?.user_metadata.profile_id;

  const { data, error } = await client.from("exercises")
    .select("id, title, profile_id, favorite_exercises(*)")
    .eq("visible", true).eq("profile_id", profile_id);

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Deletes an exercise by its ID.
 *
 * @param {number} id - The ID of the exercise to delete.
 * @returns {Promise<void>} - Returns a promise that resolves when the deletion is complete.
 * @throws {Error} - Throws an error if the delete request fails.
 */

export const deleteExercise = async (
  id: number,
) => {
  const { error } = await client
    .from("exercises")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

/**
 * Upserts (inserts or updates) an exercise.
 *
 * @param {TablesInsert<"exercises">} body - The exercise data to upsert.
 * @returns {Promise<Tables<"exercises">>} - Returns a promise resolving to the upserted exercise data.
 * @throws {Error} - Throws an error if the upsert request fails.
 */

export const upsertExercise = async (
  body: TablesInsert<"exercises">,
) => {
  const { data, error } = await client
    .from("exercises")
    .upsert(body)
    .select().single();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Adds categories to an exercise.
 *
 * @param {TablesInsert<"categories_exercises">[]} categories - The categories to associate with the exercise.
 * @returns {Promise<void>} - Returns a promise that resolves when the insertion is complete.
 * @throws {Error} - Throws an error if the insert request fails.
 */

export const addExerciseCategories = async (
  categories: TablesInsert<"categories_exercises">[],
) => {
  const { error } = await client
    .from("categories_exercises")
    .insert(categories);

  if (error) throw new Error(error.message);
};

/**
 * Resets (deletes) categories associated with an exercise.
 *
 * @param {number} exerciseId - The ID of the exercise to reset categories for.
 * @returns {Promise<void>} - Returns a promise that resolves when the deletion is complete.
 * @throws {Error} - Throws an error if the delete request fails.
 */

export const resetExerciseCategories = async (
  exerciseId: number,
) => {
  const { error } = await client
    .from("categories_exercises")
    .delete()
    .eq("exercise_id", exerciseId);

  if (error) throw new Error(error.message);
};
