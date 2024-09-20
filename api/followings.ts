import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";

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

export const addFollowing = async (followeeId: number) => {
  const { error } = await client.from("followings").insert({
    followee_id: followeeId,
  });
  if (error) throw new Error(error.message);
};

export const deleteFolowing = async (id: number) => {
  const { error } = await client.from("followings").delete().eq(
    "id",
    id,
  );
  if (error) throw new Error(error.message);
};

export const fetchFolloweesActivity = async () => {
  const { data, error } = await client.from("user_content").select("*").range(
    0,
    NB_ELTS_PER_PAGE,
  ).order("time");
  if (error) throw new Error(error.message);
  return data;
};

