import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";
import { ProfileFilter } from "../types/filters.types";

export const fetchProfileById = async (id: number) => {
  const { data, error } = await client.from("profiles").select("*").eq(
    "id",
    id,
  );
  if (error) throw new Error(error.message);
  return data;
};

export const fetchProfiles = async (
  page: number = 1,
  filter: ProfileFilter,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("exercises")
    .select("*,categories(*),profiles(id,pseudo,avatar)")
    .range(start, end);

  if (filter?.pseudo) {
    query = query.eq("profiles.pseudo", filter.pseudo);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};

export const deleteProfile = async (
  id: number,
) => {
  const { error } = await client
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const upsertProfile = async (
  body: TablesInsert<"profiles">,
) => {
  const { data, error } = await client
    .from("profiles")
    .upsert(body)
    .select();

  if (error) throw new Error(error.message);
  return data;
};
