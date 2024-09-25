import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ProgramFilter } from "../types/filters.types";
import { ProgramOrder } from "../types/orders.types";

/**
 * Fetches a program by its ID, including related sessions, exercises, categories, profiles, and favorite status.
 *
 * @param {number} id - The ID of the program to fetch.
 * @param {number} [profileIdForFavorites] - Optional profile ID to check if the program is a favorite.
 * @returns {Promise<any>} - A promise resolving to the program data.
 * @throws {Error} - Throws an error if fetching the program fails.
 */

export const fetchProgramById = async (
  id: number,
  profileIdForFavorites?: number,
) => {
  let query = client
    .from("programs")
    .select(
      "*,sessions(*,exercises(*,categories(*),profiles(id,pseudo,avatar_url))),profiles(*),favorite_programs!left(profile_id)",
    )
    .eq("id", id);

  if (profileIdForFavorites) {
    query = query.eq("favorite_programs.profile_id", profileIdForFavorites);
  }

  const { data, error } = await query.single();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Fetches a paginated list of programs with optional filters and sorting.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {ProgramFilter} [filter] - Optional filters to apply to the program search.
 * @param {ProgramOrder} [order={ field: "created_at", asc: false }] - Sorting options for the programs.
 * @param {number} [profileIdForFavorites] - Optional profile ID to check if the program is a favorite.
 * @returns {Promise<{data: any[], nextCursor: number | null, count: number}>} - A promise resolving to the paginated programs data.
 * @throws {Error} - Throws an error if fetching programs fails.
 */

export const fetchPrograms = async (
  page: number = 1,
  filter?: ProgramFilter,
  order: ProgramOrder = { field: "created_at", asc: false },
  profileIdForFavorites?: number,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("programs")
    .select(
      "*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar_url))),profiles(*),favorite_programs!left(profile_id)",
      { count: "exact" },
    )
    .range(start, end);

  if (profileIdForFavorites) {
    query = query.eq("favorite_programs.profile_id", profileIdForFavorites);
  }

  if (filter?.category) {
    query = query.contains("sessions.exercises.categories.name", [
      filter.category,
    ]);
  }

  if (filter?.profile_id) {
    query = query.eq("profile_id", filter.profile_id);
  }

  if (filter?.title) {
    query = query.ilike("title", `%${filter.title}%`);
  }

  if (filter?.profile_pseudo) {
    query = query.ilike("profiles.pseudo", `%${filter.profile_pseudo}%`);
  }

  query = query.order(order.field, { ascending: order.asc });

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;

  return { data, nextCursor, count };
};

/**
 * Deletes a program by its ID.
 *
 * @param {number} id - The ID of the program to delete.
 * @throws {Error} - Throws an error if deleting the program fails.
 */

export const deleteProgram = async (
  id: number,
) => {
  const { error } = await client
    .from("programs")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

/**
 * Inserts or updates a program in the database.
 *
 * @param {TablesInsert<"programs">} body - The program data to upsert.
 * @returns {Promise<any>} - A promise resolving to the upserted program data.
 * @throws {Error} - Throws an error if the upsert operation fails.
 */

export const upsertProgram = async (
  body: TablesInsert<"programs">,
) => {
  const { data, error } = await client
    .from("programs")
    .upsert(body).select().single();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Adds a new session to a program.
 *
 * @param {number} programId - The ID of the program to which the session belongs.
 * @param {object} session - The session data to insert (title and description).
 * @returns {Promise<any>} - A promise resolving to the newly inserted session.
 * @throws {Error} - Throws an error if adding the session fails.
 */

export const addProgramSession = async (
  programId: number,
  session: { id?: number; title: string; description: string },
) => {
  const { data, error } = await client
    .from("sessions")
    .upsert({ ...session, program_id: programId }).select().single();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Fetches programs to be used in dropdown lists, filtered by visibility and favorite status.
 *
 * @returns {Promise<any[]>} - A promise resolving to the filtered list of programs.
 * @throws {Error} - Throws an error if fetching the programs fails.
 */

export const fetchDropdownPrograms = async () => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;
  const profile_id = user?.user_metadata.profile_id;

  const { data, error } = await client.from("programs")
    .select("id, title, profile_id, favorite_programs(*)")
    .eq("visible", true);

  if (error) throw new Error(error.message);

  const filteredPrograms = data.filter((program) =>
    program.profile_id === profile_id ||
    (program.favorite_programs &&
      program.favorite_programs.some((fav) => fav.profile_id === profile_id))
  );

  return filteredPrograms;
};
