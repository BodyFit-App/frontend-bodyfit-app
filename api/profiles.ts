import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { getRange } from "../lib/helpers";
import { client } from "../lib/supabase";
import { TablesInsert, TablesUpdate } from "../types/database.types";
import { ProfileFilter } from "../types/filters.types";

export const fetchProfileById = async (id: number) => {
  const { data, error } = await client.from("profiles").select(
    "*,exercises(*,categories(name)),goals(*),programs(*)",
  ).eq(
    "id",
    id,
  ).single();
  if (error) throw new Error(error.message);
  return data;
};

export const fetchProfiles = async (
  page: number = 1,
  filter: ProfileFilter,
) => {
  const [start, end] = getRange(page, NB_ELTS_PER_PAGE);

  let query = client
    .from("profiles")
    .select("*")
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

export const fetchProgress = async () => {
  const { data, error } = await client.from("progress").select("*");
  if (error) throw new Error(error.message);
  return data;
};
