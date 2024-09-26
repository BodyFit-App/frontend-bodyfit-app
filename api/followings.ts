import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";

/**
 * Fetches the list of profiles followed by a specific profile, paginated.
 *
 * @param {number} profileId - The ID of the profile whose followings are being fetched.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<any[]>} - Returns a promise resolving to the list of followings.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchFollowingsByProfileId = async (
  profileId: number,
  page: number,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  const { data, error } = await client.from("followings").select(
    "*, profile:profiles(*), followee:profiles!followee_id(*)",
  ).eq("profile_id", profileId).range(start, end);

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Adds a new following to the profile by followee ID.
 *
 * @param {number} followeeId - The ID of the profile to follow.
 * @returns {Promise<void>} - Returns a promise that resolves when the following is added.
 * @throws {Error} - Throws an error if the insert operation fails.
 */

export const addFollowing = async (followeeId: number) => {
  const { error } = await client.from("followings").insert({
    followee_id: followeeId,
  });
  if (error) throw new Error(error.message);
};

/**
 * Deletes a following by followee ID.
 *
 * @param {number} id - The ID of the followee to remove from followings.
 * @returns {Promise<void>} - Returns a promise that resolves when the following is removed.
 * @throws {Error} - Throws an error if the delete operation fails.
 */

export const deleteFolowing = async (id: number) => {
  const { error } = await client.from("followings").delete().eq(
    "followee_id",
    id,
  );
  if (error) throw new Error(error.message);
};

/**
 * Fetches the activity feed of profiles followed by the current user, paginated.
 *
 * @param {number} [page=1] - The page number to fetch (defaults to 1).
 * @returns {Promise<{ data: any[], nextCursor: number | null, count: number }>} - Returns a promise resolving to the activity feed with pagination.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */

export const fetchFolloweesActivity = async (page: number = 1) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);
  const { data, error, count } = await client
    .from("user_content")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("time");
  if (error) throw new Error(error.message);

  const totalPages = count ? Math.ceil(count! / NB_ELTS_PER_PAGE) : 0;
  const nextPage = page + 1;
  const nextCursor = nextPage > totalPages ? null : nextPage;
  return { data, nextCursor, count };
};
