import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert, TablesUpdate } from "../types/database.types";
import { ProfileFilter } from "../types/filters.types";
import { ProfileOrder } from "../types/orders.types";

/**
 * Fetches a profile by its ID along with related followings, exercises, goals, and programs.
 *
 * @param {number} id - The ID of the profile to fetch.
 * @returns {Promise<any>} - Returns a promise resolving to the profile data with relationships.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchProfileById = async (id: number) => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;
  const profile_id = user?.user_metadata.profile_id;

  const { data, error } = await client.from("profiles").select(
    "*,following:followings!profile_id(profiles!profile_id(*)),followedBy:followings!followee_id(profiles!followee_id(*)),exercises(*,categories(name)),goals(*,steps(*)),programs(*,sessions(*,exercises(*)))",
  ).eq(
    "id",
    id,
  ).eq("followedBy.followee_id", profile_id).single();
  if (error) throw new Error(error.message);
  return data;
};

/**
 * Fetches profiles with optional filters and sorting, paginated.
 *
 * @param {number} [page=1] - The page number to fetch (defaults to 1).
 * @param {ProfileFilter} filter - Optional filter for profiles (e.g., pseudo).
 * @param {ProfileOrder} [order={ field: "created_at", asc: false }] - Sorting order.
 * @returns {Promise<{ data: any[], nextCursor: number | null, count: number }>} - Returns a promise resolving to paginated profiles.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchProfiles = async (
  page: number = 1,
  filter: ProfileFilter,
  order: ProfileOrder = { field: "created_at", asc: false },
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;
  const profile_id = user?.user_metadata.profile_id;

  let query = client
    .from("profiles")
    .select(
      "*,followedBy:followings!followee_id(profiles!followee_id(*)),exercises(*,categories(name)),goals(*),programs(*,sessions(*,exercises(*)))",
      { count: "exact" },
    ).eq("followedBy.profile_id", profile_id)
    .not("user_id", "is", null)
    .not("pseudo", "is", null)
    .not("lastname", "is", null)
    .not("firstname", "is", null)
    .not("id", "eq", profile_id)
    .range(start, end);

  if (filter?.pseudo) {
    query = query.eq("pseudo", filter.pseudo);
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
 * Updates a profile with the provided data.
 *
 * @param {TablesUpdate<"profiles">} body - The profile data to update.
 * @returns {Promise<any>} - Returns a promise resolving to the updated profile data.
 * @throws {Error} - Throws an error if the update operation fails.
 */

export const updateProfile = async (
  body: TablesUpdate<"profiles">,
) => {
  const { data, error } = await client
    .from("profiles")
    .update(body).eq("id", body.id!)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Fetches progress data for all users.
 *
 * @returns {Promise<any[]>} - Returns a promise resolving to the progress data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchProgress = async () => {
  const { data, error } = await client.from("progress").select("*");
  if (error) throw new Error(error.message);
  return data;
};
