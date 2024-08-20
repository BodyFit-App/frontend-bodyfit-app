import { NB_ELTS_PER_PAGE } from "../lib/constants";
import { client } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export const fetchProgramById = async (
  id: number,
) => {
  const { data, error } = await client
    .from("programs")
    .select(
      "*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar))),profiles(*)",
    )
    .eq("program_id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const fetchPrograms = async (
  page: number = 1,
) => {
  const { data, error } = await client
    .from("programs")
    .select(
      "*,sessions(exercises(*,categories(*),profiles(id,pseudo,avatar))),profiles(*)",
    )
    .range(page * NB_ELTS_PER_PAGE, page * NB_ELTS_PER_PAGE + NB_ELTS_PER_PAGE);

  if (error) throw new Error(error.message);

  return data;
};

export const deleteProgram = async (
  id: number,
) => {
  const { error } = await client
    .from("programs")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const upsertProgram = async (
  body: TablesInsert<"programs">,
) => {
  const { error } = await client
    .from("programs")
    .upsert(body);

  if (error) throw new Error(error.message);
};
